import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from '../core/directives/reveal';

@Component({
  selector: 'app-section-head',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    <header class="head" appReveal>
      <p class="head__kicker">
        <span class="head__dot" [style.background]="'var(--' + accent() + ')'"></span>
        {{ kicker() }}
      </p>
      <h2 class="head__title display">{{ title() }}</h2>
      @if (lede()) {
        <p class="head__lede lede">{{ lede() }}</p>
      }
    </header>
  `,
  styles: `
    :host {
      display: block;
    }

    .head {
      /* No ch-based max-width here: ch resolves against this element's
         body-size font, which would cap the box at ~250px and wrap the 100px+
         heading inside it one word per line. The grid track sets the width. */
      container-type: inline-size;
    }

    .head__kicker {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-family: var(--font-mono);
      font-size: var(--t-xs);
      letter-spacing: 0.24em;
      text-transform: uppercase;
      opacity: 0.65;
      margin-bottom: 1.1rem;
    }

    .head__dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex: none;
    }

    /* Scales to the container, not the window, so the same component reads
       correctly in a full-bleed row and in a narrow sticky aside. */
    .head__title {
      font-size: clamp(2rem, 13cqi, 5.5rem);
      white-space: pre-line;
      text-wrap: balance;
    }

    .head__lede {
      margin-top: 1.5rem;
      max-width: 48ch;
      opacity: 0.78;
    }
  `,
})
export class SectionHead {
  readonly kicker = input.required<string>();
  readonly title = input.required<string>();
  readonly lede = input<string>('');
  readonly accent = input<string>('lime');
}
