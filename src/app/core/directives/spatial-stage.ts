import {
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

/**
 * Turns the host into a 3D "stage": pointer position is published as the CSS
 * custom properties `--mx` and `--my` (both normalised to -1..1), which every
 * `.plane` descendant consumes to translate and rotate itself.
 *
 * All the motion lives in CSS — this only publishes two numbers, throttled to
 * one write per animation frame. Nothing runs on the server, and nothing runs
 * at all when the visitor prefers reduced motion.
 */
@Directive({
  selector: '[appSpatialStage]',
  host: { class: 'stage' },
})
export class SpatialStage {
  /** Dampens the effect; 0 disables it entirely. */
  readonly intensity = input(1, { alias: 'appSpatialStage' });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private frame = 0;
  private targetX = 0;
  private targetY = 0;

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // Coarse pointers have no hover position to track, and tilting the stage
      // under a thumb just fights the scroll.
      if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        this.targetX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        this.targetY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2);
        this.schedule(el);
      };

      const onLeave = () => {
        this.targetX = 0;
        this.targetY = 0;
        el.classList.remove('is-tracking');
        this.schedule(el);
      };

      el.addEventListener('pointermove', onMove, { passive: true });
      el.addEventListener('pointerenter', () => el.classList.add('is-tracking'), {
        passive: true,
      });
      el.addEventListener('pointerleave', onLeave, { passive: true });
    });
  }

  private schedule(el: HTMLElement): void {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      const k = this.intensity();
      el.style.setProperty('--mx', (this.targetX * k).toFixed(4));
      el.style.setProperty('--my', (this.targetY * k).toFixed(4));
    });
  }
}

function clamp(n: number): number {
  return n < -1 ? -1 : n > 1 ? 1 : n;
}
