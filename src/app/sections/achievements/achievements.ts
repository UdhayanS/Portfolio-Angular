import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/directives/reveal';
import { SpatialStage } from '../../core/directives/spatial-stage';
import { SectionHead } from '../../shared/section-head';
import { PullQuote } from '../../shared/pull-quote';
import { ACHIEVEMENTS, CERTIFICATIONS, QUOTES } from '../../core/data/profile';

@Component({
  selector: 'app-achievements',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SpatialStage, SectionHead, PullQuote],
  template: `
    <section class="ach section section--ink gridpaper--dark" id="achievements">
      <div class="shell">
        <div class="ach__top">
          <app-section-head
            kicker="Track record"
            title="Proof, not adjectives."
            accent="amber"
          />
          <div class="ach__quote">
            <app-pull-quote [quote]="quote" tone="ink" placement="end" />
          </div>
        </div>

        <ul class="ach__grid stage" [appSpatialStage]="0.7">
          @for (item of achievements; track item.title; let i = $index) {
            <li
              class="ach__badge plane"
              [style.--accent]="'var(--' + item.accent + ')'"
              [style.--depth]="24 + i * 18"
              [style.--drift]="0.6 + i * 0.18"
              [style.--tilt.deg]="i % 2 === 0 ? -2.5 : 2.5"
              [appReveal]="i * 90"
            >
              <h3 class="ach__title display">{{ item.title }}</h3>
              <p class="ach__detail">{{ item.detail }}</p>
            </li>
          }
        </ul>

        <div class="ach__certs" appReveal="120">
          <p class="kicker ach__certs-label">Certifications</p>
          <ul class="ach__cert-list">
            @for (cert of certifications; track cert.name) {
              <li class="ach__cert">
                <span class="ach__cert-name">{{ cert.name }}</span>
                <span class="ach__cert-issuer">{{ cert.issuer }}</span>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .ach__top {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: clamp(2rem, 5vw, 5rem);
      align-items: end;
      margin-bottom: clamp(3rem, 7vw, 5rem);
    }

    .ach__quote {
      align-self: end;
    }

    .ach__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }

    .ach__badge {
      container-type: inline-size;
      background: var(--accent);
      color: var(--ink);
      border-radius: var(--radius);
      padding: clamp(1.4rem, 2.4vw, 1.9rem);
      rotate: var(--tilt);
      box-shadow: 0 18px 44px rgba(0, 0, 0, 0.42);
      transition: rotate 300ms var(--ease-spring);
    }

    .ach__badge:hover {
      rotate: 0deg;
    }

    .ach__title {
      font-size: clamp(1.3rem, 12cqi, 1.95rem);
      line-height: 0.92;
      text-wrap: balance;
    }

    .ach__detail {
      margin-top: 0.7rem;
      font-size: 0.88rem;
      line-height: 1.5;
      opacity: 0.78;
    }

    /* ---------- Certifications ---------- */
    .ach__certs {
      margin-top: clamp(3rem, 6vw, 4.5rem);
      padding-top: clamp(2rem, 4vw, 3rem);
      border-top: 1.5px solid var(--line-dark);
      display: grid;
      grid-template-columns: 12rem minmax(0, 1fr);
      gap: clamp(1rem, 3vw, 3rem);
    }

    .ach__certs-label {
      color: var(--on-ink-dim);
    }

    .ach__cert-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 0.9rem 2rem;
    }

    .ach__cert {
      display: grid;
      gap: 0.2rem;
      padding-left: 1rem;
      border-left: 2.5px solid var(--line-dark);
      transition: border-color 220ms;
    }

    .ach__cert:hover {
      border-left-color: var(--lime);
    }

    .ach__cert-name {
      font-size: var(--t-sm);
      font-weight: 500;
    }

    .ach__cert-issuer {
      font-family: var(--font-mono);
      font-size: var(--t-xs);
      letter-spacing: 0.08em;
      color: var(--on-ink-dim);
    }

    @media (max-width: 900px) {
      .ach__top,
      .ach__certs {
        grid-template-columns: minmax(0, 1fr);
      }

      .ach__quote {
        justify-self: start;
      }
    }
  `,
})
export class Achievements {
  protected readonly achievements = ACHIEVEMENTS;
  protected readonly certifications = CERTIFICATIONS;
  protected readonly quote = QUOTES['achievements'];
}
