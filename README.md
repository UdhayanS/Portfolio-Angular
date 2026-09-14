# Udhayan S — Portfolio

A neo-brutalist "sticker collage" portfolio with a **CSS 3D spatial hero**, built in
Angular 22 and **fully prerendered** to static HTML.

- **Spatial UI** — stickers, stat cards and project cards sit on real `translateZ`
  depth planes inside a `perspective` stage and parallax with the pointer. No WebGL,
  no animation library, **0 KB** of extra JavaScript.
- **SEO-first** — every word ships in the prerendered HTML, plus a
  `Person` / `WebSite` / `ItemList` JSON-LD graph, Open Graph, Twitter cards and a
  canonical URL.
- **Accessible** — full keyboard nav, skip link, `prefers-reduced-motion` honoured
  everywhere (all motion is disabled, not just slowed), and the collage collapses
  into a readable stack on touch devices.

```
90 KB transferred · 1 prerendered route · no trackers
```

---

## Run it

```bash
npm install
npm start            # dev server → http://localhost:4200
npm run build        # prerendered output → dist/udhayan-portfolio/browser
npm run preview      # serve the built static site → http://localhost:4300
npm run typecheck
```

---

## Where the content lives

**All copy is in one file:** `src/app/core/data/profile.ts`. Nothing is hardcoded
in a template. Edit that file and everything — the hero, the collage stickers,
the stats, the timeline, the project grid, the services, the quotes, the JSON-LD —
updates together.

| Export | Drives |
| --- | --- |
| `PROFILE` | Name, contact details, social links |
| `HERO` | The two hero paragraphs and headline |
| `STICKERS` | The floating collage badges — position, colour, tilt, **depth** |
| `MARQUEE` | The scrolling ticker under the hero |
| `STATS` | The four number cards |
| `ABOUT` | Bio paragraphs and the fact table |
| `SKILLS` | Grouped stack rows |
| `ROLES`, `EDUCATION` | The experience timeline |
| `PROJECTS` | Every project card (filter by `kind`) |
| `SERVICES` | The SEO / domain / mail / deploy cards |
| `ACHIEVEMENTS`, `CERTIFICATIONS` | The track-record badges |
| `QUOTES` | The pull quote at every section boundary |

### Moving a sticker

Each entry in `STICKERS` positions itself on the collage:

```ts
{
  x: 13,        // % from the left of the stage
  y: 12,        // % from the top
  tilt: -6,     // degrees of rotation
  depth: 120,   // px toward the viewer — higher = floats closer = parallaxes more
  drift: 1.5,   // pointer-reaction multiplier
}
```

---

## Two things you still need to add

### 1. The hero portrait — `public/hero/portrait.png`

The hero expects a **background-removed PNG**, roughly 900 × 1200, shot from the
chest up. Send it in **colour** — the black-and-white treatment is applied in CSS
(`grayscale(1) contrast(1.14)`), so the source stays reusable.

Until that file exists the hero automatically falls back to a typographic
wordmark, so nothing is broken in the meantime.

### 2. A social preview image — `public/og-image.png`

1200 × 630. This is what appears when the link is shared on LinkedIn or WhatsApp.

---

## Deploying to Netlify

`netlify.toml` is already configured — build command, publish directory, security
headers, immutable caching for hashed assets, and a SPA fallback.

1. Push this repo to GitHub.
2. Netlify → **Add new site** → **Import an existing project** → pick the repo.
3. Netlify reads `netlify.toml`; no manual settings needed. Deploy.

### Custom domain

1. Netlify → **Domain management** → **Add a domain**.
2. Point the registrar at Netlify's nameservers (easiest), **or** keep your DNS
   and add:
   - `A` record on the apex `@` → `75.2.60.5`
   - `CNAME` on `www` → `<your-site>.netlify.app`
3. Netlify provisions Let's Encrypt SSL automatically once DNS resolves.
4. **Update the hardcoded domain** in three places once you know it:
   - `SITE_URL` in `src/app/core/services/seo.ts`
   - `public/robots.txt`
   - `public/sitemap.xml`

### The contact form

