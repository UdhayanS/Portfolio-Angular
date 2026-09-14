import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from '../core/directives/reveal';
import type { Quote } from '../core/data/profile';

/**
 * The recurring typographic breath between sections.
 *
 * Deliberately sized in `rem`, with no container query: size containment makes
 * an element contribute nothing to its parent's intrinsic width, so a quote in
 * any shrink-to-fit parent collapses to zero and its text wraps one word per
 * line. Placement is handled here via `placement` rather than by the parent
 * using `justify-self: end`, for the same reason.
 *
 * The input is named `placement`, not `align`: `align` is a legacy HTML
 * presentational attribute, so Angular writing it to the DOM made the browser
 * silently apply `text-align: end` to the whole quote.
 */
@Component({
  selector: 'app-pull-quote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  host: {
    '[class.is-end]': 'placement() === "end"',
  },
  template: `
    <figure class="q" [class.q--ink]="tone() === 'ink'" appReveal>
      <p class="q__mark" aria-hidden="true">&ldquo;</p>
      <blockquote class="q__text display">{{ quote().text }}</blockquote>
      <figcaption class="q__by">
        <span class="q__rule" aria-hidden="true"></span>
        <span>{{ quote().author }}</span>
        @if (quote().note) {
          <em class="q__note">{{ quote().note }}</em>
        }
      </figcaption>
    </figure>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .q {
      max-width: 30rem;
      margin: 0;
      text-align: start;
    }

    :host(.is-end) .q {
      margin-inline-start: auto;
    }

    .q__mark {
      font-family: var(--font-display);
      font-size: 3.25rem;
      line-height: 0.6;
      height: 1.6rem;
      color: var(--lime);
    }

    .q--ink .q__mark {
      color: var(--pink);
    }

    .q__text {
      font-size: clamp(1.2rem, 1.65vw, 1.7rem);
      line-height: 1.06;
      letter-spacing: -0.01em;
      text-wrap: balance;
    }

    .q__by {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.7rem;
      margin-top: 1.1rem;
      font-family: var(--font-mono);
      font-size: var(--t-xs);
      letter-spacing: 0.16em;
      text-transform: uppercase;
      opacity: 0.7;
    }

    .q__rule {
      width: 2rem;
      height: 1.5px;
      background: currentColor;
      flex: none;
    }

    .q__note {
      flex-basis: 100%;
      font-style: normal;
      text-transform: none;
      letter-spacing: 0.04em;
      opacity: 0.75;
    }
  `,
})
export class PullQuote {
  readonly quote = input.required<Quote>();
  readonly tone = input<'paper' | 'ink'>('paper');
  readonly placement = input<'start' | 'end'>('start');
}
