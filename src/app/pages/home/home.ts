import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Hero } from '../../sections/hero/hero';
import { About } from '../../sections/about/about';
import { Stack } from '../../sections/stack/stack';
import { Experience } from '../../sections/experience/experience';
import { Work } from '../../sections/work/work';
import { Services } from '../../sections/services/services';
import { Achievements } from '../../sections/achievements/achievements';
import { Contact } from '../../sections/contact/contact';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, About, Stack, Experience, Work, Services, Achievements, Contact],
  template: `
    <main id="main">
      <app-hero />
      <app-about />
      <app-stack />
      <app-experience />
      <app-work />
      <app-services />
      <app-achievements />
      <app-contact />
    </main>
  `,
})
export class Home {
  constructor() {
    inject(Seo).apply({
      title: 'Udhayan S — Software Engineer & Product Builder',
      description:
        'Software engineer in Chennai building enterprise HR systems with ASP.NET Core, Angular and SQL Server — plus two live SaaS products and client sites across India, the UAE and Saudi Arabia. Technical SEO, custom domains and business mail included.',
      path: '/',
    });
  }
}
