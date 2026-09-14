# Udhayan S — Portfolio

A neo-brutalist **sticker-collage portfolio** with a CSS 3D spatial hero, built with **Angular 22** and fully prerendered to static HTML.

The portfolio combines a bold visual system with an SEO-first architecture, accessible interactions, and zero runtime animation dependencies.

> **90 KB transferred · 1 prerendered route · no trackers**

---

## ✨ Highlights

* **CSS 3D spatial hero**

  * Real `translateZ()` depth planes
  * Perspective-based spatial layout
  * Pointer-driven parallax
  * No WebGL
  * No animation libraries
  * **0 KB of additional JavaScript for the spatial effect**

* **SEO-first**

  * Fully prerendered HTML
  * All visible content available in the initial HTML
  * `Person`, `WebSite`, and `ItemList` JSON-LD
  * Open Graph metadata
  * Twitter cards
  * Canonical URL
  * Sitemap and robots configuration

* **Accessible**

  * Keyboard navigation
  * Skip-to-content link
  * Semantic HTML
  * `prefers-reduced-motion` support
  * Motion completely disabled when reduced motion is requested
  * Spatial collage collapses into a readable layout on touch devices

* **Single source of content**

  * Portfolio copy lives in one TypeScript data file
  * Updating the content automatically updates the UI and structured data

* **Performance focused**

  * Static prerendering
  * Lazy-loaded EmailJS SDK
  * No trackers
  * Immutable caching for hashed assets
  * Lightweight client-side JavaScript

---

## 🖼️ Preview

Add screenshots or a screen recording here.

```text
Coming soon
```

You can also add your live portfolio:

**Live:** `https://your-domain.com`

---

## 🛠️ Tech Stack

| Category      | Technology                         |
| ------------- | ---------------------------------- |
| Framework     | Angular 22                         |
| Language      | TypeScript                         |
| Styling       | SCSS                               |
| 3D / Parallax | CSS `perspective` + `translateZ()` |
| Animation     | CSS + native browser APIs          |
| Scroll reveal | `IntersectionObserver`             |
| Contact form  | EmailJS                            |
| SEO           | Angular SEO service + JSON-LD      |
| Deployment    | Netlify                            |
| Hosting       | Static prerendered output          |

---

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development server

```bash
npm start
```

The application will be available at:

```text
http://localhost:4200
```

### Production build

```bash
npm run build
```

The prerendered output is generated at:

```text
dist/udhayan-portfolio/browser
```

### Preview the production build

```bash
npm run preview
```

The static site will be available at:

```text
http://localhost:4300
```

### Type checking

```bash
npm run typecheck
```

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── core/
│   │   ├── data/
│   │   │   └── profile.ts
│   │   │
│   │   ├── directives/
│   │   │   ├── spatial-stage.ts
│   │   │   ├── reveal.ts
│   │   │   └── fit-text.ts
│   │   │
│   │   └── services/
│   │       ├── seo.ts
│   │       └── mailer.ts
│   │
│   ├── sections/
│   │   ├── nav/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── stack/
│   │   ├── experience/
│   │   ├── work/
│   │   ├── services/
│   │   ├── achievements/
│   │   ├── contact/
│   │   └── footer/
│   │
│   ├── shared/
│   │   ├── icon/
│   │   ├── pull-quote/
│   │   └── section-head/
│   │
│   └── pages/
│       └── home/
│
└── styles.scss
```

---

# 📝 Content Architecture

All portfolio content is maintained in a single file:

```text
src/app/core/data/profile.ts
```

There is no need to edit individual templates to update portfolio content.

| Export           | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| `PROFILE`        | Name, contact information and social links     |
| `HERO`           | Hero headline and introduction                 |
| `STICKERS`       | Floating collage stickers, positions and depth |
| `MARQUEE`        | Scrolling ticker beneath the hero              |
| `STATS`          | Statistics cards                               |
| `ABOUT`          | Biography and personal facts                   |
| `SKILLS`         | Technology and skill groups                    |
| `ROLES`          | Professional experience                        |
| `EDUCATION`      | Education timeline                             |
| `PROJECTS`       | Portfolio projects                             |
| `SERVICES`       | Services offered                               |
| `ACHIEVEMENTS`   | Awards and achievements                        |
| `CERTIFICATIONS` | Certifications                                 |
| `QUOTES`         | Section pull quotes                            |

This keeps the content layer independent from the presentation layer.

---

# 🎨 Customizing the Spatial Collage

The hero collage is driven by the `STICKERS` configuration.

Each sticker defines its position, rotation, depth and parallax behaviour:

```ts
{
  x: 13,
  y: 12,
  tilt: -6,
  depth: 120,
  drift: 1.5
}
```

### Properties

| Property | Description                          |
| -------- | ------------------------------------ |
| `x`      | Horizontal position as a percentage  |
| `y`      | Vertical position as a percentage    |
| `tilt`   | Base rotation in degrees             |
| `depth`  | Distance toward the viewer in pixels |
| `drift`  | Pointer-parallax multiplier          |

Higher `depth` values make elements appear closer to the viewer and increase their perceived parallax movement.

---

# 🧊 How the 3D Spatial Layer Works

The spatial system intentionally avoids WebGL and animation libraries.

`SpatialStage` calculates the pointer position and exposes only two CSS custom properties:

```text
--mx
--my
```

Both values are normalized to the range:

```text
-1 → 1
```

The directive updates these values once per animation frame.

Individual planes then consume those values directly in CSS:

```css
transform:
  translate3d(
    calc(var(--mx) * var(--drift) * 18px),
    ...,
    calc(var(--depth) * 1px)
  )
  rotateY(
    calc(var(--mx) * var(--drift) * 3.6deg)
  );
