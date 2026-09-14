import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './sections/nav/nav';
import { Footer } from './sections/footer/footer';
import { Seo } from './core/services/seo';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Nav, Footer],
  template: `
    <app-nav />
    <router-outlet />
    <app-footer />
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class App {
  constructor() {
    // Baked into the prerendered HTML, so crawlers get the graph without JS.
    inject(Seo).injectStructuredData();
  }
}
