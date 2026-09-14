import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NAV, PROFILE } from '../../core/data/profile';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="foot">
      <div class="shell">
        <a class="foot__wordmark display" href="#top" aria-label="Back to top">
          {{ profile.name }}
        </a>

        <div class="foot__row">
          <nav class="foot__nav" aria-label="Footer">
            <ul>
              @for (item of nav; track item.id) {
                <li><a [href]="'#' + item.id">{{ item.label }}</a></li>
              }
            </ul>
          </nav>

          <ul class="foot__social">
            @for (social of profile.socials; track social.label) {
              <li>
                <a
                  [href]="social.href"
                  [attr.target]="social.label === 'Email' ? null : '_blank'"
                  [attr.rel]="social.label === 'Email' ? null : 'noopener noreferrer'"
                >
                  {{ social.label }}
                </a>
              </li>
            }
          </ul>
        </div>

        <div class="foot__base">
          <p>© {{ year }} {{ profile.name }}. Built with Angular, prerendered, no trackers.</p>
          <p class="foot__sign">
            Designed &amp; shipped in {{ profile.location }}
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: block;
    }

    .foot {
      background: var(--ink);
      color: var(--on-ink);
      padding-block: clamp(3rem, 7vw, 5rem) 2rem;
      border-top: 1.5px solid var(--line-dark);
      overflow: hidden;
    }

    /* Oversized wordmark bleeding to the edges, like the hero headline */
    .foot__wordmark {
      display: block;
      font-size: clamp(3rem, 15vw, 14rem);
      line-height: 0.8;
      color: transparent;
      -webkit-text-stroke: 1.5px rgba(239, 235, 229, 0.32);
      text-stroke: 1.5px rgba(239, 235, 229, 0.32);
      transition: color 400ms var(--ease-out);
    }

    .foot__wordmark:hover {
      color: var(--lime);
    }

    .foot__row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 1.5rem;
      margin-top: clamp(2rem, 4vw, 3rem);
      padding-top: 1.5rem;
      border-top: 1.5px solid var(--line-dark);
    }

    .foot__nav ul,
    .foot__social {
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;
    }

    .foot__nav a,
    .foot__social a {
      font-family: var(--font-mono);
      font-size: var(--t-xs);
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--on-ink-dim);
      transition: color 200ms;
    }

    .foot__nav a:hover,
    .foot__social a:hover {
      color: var(--lime);
    }

    .foot__base {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.75rem;
      margin-top: 2.5rem;
      font-size: var(--t-xs);
      color: var(--on-ink-dim);
    }

    .foot__sign {
      font-family: var(--font-mono);
      letter-spacing: 0.1em;
    }
  `,
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly nav = NAV;
  protected readonly year = new Date().getFullYear();
}
