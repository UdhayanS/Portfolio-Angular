import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  signal,
} from '@angular/core';
import { Icon } from '../../shared/icon';
import { NAV, PROFILE } from '../../core/data/profile';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <a class="skip" href="#about">Skip to content</a>

    <header class="bar" [class.bar--solid]="scrolled()">
      <a class="bar__mark" href="#top" [attr.aria-label]="profile.name + ' — home'">
        <span class="bar__initials">{{ profile.initials }}</span>
        <span class="bar__name">{{ profile.name }}</span>
      </a>

      <nav class="bar__nav" aria-label="Sections">
        <ul>
          @for (item of nav; track item.id) {
            <li>
              <a [href]="'#' + item.id" [class.is-active]="active() === item.id">
                {{ item.label }}
              </a>
            </li>
          }
        </ul>
      </nav>

      <a class="bar__resume" [href]="profile.resume" download>
        <app-icon name="download" [size]="16" />
        <span>Résumé</span>
      </a>
    </header>
  `,
  styles: `
    .skip {
      position: absolute;
      left: -9999px;
      z-index: 100;
      padding: 0.8rem 1.2rem;
      background: var(--lime);
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: var(--t-xs);
      text-transform: uppercase;
      letter-spacing: 0.16em;
    }
    .skip:focus {
      left: 1rem;
      top: 1rem;
    }

    .bar {
      position: fixed;
      inset: 0 0 auto 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      padding: 1rem var(--gutter);
      transition:
        background 320ms var(--ease-out),
        border-color 320ms var(--ease-out),
        backdrop-filter 320ms var(--ease-out);
      border-bottom: 1.5px solid transparent;
      color: var(--on-ink);
    }

    /* Once the hero scrolls past, the bar becomes a real panel. */
    .bar--solid {
      background: rgba(11, 11, 11, 0.78);
      backdrop-filter: blur(14px) saturate(1.3);
      border-bottom-color: var(--line-dark);
      color: var(--on-ink);
    }

    .bar__mark {
      display: flex;
      align-items: baseline;
      gap: 0.6rem;
      font-family: var(--font-display);
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    .bar__initials {
      font-size: 1.35rem;
      color: var(--lime);
    }

    .bar__name {
      font-size: 1.1rem;
    }

    .bar__nav ul {
      display: flex;
      gap: clamp(0.9rem, 2vw, 2rem);
    }

    .bar__nav a {
      font-family: var(--font-mono);
      font-size: var(--t-xs);
      letter-spacing: 0.16em;
      text-transform: uppercase;
      opacity: 0.62;
      padding-bottom: 3px;
      border-bottom: 1.5px solid transparent;
      transition:
        opacity 200ms,
        border-color 200ms;
    }

    .bar__nav a:hover,
    .bar__nav a.is-active {
      opacity: 1;
      border-bottom-color: var(--lime);
    }

    .bar__resume {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-mono);
      font-size: var(--t-xs);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      border: 1.5px solid currentColor;
      border-radius: 999px;
      padding: 0.5rem 1rem;
      transition: background 200ms, color 200ms;
    }

    .bar__resume:hover {
      background: var(--lime);
      border-color: var(--lime);
      color: var(--ink);
    }

    @media (max-width: 940px) {
      .bar__nav,
      .bar__name {
        display: none;
      }
    }
  `,
})
export class Nav {
  protected readonly nav = NAV;
  protected readonly profile = PROFILE;
  protected readonly scrolled = signal(false);
  protected readonly active = signal<string>('');

  constructor() {
    afterNextRender(() => {
      const onScroll = () => this.scrolled.set(window.scrollY > window.innerHeight * 0.72);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

      // Highlight whichever section owns the middle of the viewport.
      const sections = NAV.map((n) => document.getElementById(n.id)).filter(
        (el): el is HTMLElement => !!el,
      );

      if (!sections.length || !('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.active.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );

      sections.forEach((el) => observer.observe(el));
    });
  }
}
