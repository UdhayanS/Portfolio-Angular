import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type IconName =
  | 'search'
  | 'globe'
  | 'org'
  | 'api'
  | 'spark'
  | 'cycle'
  | 'arrow'
  | 'external'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'download'
  | 'pin';

/** Line-art glyphs matching the hand-drawn feel of the sticker collage. */
const PATHS: Record<IconName, string> = {
  search:
    'M4 15h3v5H4zM9 11h3v9H9zM14 6h3v14h-3zM3 9l6-4 5 3 7-6M18 2h4v4',
  globe:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M2 12h20M12 2c3 3.5 3 16.5 0 20M12 2C9 5.5 9 18.5 12 22',
  org: 'M12 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M5 16a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M19 16a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M12 8v4M12 12H6.5v4M12 12h5.5v4',
  api: 'M9 7H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4M15 7h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4M9 12h6M12 4v3M12 17v3',
  spark: 'M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z',
  cycle:
    'M20 12a8 8 0 0 1-13.7 5.6M4 12a8 8 0 0 1 13.7-5.6M4 8v4h4M20 16v-4h-4',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  github:
    'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  linkedin:
    'M4.5 9.5h3V21h-3zM6 4.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6M10.5 21V9.5h3v1.6a3.9 3.9 0 0 1 3.4-1.8c2.6 0 3.6 1.7 3.6 4.4V21h-3v-6c0-1.6-.6-2.5-1.9-2.5-1.1 0-2.1.8-2.1 2.6V21z',
  mail: 'M3 6h18v12H3zM3 6l9 7 9-7',
  download: 'M12 3v12M7 11l5 5 5-5M4 20h16',
  pin: 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
};

const FILLED: IconName[] = ['spark'];

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.fill]="filled ? 'currentColor' : 'none'"
      stroke="currentColor"
      [attr.stroke-width]="weight()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path [attr.d]="path" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
    }
    svg {
      display: block;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(22);
  readonly weight = input(1.8);

  get path(): string {
    return PATHS[this.name()];
  }

  get filled(): boolean {
    return FILLED.includes(this.name());
  }
}