```

Each element has its own depth and drift values, creating the illusion of a physical layered space.

For example:

```text
Background
    ↓
Portrait
    ↓
Stats
    ↓
Stickers
    ↓
Foreground elements
```

The closer an element is to the viewer, the stronger its parallax response.

---

## ♿ Accessibility & Reduced Motion

The spatial system automatically disables itself when:

* The device uses a coarse pointer
* `prefers-reduced-motion: reduce` is enabled

Reduced motion is handled as an actual mode switch rather than simply reducing animation speed.

```css
@media (prefers-reduced-motion: reduce) {
  /* Motion is disabled */
}
```

On touch devices, the spatial collage also collapses into a conventional readable layout.

---

# 🔍 SEO

The portfolio is designed to be SEO-friendly from the initial HTML response.

### Included

* Prerendered HTML
* Semantic markup
* Canonical URL
* Open Graph metadata
* Twitter card metadata
* `robots.txt`
* `sitemap.xml`
* JSON-LD structured data

The structured data contains:

```text
Person
WebSite
ItemList
```

SEO metadata is managed through:

```text
src/app/core/services/seo.ts
```

---

# 🖼️ Required Assets

Two assets still need to be added before the portfolio is considered complete.

## 1. Hero Portrait

Location:

```text
public/hero/portrait.png
```

Recommended specifications:

* PNG
* Background removed
* Approximately `900 × 1200`
* Chest-up portrait
* Original image in colour

The portfolio applies the visual treatment through CSS:

```css
filter: grayscale(1) contrast(1.14);
```

Keeping the source image in colour makes the asset reusable elsewhere.

If the image is missing, the hero automatically falls back to a typographic wordmark.

---

## 2. Social Preview Image

Location:

```text
public/og-image.png
```

Recommended size:

```text
1200 × 630
```

This image is used when the portfolio URL is shared on platforms such as LinkedIn and WhatsApp.

---

# 📬 Contact Form

The contact form uses **EmailJS**.

The integration is located at:

```text
src/app/core/services/mailer.ts
```

The EmailJS SDK is dynamically imported only when the user submits the form, keeping it out of the initial bundle and prerendering path.

### Parameters

The application sends:

```text
name
email
subject
message
time
```

The first four values come directly from the contact form.

`time` is generated by the mailer in IST because EmailJS does not provide the submission timestamp required by the notification template.

> If a form field is renamed, the corresponding EmailJS template variable must also be renamed.

---

# ✉️ Email Templates

Email templates are stored in:

```text
email-templates/
├── auto-reply.html
└── new-message.html
```

| Template           | Purpose                                  | Parameters                                    |
| ------------------ | ---------------------------------------- | --------------------------------------------- |
| `auto-reply.html`  | Confirmation sent to the visitor         | `name`, `subject`, `message`                  |
| `new-message.html` | Notification sent to the portfolio owner | `name`, `email`, `subject`, `time`, `message` |

Paste each template into the EmailJS template editor using **Code View**.

### Auto-reply

Set:

```text
To → {{email}}
```

### Notification

Set:

```text
To → your email address
Reply-To → {{email}}
```

This allows replies to go directly to the person who submitted the form.

---

## 📧 Email Template Design

The templates intentionally avoid external images.

The previous implementation depended on LinkedIn CDN assets with expiring signed URLs. Those URLs expired on **25 June 2026**, causing broken images in previously delivered emails.

The new templates are:

* Image-free
* Table-based for email-client compatibility
* Outlook-friendly
* Dark-mode aware
* Compatible with multi-line messages
* Designed without negative margins or unsupported layout tricks

The notification email also includes:

* Sender name
* Sender email
* Subject
* Submission time
* Full message
* Functional reply action

Line breaks are preserved with:

```css
white-space: pre-wrap;
```

---

# 🔐 EmailJS Security

The EmailJS public key is intentionally exposed in client-side code because it is designed to be a public credential.

However, the key should still be restricted.

In the EmailJS dashboard:

```text
Account → Security
```

Allow-list the production domain.

The application also includes client-side protections such as:

* 10-second send throttling
* Headless-browser detection

These are only additional safeguards and should not replace domain restrictions in EmailJS.

---

# 🌐 Deploying to Netlify

The repository already contains:

```text
netlify.toml
```

It handles:

* Build command
* Publish directory
* Security headers
* Immutable caching for hashed assets
* SPA fallback

### Deployment

1. Push the repository to GitHub.
2. Open Netlify.
3. Select **Add new site**.
4. Choose **Import an existing project**.
5. Select the GitHub repository.
6. Deploy.

Netlify will use the existing `netlify.toml` configuration.

---

# 🌍 Custom Domain

After deploying:

1. Open **Domain management** in Netlify.
2. Select **Add a domain**.
3. Configure DNS using either Netlify nameservers or your existing DNS provider.

For DNS-based configuration:

```text
A      @      → 75.2.60.5
CNAME  www    → <your-site>.netlify.app
```

Netlify automatically provisions a Let's Encrypt SSL certificate once DNS is correctly configured.

After the final domain is known, update it in:

```text
src/app/core/services/seo.ts
public/robots.txt
public/sitemap.xml
```

---

# ⚡ Performance

The portfolio is intentionally designed around a small client-side footprint.

### Principles

* Static prerendering
* No WebGL
* No animation framework
* No external animation dependency
* Lazy-loaded EmailJS
* CSS-driven spatial effects
* Native `IntersectionObserver`
* Hashed asset caching
* No trackers

Target build characteristics:

```text
~90 KB transferred
1 prerendered route
0 trackers
```

---

# 🧩 Architecture Overview

```text
                    ┌─────────────────────┐
                    │   profile.ts        │
                    │  Single Source      │
                    │    of Content       │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ↓                    ↓                    ↓
     Components            SEO Service          JSON-LD
          │                    │                    │
          ↓                    ↓                    ↓
       HTML/CSS          Meta Tags             Structured Data
          │
          ↓
    Prerendered Site
          │
          ├── Netlify
          │
          └── Static HTML
```

The portfolio separates:

```text
Content
   ↓
Presentation
   ↓
SEO
   ↓
Deployment
```

This makes content updates possible without modifying individual section templates.

---

# 📜 Scripts

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `npm install`       | Install dependencies              |
| `npm start`         | Start development server          |
| `npm run build`     | Build and prerender the portfolio |
| `npm run preview`   | Preview the production build      |
| `npm run typecheck` | Run TypeScript type checking      |

---

# 📌 Roadmap

* [ ] Add final hero portrait
* [ ] Add social preview image
* [ ] Configure production domain
* [ ] Verify Open Graph previews
* [ ] Verify sitemap and canonical URL
* [ ] Configure EmailJS domain allow-list
* [ ] Deploy to Netlify
* [ ] Run Lighthouse/accessibility checks

---

# 👤 Author

**Udhayan S**

Software Engineer focused on building scalable web applications, developer tools and practical products.

* GitHub: `UdhayanS`
* LinkedIn: `udhayan-sk7`
* Portfolio: `udhayan-portfolio.netlify.app`

---

## 📄 License

This project is a personal portfolio.

The source code is available for reference and learning. Personal branding, content, photographs, and other identity-specific assets are not intended for reuse.
