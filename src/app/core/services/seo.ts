import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PROFILE, PROJECTS, ROLES, SKILLS } from '../data/profile';

// The live origin. Everything canonical, JSON-LD and Open Graph derives from
// this, so it must be a URL that actually resolves — change it here only, and
// mirror it in public/robots.txt and public/sitemap.xml.
export const SITE_URL = 'https://udhayan-portfolio.netlify.app';

export interface PageSeo {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

/**
 * Sets the document head. Because the app is prerendered, everything written
 * here is baked into the static HTML that crawlers receive — no JavaScript
 * required on their side.
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly doc = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  apply(page: PageSeo): void {
    const url = `${SITE_URL}${page.path ?? '/'}`;
    const image = `${SITE_URL}${page.image ?? '/og-image.png'}`;

    this.title.setTitle(page.title);

    const tags: Record<string, string>[] = [
      { name: 'description', content: page.description },
      { name: 'author', content: PROFILE.name },

      { property: 'og:type', content: 'profile' },
      { property: 'og:site_name', content: `${PROFILE.name} — Portfolio` },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_IN' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: image },
    ];

    for (const tag of tags) {
      const selector = tag['name']
        ? `name='${tag['name']}'`
        : `property='${tag['property']}'`;
      this.meta.updateTag(tag, selector);
    }

    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Injects the Person + WebSite graph once, at bootstrap. */
  injectStructuredData(): void {
    const id = 'ld-person';
    if (this.doc.getElementById(id)) return;

    const script = this.doc.createElement('script');
    script.id = id;
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(this.buildGraph());
    this.doc.head.appendChild(script);
  }

  private buildGraph(): unknown {
    const skills = SKILLS.flatMap((group) => group.items);
    const current = ROLES.find((role) => role.current) ?? ROLES[0];

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: PROFILE.name,
          jobTitle: PROFILE.role,
          email: `mailto:${PROFILE.email}`,
          telephone: PROFILE.phone,
          url: SITE_URL,
          image: `${SITE_URL}/og-image.png`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chennai',
            addressRegion: 'Tamil Nadu',
            addressCountry: 'IN',
          },
          worksFor: {
            '@type': 'Organization',
            name: current.company,
          },
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Dr. Mahalingam College of Engineering and Technology',
          },
          knowsAbout: skills,
          sameAs: PROFILE.socials
            .filter((s) => s.label !== 'Email')
            .map((s) => s.href),
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: `${PROFILE.name} — Portfolio`,
          inLanguage: 'en',
          publisher: { '@id': `${SITE_URL}/#person` },
        },
        {
          '@type': 'ItemList',
          '@id': `${SITE_URL}/#work`,
          name: 'Selected work',
          itemListElement: PROJECTS.filter((p) => p.href).map((project, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: project.name,
              description: project.tagline,
              url: project.href,
              applicationCategory: 'WebApplication',
              author: { '@id': `${SITE_URL}/#person` },
            },
          })),
        },
      ],
    };
  }
}
