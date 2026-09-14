import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/directives/reveal';
import { SectionHead } from '../../shared/section-head';
import { PullQuote } from '../../shared/pull-quote';
import { QUOTES, SKILLS } from '../../core/data/profile';

const ACCENTS = ['teal', 'pink', 'amber', 'cyan', 'lime', 'orange', 'violet'];

@Component({
  selector: 'app-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SectionHead, PullQuote],
  template: `
    <section class="stack section section--ink gridpaper--dark" id="stack">
      <div class="shell stack__grid">
        <div class="stack__aside">
          <app-section-head
            kicker="Stack"
            title="The tools, and why."
            lede="Not a logo wall. These are the things I reach for on a Tuesday, grouped by the job they do."
            accent="cyan"
          />
          <div class="stack__quote">
            <app-pull-quote [quote]="quote" tone="ink" />
          </div>
        </div>

        <ul class="stack__list">
          @for (group of skills; track group.label; let i = $index) {
            <li
              class="stack__row"
              [style.--accent]="'var(--' + accent(i) + ')'"
              [appReveal]="i * 70"
            >
              <div class="stack__row-head">
                <span class="stack__n">{{ pad(i + 1) }}</span>
                <h3 class="stack__label display">{{ group.label }}</h3>
              </div>
              <ul class="stack__items">
                @for (item of group.items; track item) {
                  <li class="chip">{{ item }}</li>
                }
              </ul>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .stack__grid {
      display: grid;
      grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
      gap: clamp(2.5rem, 6vw, 6rem);
      align-items: start;
    }

    .stack__aside {
      position: sticky;
      top: clamp(6rem, 14vh, 9rem);
    }

    .stack__quote {
      margin-top: clamp(3rem, 6vw, 5rem);
    }

    .stack__list {
      display: grid;
      border-top: 1.5px solid var(--line-dark);
    }

    .stack__row {
      display: grid;
      grid-template-columns: minmax(0, 0.42fr) minmax(0, 1fr);
      gap: 1.5rem clamp(1.5rem, 3vw, 3rem);
      padding-block: clamp(1.4rem, 3vw, 2.2rem);
      border-bottom: 1.5px solid var(--line-dark);
      transition: background 300ms var(--ease-out);
    }

    .stack__row:hover {
      background: rgba(244, 241, 236, 0.035);
    }

    .stack__row-head {
      container-type: inline-size;
      display: flex;
      align-items: baseline;
      gap: 0.9rem;
    }

    .stack__n {
      font-family: var(--font-mono);
      font-size: var(--t-xs);
      color: var(--accent);
      letter-spacing: 0.1em;
      flex: none;
    }

    .stack__label {
      font-size: clamp(1.4rem, 13cqi, 2.3rem);
      color: var(--on-ink);
      text-wrap: balance;
    }

    .stack__items {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .stack__items .chip {
      color: var(--on-ink-dim);
      border-color: rgba(239, 235, 229, 0.22);
      transition:
        color 220ms,
        border-color 220ms,
        background 220ms;
    }

    .stack__row:hover .chip {
      color: var(--on-ink);
      border-color: var(--accent);
    }

    .stack__items .chip:hover {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--ink);
    }

    @media (max-width: 980px) {
      .stack__grid {
        grid-template-columns: minmax(0, 1fr);
      }

      .stack__aside {
        position: static;
      }

      .stack__row {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class Stack {
  protected readonly skills = SKILLS;
  protected readonly quote = QUOTES['skills'];

  protected accent(i: number): string {
    return ACCENTS[i % ACCENTS.length];
  }

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
