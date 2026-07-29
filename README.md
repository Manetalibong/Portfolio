# Astro Starter — Home Service Websites

A reusable Astro starter template for building fast, SEO-optimized websites for home service contractors (plumbers, HVAC, roofers, electricians, etc).

Built with **Astro v6**, **Tailwind CSS v4**, and **Content Collections**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to see the site.

## New Client Setup

Follow these steps when starting a new client website from this template:

### 1. Update Client Config

Edit `src/config/siteConfig.ts` with the client's business details:

- Business name, tagline, phone, email, address
- Domain URL (also update `astro.config.mjs` → `site` and `public/robots.txt`)
- Social media links
- Form endpoint (your Galaxy Growth Media API URL)
- Logo path
- GTM container ID (if applicable)

### 2. Update Brand Colors

Edit the theme colors in `src/styles/global.css` under the `@theme` block:

```css
@theme {
  --color-primary: #1E40AF;       /* Main brand color */
  --color-primary-light: #3B82F6;  /* Hover states */
  --color-primary-dark: #1E3A8A;   /* Active states */
  --color-secondary: #F59E0B;      /* Accent/highlight */
  --color-accent: #10B981;         /* Success/CTA color */
}
```

Change these hex values and the entire site re-themes automatically.

### 3. Add Client Images

Drop images into `public/images/`:

- `logo.png` — Client logo
- `hero.jpg` — Homepage hero background
- `about-team.jpg` — About page team photo
- `services/` — One image per service
- `areas/` — One image per service area
- `blog/` — Blog post featured images
- `portfolio/` — Project photos, before/after images

### 4. Add Services

Create markdown files in `src/content/services/`. Each file needs this frontmatter:

```yaml
---
title: "Drain Cleaning"
description: "Short description for cards and meta."
metaTitle: "Drain Cleaning Services | Business Name"
metaDescription: "Full meta description for search results."
icon: "🔧"
image: "/images/services/drain-cleaning.jpg"
features:
  - "Feature one"
  - "Feature two"
order: 1
---

Markdown body content goes here...
```

### 5. Add Service Areas

Create markdown files in `src/content/serviceAreas/`:

```yaml
---
city: "Houston"
state: "TX"
description: "Short description."
metaTitle: "Plumber in Houston, TX | Business Name"
metaDescription: "Full meta description."
image: "/images/areas/houston.jpg"
---

Markdown body content...
```

### 6. Add Blog Posts

Create markdown files in `src/content/blog/`:

```yaml
---
title: "Post Title"
description: "Short description."
author: "Team Name"
date: 2025-03-15
image: "/images/blog/post-image.jpg"
tags: ["tag1", "tag2"]
---

Markdown body content...
```

### 7. Add Portfolio Projects

Create markdown files in `src/content/portfolio/`:

```yaml
---
title: "Project Title"
description: "Project description."
image: "/images/portfolio/main.jpg"
beforeImage: "/images/portfolio/before.jpg"
afterImage: "/images/portfolio/after.jpg"
tags: ["tag1", "tag2"]
---

Markdown body content...
```

### 8. Customize Page Copy

Edit the homepage (`src/pages/index.astro`) and about page (`src/pages/about.astro`) to match the client's messaging. The "Why Choose Us" section on the homepage and the "Our Values" section on the about page should be customized per client.

### 9. Build & Deploy

```bash
npm run build    # Generates static site in dist/
npm run preview  # Preview the built site locally
```

Deploy the `dist/` folder to Cloudflare Pages, Netlify, Vercel, or any static host.

## Project Structure

```
src/
├── config/
│   ├── siteConfig.ts        # All client-specific business info
│   └── navigation.ts        # Nav links (header + footer)
├── content/
│   ├── services/             # Service markdown files
│   ├── serviceAreas/         # Service area markdown files
│   ├── blog/                 # Blog post markdown files
│   └── portfolio/            # Portfolio/project markdown files
├── content.config.ts         # Collection schemas (Zod validation)
├── layouts/
│   └── BaseLayout.astro      # Main page wrapper
├── components/
│   ├── SEOHead.astro         # Meta tags, OG, Twitter Card
│   ├── Header.astro          # Sticky header with mobile menu
│   ├── Footer.astro          # Footer with contact info + socials
│   ├── Hero.astro            # Hero section with CTA
│   ├── ServiceCard.astro     # Service listing card
│   ├── AreaCard.astro        # Service area listing card
│   ├── CTABanner.astro       # Call-to-action banner
│   ├── ContactForm.astro     # Contact form (POSTs to your API)
│   └── SchemaOrg.astro       # JSON-LD structured data
├── pages/
│   ├── index.astro           # Homepage
│   ├── about.astro           # About Us
│   ├── contact.astro         # Contact Us
│   ├── privacy-policy.astro  # Privacy Policy
│   ├── our-work.astro        # Portfolio / Our Work
│   ├── services/
│   │   ├── index.astro       # All services
│   │   └── [slug].astro      # Individual service
│   ├── service-areas/
│   │   ├── index.astro       # All service areas
│   │   └── [slug].astro      # Individual service area
│   └── blog/
│       ├── index.astro       # Blog listing
│       └── [slug].astro      # Individual blog post
└── styles/
    └── global.css            # Tailwind + theme colors
```

## SEO Features

- Auto-generated `sitemap.xml` via `@astrojs/sitemap`
- `robots.txt` with sitemap reference
- Schema.org JSON-LD (LocalBusiness, Service, Article, BreadcrumbList)
- Open Graph and Twitter Card meta on every page
- Canonical URLs on every page
- Semantic HTML with proper heading hierarchy
- Zero JavaScript by default (only contact form + mobile menu)
- Static HTML output for maximum Core Web Vitals scores

## Commands

| Command           | Action                              |
|-------------------|-------------------------------------|
| `npm run dev`     | Start dev server at `localhost:4321`|
| `npm run build`   | Build static site to `./dist/`      |
| `npm run preview` | Preview built site locally          |
