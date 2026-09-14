import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/directives/reveal';
import { SpatialStage } from '../../core/directives/spatial-stage';
import { PullQuote } from '../../shared/pull-quote';
import { ABOUT, QUOTES, STATS } from '../../core/data/profile';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SpatialStage, PullQuote],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly about = ABOUT;
  protected readonly stats = STATS;
  protected readonly quote = QUOTES['about'];
}
