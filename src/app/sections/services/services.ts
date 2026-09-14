import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/directives/reveal';
import { SpatialStage } from '../../core/directives/spatial-stage';
import { SectionHead } from '../../shared/section-head';
import { PullQuote } from '../../shared/pull-quote';
import { QUOTES, SERVICES } from '../../core/data/profile';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SpatialStage, SectionHead, PullQuote],
  template: `
    <section class="svc section section--paper gridpaper" id="services">
      <div class="shell">
        <div class="svc__top">
          <app-section-head
            kicker="Beyond the code"
            title="Launching is a skill too."
            lede="Most developers hand over a repository. I hand over a domain that resolves, mail that lands in the inbox, and a site Google can actually read."
            accent="teal"
          />
          <div class="svc__quote">
            <app-pull-quote [quote]="quote" placement="end" />
          </div>
        </div>

        <ul class="svc__grid stage" [appSpatialStage]="0.5">
          @for (service of services; track service.n; let i = $index) {
            <li
              class="svc__card plane"
              [style.--accent]="'var(--' + service.accent + ')'"
              [style.--depth]="16 + i * 12"
              [style.--drift]="0.4 + i * 0.12"
              [appReveal]="i * 90"
            >
              <span class="svc__n display">{{ service.n }}</span>
              <h3 class="svc__title display">{{ service.title }}</h3>
              <p class="svc__blurb">{{ service.blurb }}</p>
              <ul class="svc__bullets">
                @for (bullet of service.bullets; track bullet) {
                  <li>{{ bullet }}</li>
                }
              </ul>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .svc__top {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
      gap: clamp(2rem, 5vw, 5rem);
      align-items: end;
      margin-bottom: clamp(3rem, 7vw, 5rem);
    }

    .svc__quote {
      align-self: end;
    }

    .svc__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
      align-items: stretch;
    }

    .svc__card {
      position: relative;
      container-type: inline-size;
      display: flex;
      flex-direction: column;
      padding: clamp(1.5rem, 2.6vw, 2.1rem);
      background: var(--paper);
      border: 2px solid var(--ink);
      border-radius: var(--radius);
      box-shadow: 6px 6px 0 var(--ink);
      overflow: hidden;
      transition: box-shadow 260ms var(--ease-spring);
    }

    .svc__card::before {
      content: '';
      position: absolute;
      inset: 0 0 auto 0;
      height: 8px;
      background: var(--accent);
    }

    .svc__card:hover {
      box-shadow: 10px 10px 0 var(--ink);
    }

    .svc__n {
      font-size: clamp(2.4rem, 20cqi, 4rem);
      line-height: 0.8;
      color: var(--accent);
      -webkit-text-stroke: 1.5px var(--ink);
      text-stroke: 1.5px var(--ink);
      margin-top: 0.6rem;
    }

    .svc__title {
      font-size: clamp(1.3rem, 11cqi, 1.9rem);
      margin-top: 0.9rem;
      line-height: 0.95;
      text-wrap: balance;
    }

    .svc__blurb {
      margin-top: 0.8rem;
      font-size: 0.94rem;
      line-height: 1.6;
      color: var(--on-paper-dim);
    }

    .svc__bullets {
      display: grid;
      gap: 0.55rem;
      margin-top: 1.4rem;
      padding-top: 1.2rem;
      border-top: 1.5px solid var(--line-strong);
    }

    .svc__bullets li {
      position: relative;
      padding-left: 1.3rem;
      font-size: 0.86rem;
      line-height: 1.5;
    }

    .svc__bullets li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5em;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent);
      outline: 1.5px solid var(--ink);
    }

    @media (max-width: 900px) {
      .svc__top {
        grid-template-columns: minmax(0, 1fr);
      }

      .svc__quote {
        justify-self: start;
      }
    }
  `,
})
export class Services {
  protected readonly services = SERVICES;
  protected readonly quote = QUOTES['services'];
}
