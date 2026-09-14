import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Reveal } from '../../core/directives/reveal';
import { SpatialStage } from '../../core/directives/spatial-stage';
import { SectionHead } from '../../shared/section-head';
import { PullQuote } from '../../shared/pull-quote';
import { Icon } from '../../shared/icon';
import {
  PROJECTS,
  PROJECT_FILTERS,
  QUOTES,
  type ProjectKind,
} from '../../core/data/profile';

const KIND_LABEL: Record<ProjectKind, string> = {
  product: 'Product',
  client: 'Client work',
  'open-source': 'Open source',
};

@Component({
  selector: 'app-work',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SpatialStage, SectionHead, PullQuote, Icon],
  templateUrl: './work.html',
  styleUrl: './work.scss',
})
export class Work {
  protected readonly filters = PROJECT_FILTERS;
  protected readonly quote = QUOTES['work'];
  protected readonly active = signal<ProjectKind | 'all'>('all');

  protected readonly projects = computed(() => {
    const kind = this.active();
    return kind === 'all' ? PROJECTS : PROJECTS.filter((p) => p.kind === kind);
  });

  protected readonly counts = computed(() => {
    const map: Record<string, number> = { all: PROJECTS.length };
    for (const project of PROJECTS) {
      map[project.kind] = (map[project.kind] ?? 0) + 1;
    }
    return map;
  });

  protected label(kind: ProjectKind): string {
    return KIND_LABEL[kind];
  }

  protected pad(n: number): string {
    return (n + 1).toString().padStart(2, '0');
  }
}
