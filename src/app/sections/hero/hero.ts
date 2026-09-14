import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SpatialStage } from '../../core/directives/spatial-stage';
import { Reveal } from '../../core/directives/reveal';
import { FitText } from '../../core/directives/fit-text';
import { Icon } from '../../shared/icon';
import { HERO, MARQUEE, PROFILE, STICKERS } from '../../core/data/profile';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpatialStage, Reveal, FitText, Icon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly hero = HERO;
  protected readonly profile = PROFILE;
  protected readonly stickers = STICKERS;
  protected readonly marquee = MARQUEE;

  /** Flips to false if the portrait PNG has not been dropped in yet. */
  protected readonly hasPortrait = signal(true);

  protected onPortraitError(): void {
    this.hasPortrait.set(false);
  }

  /** Splits "SEO\nSpecialist" into lines for the display type. */
  protected lines(title: string): string[] {
    return title.split('\n');
  }
}
