import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/directives/reveal';
import { SectionHead } from '../../shared/section-head';
import { PullQuote } from '../../shared/pull-quote';
import { EDUCATION, QUOTES, ROLES } from '../../core/data/profile';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SectionHead, PullQuote],
  template: `
    <section class="xp section section--paper" id="experience">
      <div class="shell">
        <div class="xp__top">
          <app-section-head
            kicker="Experience"
            title="Where I've shipped."
            accent="pink"
          />
          <div class="xp__quote">
            <app-pull-quote [quote]="quote" placement="end" />
          </div>
        </div>

        <ol class="xp__timeline">
          @for (role of roles; track role.company; let i = $index) {
            <li class="xp__role" [appReveal]="i * 110">
              <div class="xp__marker" aria-hidden="true">
                <span class="xp__node" [class.xp__node--live]="role.current"></span>
              </div>

              <div class="xp__meta">
                <p class="xp__period">{{ role.period }}</p>
                @if (role.current) {
                  <p class="xp__now">
                    <span class="xp__pulse"></span>
                    Currently here
                  </p>
                }
                <p class="xp__place">{{ role.location }}</p>
              </div>

              <div class="xp__detail">
                <h3 class="xp__company display">{{ role.company }}</h3>
                <p class="xp__title">{{ role.title }}</p>

                <ul class="xp__points">
                  @for (point of role.points; track point) {
                    <li>{{ point }}</li>
                  }
                </ul>

                <ul class="xp__stack">
                  @for (tech of role.stack; track tech) {
                    <li class="chip">{{ tech }}</li>
                  }
                </ul>
              </div>
            </li>
          }
        </ol>

        <div class="xp__edu" appReveal="80">
          <p class="kicker">Education</p>
          <div class="xp__edu-body">
            <h3 class="xp__edu-school display">{{ education.school }}</h3>
            <p class="xp__edu-degree">{{ education.degree }}</p>
          </div>
          <div class="xp__edu-side">
            <p>{{ education.period }}</p>
            <p>{{ education.location }}</p>
            <p class="xp__edu-cgpa">{{ education.detail }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .xp__top {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: clamp(2rem, 5vw, 5rem);
      align-items: end;
      margin-bottom: clamp(3.5rem, 8vw, 6rem);
    }

    .xp__quote {
      align-self: end;
    }

    .xp__timeline {
      display: grid;
      counter-reset: role;
    }

    .xp__role {
      display: grid;
      grid-template-columns: 48px minmax(0, 0.32fr) minmax(0, 1fr);
      gap: clamp(1rem, 3vw, 3rem);
      padding-block: clamp(2rem, 4vw, 3.2rem);
      border-top: 1.5px solid var(--line-strong);
    }

    .xp__role:last-child {
      border-bottom: 1.5px solid var(--line-strong);
    }

    /* Vertical rail with a node per role */
    .xp__marker {
      position: relative;
      display: flex;
      justify-content: center;
      padding-top: 0.55rem;
    }

    .xp__marker::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: calc(-1 * clamp(2rem, 4vw, 3.2rem) - 2px);
      width: 1.5px;
      background: var(--line-strong);
    }

    .xp__role:last-child .xp__marker::before {
      bottom: auto;
      height: 0.55rem;
    }

    .xp__node {
      position: relative;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: var(--paper);
      border: 2.5px solid var(--ink);
    }

    .xp__node--live {
      background: var(--lime);
    }

    .xp__period {
      font-family: var(--font-mono);
      font-size: var(--t-sm);
      font-weight: 500;
    }

    .xp__now {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      margin-top: 0.55rem;
      font-family: var(--font-mono);
      font-size: var(--t-xs);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--on-paper);
    }

    .xp__pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22a06b;
      box-shadow: 0 0 0 0 rgba(34, 160, 107, 0.6);
      animation: pulse 2.4s ease-out infinite;
    }

    @keyframes pulse {
      70% {
        box-shadow: 0 0 0 10px rgba(34, 160, 107, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(34, 160, 107, 0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .xp__pulse {
        animation: none;
      }
    }

    .xp__place {
      margin-top: 0.55rem;
      font-size: var(--t-sm);
      color: var(--on-paper-dim);
    }

    .xp__detail {
      container-type: inline-size;
    }

    .xp__company {
      font-size: clamp(1.6rem, 7cqi, 2.9rem);
      line-height: 0.9;
      text-wrap: balance;
    }

    .xp__title {
      margin-top: 0.6rem;
      font-family: var(--font-mono);
      font-size: var(--t-sm);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--on-paper-dim);
    }

    .xp__points {
      display: grid;
      gap: 0.7rem;
      margin-top: 1.6rem;
      max-width: 62ch;
    }

    .xp__points li {
      position: relative;
      padding-left: 1.5rem;
      font-size: var(--t-body);
      line-height: 1.6;
    }

    .xp__points li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.62em;
      width: 8px;
      height: 8px;
      background: var(--pink);
      border-radius: 2px;
      rotate: 45deg;
    }

    .xp__stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1.5rem;
      color: var(--on-paper-dim);
    }

    /* ---------- Education ---------- */
    .xp__edu {
      display: grid;
      grid-template-columns: 10rem minmax(0, 1fr) auto;
      gap: clamp(1rem, 3vw, 3rem);
      align-items: center;
      margin-top: clamp(3rem, 6vw, 4.5rem);
      padding: clamp(1.5rem, 3vw, 2.2rem);
      background: var(--ink);
      color: var(--on-ink);
      border-radius: var(--radius);
      border-left: 6px solid var(--cyan);
    }

    .xp__edu .kicker {
      color: var(--cyan);
    }

    .xp__edu-body {
      container-type: inline-size;
    }

    .xp__edu-school {
      font-size: clamp(1.2rem, 6cqi, 1.9rem);
      line-height: 0.95;
      text-wrap: balance;
    }

    .xp__edu-degree {
      margin-top: 0.5rem;
      font-size: var(--t-sm);
      color: var(--on-ink-dim);
    }

    .xp__edu-side {
      text-align: right;
      font-family: var(--font-mono);
      font-size: var(--t-xs);
      letter-spacing: 0.1em;
      color: var(--on-ink-dim);
      display: grid;
      gap: 0.3rem;
    }

    .xp__edu-cgpa {
      color: var(--lime);
      font-weight: 500;
    }

    @media (max-width: 900px) {
      .xp__top,
      .xp__edu {
        grid-template-columns: minmax(0, 1fr);
      }

      .xp__quote {
        justify-self: start;
      }

      .xp__role {
        grid-template-columns: 28px minmax(0, 1fr);
      }

      .xp__detail {
        grid-column: 2;
      }

      .xp__edu-side {
        text-align: left;
      }
    }
  `,
})
export class Experience {
  protected readonly roles = ROLES;
  protected readonly education = EDUCATION;
  protected readonly quote = QUOTES['experience'];
}
