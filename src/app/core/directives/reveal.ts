import {
  Directive,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

/**
 * Fades and lifts the host into view the first time it crosses the viewport.
 *
 * The `.reveal` class ships the hidden state, so on the prerendered HTML the
 * content is present but transparent; if JavaScript never arrives the
 * `no-js` fallback in `App` removes the class and everything is simply visible.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[style.--reveal-delay]': 'delay() + "ms"',
  },
})
export class Reveal implements OnDestroy {
  /** Stagger, in milliseconds, applied as a CSS transition-delay. */
  readonly delay = input(0, { alias: 'appReveal', transform: toNumber });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;

      if (!('IntersectionObserver' in window)) {
        el.classList.add('is-in');
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            // Reveal on intersection, but also for anything already scrolled
            // past: a fast flick or an anchor jump can move the viewport
            // further than the observer samples, and content that never
            // un-hides is far worse than a missed animation.
            const scrolledPast =
              !!entry.rootBounds && entry.boundingClientRect.top < entry.rootBounds.bottom;
            if (!entry.isIntersecting && !scrolledPast) continue;
            el.classList.add('is-in');
            this.observer?.disconnect();
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
      );

      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

function toNumber(value: number | string | undefined): number {
  const n = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(n) ? (n as number) : 0;
}
