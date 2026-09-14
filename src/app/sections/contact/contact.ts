import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Reveal } from '../../core/directives/reveal';
import { PullQuote } from '../../shared/pull-quote';
import { Icon } from '../../shared/icon';
import { Mailer } from '../../core/services/mailer';
import { CONTACT, PROFILE, QUOTES } from '../../core/data/profile';

type SendState = 'idle' | 'sending' | 'sent' | 'throttled' | 'error';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, PullQuote, Icon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly contact = CONTACT;
  protected readonly profile = PROFILE;
  protected readonly quote = QUOTES['contact'];

  protected readonly state = signal<SendState>('idle');
  protected readonly copied = signal(false);

  private readonly mailer = inject(Mailer);

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2200);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the
      // mailto: link beside this button still works, so stay quiet.
    }
  }

  protected async submit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    // Honeypot: bots fill every field they find. Report success so they don't
    // retry, but send nothing.
    if ((data.get('company') as string)?.trim()) {
      this.state.set('sent');
      form.reset();
      return;
    }

    this.state.set('sending');
    const result = await this.mailer.send({
      name: str(data.get('name')),
      email: str(data.get('email')),
      subject: str(data.get('subject')),
      message: str(data.get('message')),
    });

    if (result === 'sent') {
      this.state.set('sent');
      form.reset();
      return;
    }

    // Keep what they typed on anything other than success — retyping a long
    // message because of a rate limit would be infuriating.
    this.state.set(result === 'throttled' ? 'throttled' : 'error');
  }
}

function str(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}
