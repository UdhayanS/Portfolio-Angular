import {
  Directive,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

const BASE_PX = 100;

/**
 * Scales the host's text so a single line exactly fills its parent's width —
 * the full-bleed masthead effect, at any viewport, for any string.
 *
 * A `vw`-based `clamp()` can't do this: it sizes type against the window, not
 * against the box the type actually lives in, so a long headline wraps into a
 * tall stack while a short one leaves half the row empty.
 *
 * Measurement runs at a fixed 100px reference size and scales by the ratio, so
 * it needs one layout read regardless of how far off the starting size was.
 * Re-runs on resize and once the webfont has actually loaded, since Anton's
 * metrics differ from the fallback enough to matter.
 */
@Directive({
  selector: '[appFitText]',
  host: { class: 'fit-text' },
})
export class FitText implements OnDestroy {
  /** Never grow past this, in px. Keeps the headline sane on ultrawide. */
  readonly max = input(260, { alias: 'appFitTextMax' });

  /**
   * Fraction of the parent width to fill. Coerced, because using the directive
   * as a bare attribute (`appFitText`) hands us an empty string.
   */
  readonly fill = input(1, { alias: 'appFitText', transform: toFraction });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: ResizeObserver;
  private frame = 0;

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;
      const parent = el.parentElement;
      if (!parent) return;

      const fit = () => {
        if (this.frame) return;
        this.frame = requestAnimationFrame(() => {
          this.frame = 0;
          this.measure(el, parent);
        });
      };

      fit();

      if ('ResizeObserver' in window) {
        // Only react to width changes. Refitting alters our own height, which
        // would otherwise bounce straight back through the observer.
        let lastWidth = 0;
        this.observer = new ResizeObserver(() => {
          const width = parent.clientWidth;
          if (width === lastWidth) return;
          lastWidth = width;
          fit();
        });
        this.observer.observe(parent);
      }

      // The fallback stack is wider than Anton, so the first measurement is an
      // overestimate until the real font lands.
      document.fonts?.ready.then(fit).catch(() => {});
    });
  }

  private measure(el: HTMLElement, parent: HTMLElement): void {
    const available = (parent.clientWidth - horizontalPadding(parent)) * this.fill();
    if (available <= 0) return;

    el.style.fontSize = `${BASE_PX}px`;
    // getBoundingClientRect is fractional; scrollWidth rounds to an integer and
    // ignores the text-stroke overhang, which is what let the headline spill
    // past its row by ~4%.
    const measured = el.getBoundingClientRect().width;
    if (!measured) return;

    let size = Math.min((available / measured) * BASE_PX, this.max());
    el.style.fontSize = `${size.toFixed(2)}px`;

    // Glyph advances don't scale perfectly linearly (hinting, letter-spacing
    // rounding), so converge rather than trusting the first ratio.
    for (let i = 0; i < 3; i++) {
      const actual = el.getBoundingClientRect().width;
      if (actual <= available) break;
      size *= available / actual;
      el.style.fontSize = `${size.toFixed(2)}px`;
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame) cancelAnimationFrame(this.frame);
  }
}

function toFraction(value: number | string | undefined): number {
  if (value === '' || value == null) return 1;
  const n = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(n) && n > 0 ? (n as number) : 1;
}

function horizontalPadding(el: HTMLElement): number {
  const style = getComputedStyle(el);
  return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
}