Uses **EmailJS**, carried over from the previous portfolio. Config lives in
`src/app/core/services/mailer.ts`:

| | |
| --- | --- |
| Service | `service_lfwsykn` |
| Template | `template_8vefdke` |
| Public key | `NjiX1UJLL4RlnXE7r` |

The app sends five params — `name`, `email`, `subject`, `message`, `time`. The
first four come from the form; `time` is stamped in IST by the mailer, because
EmailJS does not provide it. **If you rename a field, rename it in the EmailJS
template too**, or that value arrives empty.

### The email templates — `email-templates/`

| File | Role | Params used |
| --- | --- | --- |
| `auto-reply.html` | Confirmation to whoever wrote in | `name`, `subject`, `message` |
| `new-message.html` | Notification to you | `name`, `email`, `subject`, `time`, `message` |

Paste each into the EmailJS template editor's **code view**. In the auto-reply
template set **To** to `{{email}}`; in the notification set **To** to your own
address and **Reply-To** to `{{email}}` so hitting reply threads correctly.

Both are deliberately **image-free**. The previous templates pulled the banner
and avatar from LinkedIn's CDN, whose URLs are signed with an expiry — the ones
in the old repo (`e=1782345600`) died on **25 June 2026**, so those emails have
been arriving with broken images. Typography carries the design instead, so
there is nothing to expire and nothing for a client to block.

Other things they now do that the old pair didn't:

- **Reply button works.** It was `href="#"`; it is now
  `mailto:{{email}}?subject=Re:%20{{subject}}`.
- **The notification shows who wrote.** The old one had name, time and message
  but not the sender's email or subject — you couldn't reply from the email.
- **Line breaks survive.** `white-space:pre-wrap` on the message block, so a
  multi-paragraph enquiry doesn't collapse into one run-on paragraph.
- **Outlook-safe.** Table layout, `bgcolor` alongside CSS, no `object-fit` or
  negative margins (the old avatar used `margin-top:-32px`, which Outlook's Word
  engine ignores — the image overlapped the banner instead of straddling it).
- **Dark-mode opt-out**, so clients don't invert the palette into mud.

The SDK is dynamically imported on first submit, so it stays out of the initial
bundle and off the prerender path.

**Lock the key down.** An EmailJS public key is meant to be visible in client
code, but on its own it lets anyone send from *their* page using *your* monthly
quota. In the EmailJS dashboard go to **Account → Security** and allow-list your
domain. The client also throttles to one send per 10s and blocks headless
browsers, but that is a speed bump, not the fix.

---

## Project shape

```
src/
├─ app/
│  ├─ core/
│  │  ├─ data/profile.ts          ← all content
│  │  ├─ directives/
│  │  │  ├─ spatial-stage.ts      ← publishes --mx/--my; the whole 3D engine
│  │  │  └─ reveal.ts             ← IntersectionObserver scroll reveal
│  │  │  └─ fit-text.ts           ← scales a headline to fill its row
│  │  └─ services/
│  │     ├─ seo.ts                ← meta tags + JSON-LD graph
│  │     └─ mailer.ts             ← EmailJS config + lazy-loaded send
│  ├─ sections/                   ← nav, hero, about, stack, experience,
│  │                                work, services, achievements, contact, footer
│  ├─ shared/                     ← icon, pull-quote, section-head
│  └─ pages/home/
└─ styles.scss                    ← design tokens + .stage/.plane/.sticker system
```

### How the spatial layer works

`SpatialStage` writes exactly two CSS custom properties — `--mx` and `--my`,
normalised to `-1..1` — once per animation frame. Every `.plane` element consumes
them in a single CSS `transform`:

```css
transform:
  translate3d(calc(var(--mx) * var(--drift) * 18px), …, calc(var(--depth) * 1px))
  rotateY(calc(var(--mx) * var(--drift) * 3.6deg));
```

Because depth is per-element, near stickers travel further than the portrait
behind them and the parallax reads as real space. The directive bails out
entirely on coarse pointers and under `prefers-reduced-motion`.
#   P o r t f o l i o - A n g u l a r  
 