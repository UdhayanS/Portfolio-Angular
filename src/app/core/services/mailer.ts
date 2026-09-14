import { Injectable } from '@angular/core';

/**
 * EmailJS configuration, carried over from the previous portfolio
 * (assets/js/mail.js). The templates in /email-templates expect these params:
 * name, email, subject, message, time — keep the form field names in sync.
 *
 * The public key is designed to be exposed in client code. Lock it down in the
 * EmailJS dashboard under Account → Security by allow-listing your domain,
 * otherwise anyone can spend your monthly quota from their own page.
 *
 * Note that allow-listing blocks localhost too, so add 127.0.0.1 there as well
 * or local testing will start failing with a 403.
 */
export const EMAIL = {
  serviceId: 'service_lfwsykn',
  templateId: 'template_8vefdke',
  publicKey: 'NjiX1UJLL4RlnXE7r',
  /** Minimum gap between sends from one browser, in ms. */
  throttleMs: 5_000,
} as const;

export interface MailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** `throttled` is a distinct outcome: nothing was wrong, it was just too soon. */
export type MailResult = 'sent' | 'throttled' | 'failed';

@Injectable({ providedIn: 'root' })
export class Mailer {
  async send(payload: MailPayload): Promise<MailResult> {
    // Imported on first submit rather than at bootstrap: the SDK is dead weight
    // for the ~99% of visitors who never open the contact form, and this keeps
    // it out of the initial bundle and off the prerender path entirely.
    const emailjs = await import('@emailjs/browser');

    // The notification template shows {{time}}. EmailJS does not provide it,
    // so stamp it here — in IST, since that is the timezone I read mail in.
    const time = new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date());

    try {
      await emailjs.send(
        EMAIL.serviceId,
        EMAIL.templateId,
        { ...payload, time },
        {
          publicKey: EMAIL.publicKey,
          // Cheap abuse protection on a key that has to live in the client.
          // Deliberately NOT using blockHeadless: it treats a missing
          // navigator.languages as a bot, which some privacy browsers and
          // extensions strip from real people. Silently dropping a genuine
          // enquiry costs far more than the spam it would have caught — the
          // honeypot in the form covers that case without false positives.
          limitRate: { id: 'contact', throttle: EMAIL.throttleMs },
        },
      );
      return 'sent';
    } catch (error) {
      // 429 is our own throttle firing before any request goes out.
      if (isStatus(error, 429)) return 'throttled';

      // Never swallow this silently — without it there is no way to tell a
      // blocked key from a dead network from a bad template ID.
      console.error('[contact] EmailJS send failed:', error);
      return 'failed';
    }
  }
}

function isStatus(error: unknown, status: number): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as { status?: unknown }).status === status
  );
}
