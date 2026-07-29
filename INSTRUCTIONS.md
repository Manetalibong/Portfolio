# Astro Starter — Home Service Websites

A reusable Astro starter template for building fast, SEO-optimized websites for home service contractors (plumbers, HVAC, roofers, electricians, etc).

Built with **Astro v6**, **Tailwind CSS v4**, and **Content Collections**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to see the site.

## New Client Workflow

### 1. Clone this template for the new client

Create a new repo from this template on GitHub, then clone it locally:

```bash
git clone https://github.com/dmonty88/[client-repo-name].git
cd [client-repo-name]
npm install
```

### 2. Add the client info file

Drop the client's **info / build instruction file** into `src/config/`. This is the single source of truth for the build:

- Business name, phone, email, domain, form endpoint, etc.
- Brand voice & positioning
- Services list (with slugs, titles, target keywords)
- Service areas
- Form integration details
- Build notes

**Example filename:** `WheelRushClientInfo.txt` or `gf-cleaning-services-site-build-instructions.md`

Cursor reads this file to populate `siteConfig.ts`, create pages, write content, and set up navigation.

### 3. Add client images + logo

Drop all client images + logo into `public/images/` (single flat folder, no subdirectories).

**Rename descriptively** so Cursor knows what each image is for:
- `logo.png` — Client logo (also used to generate favicons; stays PNG)
- `hero.jpg` — Best wide/hero-quality shot for homepage background
- `about-team.jpg` — Team or owner photo
- `driveway-cleaning.jpg` — Photo matching a specific service
- `pressure-washing-austin.jpg` — Photo for a service area page

### 4. First Cursor prompt (home page)

After the client info file, logo, and images are in place, paste this prompt:

```
Please create a beautiful, modern, high-converting website for the client based on the client info file in src/config/.

First run:
npm run optimize-images
npm run favicons

Then use the post-optimize image paths (photos will be .webp; logo stays logo.png). Do not leave the starter Astro favicon.

Look at the logo in public/images/. Extract the brand colors from it and build a professional color palette that fits a home service contractor. If the logo only has one or two colors, pair them with clean complementary neutrals. Update siteConfig + global.css accordingly.

Build top navigation with Services, Service Areas, About, and Contact. Do NOT include Home in the nav — the logo already links to the homepage.

If there are a lot of services, do NOT put them all in one massive dropdown. Group them into logical categories that make sense for the trade/industry and create multiple nav dropdowns (e.g. a plumber with 15+ services might have "Residential Plumbing", "Commercial Plumbing", "Drain & Sewer", "Water Heater Services" as separate dropdowns, each containing the relevant services). Use your judgment on what groupings make sense based on the type of business. If there are only a handful of services, a single Services dropdown is fine.

Apply the same logic to Service Areas — group by region or state when there are many.

Follow INSTRUCTIONS.md for copy rules (no EM dashes), SEO rules, section library usage, and trailing slashes on internal links.

Let's just start with the home page for now.

Build a full, conversion-optimized home page. Use the section library in _section-library/ to compose it. Include the normal home sections, and if you can identify any other sections that would make sense for this specific trade based on what they do, add them. More content is better. Think about things like certifications, brands they work with, before/after showcase placeholders, emergency service callouts, financing mentions — whatever is relevant. Use your judgment.
```

**Build order after the home page is approved:**
1. Iterate on home look/feel if needed
2. Confirm `siteConfig.ts`, brand colors, fonts, navigation
3. About page
4. Service pages (from the client info file)
5. Service area pages
6. Contact page
7. Any remaining pages (blog, portfolio, etc.)

### 5. Delete preview files before deploy

Remove these before going live (they're only for section previewing during development):
- `public/images/Preview/` — mock stock images
- `src/pages/preview/` — preview pages
- `src/layouts/PreviewLayout.astro`

### 6. Build & Deploy

```bash
npm run build    # Generates static site in dist/
npm run preview  # Preview the built site locally
```

Deploy the `dist/` folder to Cloudflare Pages, Netlify, Vercel, or any static host.

---

## Reference: How Cursor Should Build

Everything below is reference material for Cursor when building pages.

### Navigation rules

- Do **not** put "Home" in the main nav. The logo links to `/`.
- Prefer grouped dropdowns when services or areas are numerous (see first prompt above).
- Trailing slashes on every internal `href` (e.g. `/about/`, `/services/drain-cleaning/`).

### Section Library

Import sections from `_section-library/` to compose pages. Every `.astro` file has a comment block describing what it looks like and what props it takes.

| Category | Folder | Variants |
|----------|--------|----------|
| Headers | `_section-library/headers/` | HeaderSimple, HeaderTwoTier, HeaderThreeTier, HeaderTopBar, HeaderContainedDark, HeaderContainedLight |
| Heroes | `_section-library/heroes/` | HeroCentered, HeroSplit, HeroSplitDark, HeroWithStats, HeroWithForm, HeroBoldLeft |
| Testimonials | `_section-library/testimonials/` | TestimonialsGrid, TestimonialsSimple, TestimonialsFeatured, TestimonialsColorCards |
| Features | `_section-library/features/` | FeaturesGrid, FeaturesAlternating, FeaturesWithImage, FeaturesLinkedCards, ServicesShowcase, ServicesImageStrip, ServicesGridDark, ServicesGridBold, ServicesWithPhoto, ServicesHoverGrid, ServicesOverlayCards, ServicesEditorial, ServicesPopular, ServicesCenterImage, PricingTable |
| CTA | `_section-library/cta/` | CTABanner, CTAWithForm, CTASplit, CTABold |
| FAQ | `_section-library/faq/` | FAQAccordion, FAQTwoColumn, FAQWithImage, FAQSplitImage, FAQDecorated, FAQImageRight, FAQGallery |
| Stats | `_section-library/stats/` | StatsBar, StatsGrid |
| Gallery | `_section-library/gallery/` | GalleryGrid, GalleryBeforeAfter, GalleryMarquee |
| Content | `_section-library/content/` | ContentSplit, ContentFullWidth, ContentBeforeAfter, ContentShowcase, ContentMosaicStats, ContentTiltedImage, ContentFeatured, WhyChooseUs, AboutDecorative, WhyChooseUsCenter, ProcessSteps, ProcessStepsCards, ServiceAreaMap, ServiceAreaMapFull, CompanyIntro, ValuesPillars |

**Page templates** for dynamic routes live in `_section-library/templates/`:

| Type | Folder | Variants |
|------|--------|----------|
| Service pages | `templates/services/` | ServiceSidebar, ServiceFullWidth, ServiceHeroImage |
| Service area pages | `templates/service-areas/` | AreaDefault, AreaWithSidebar |
| Blog posts | `templates/blog/` | BlogDefault, BlogWithSidebar |

### Config Files to Update

Based on the instruction MD file, Cursor should update:

1. **`src/config/siteConfig.ts`** — All business details, form endpoint, pattern, silhouette
2. **`src/styles/global.css`** — Brand colors + fonts in the `@theme` block
3. **`astro.config.mjs`** — The `site` field (client's domain)
4. **`src/config/navigation.ts`** — Menu structure from the instruction file

Do **not** maintain a static `public/robots.txt`. It is generated at `/robots.txt` from `siteConfig`.

**Fonts:** Default is the system UI stack (no network request). For a branded typeface, self-host the files under `public/fonts/`, add `@font-face` in `global.css`, and point `--font-sans` / `--font-heading` at that family. Do not load fonts from Google Fonts.

### Header Styles

Pick one header variant from `_section-library/headers/` and copy its contents into `src/components/Header.astro`:

| Header | Description | Best for |
|--------|-------------|----------|
| **HeaderSimple** | Single sticky row — logo, nav links, phone CTA | Clean, minimal sites |
| **HeaderTwoTier** | Logo/phone row + primary-colored nav bar | Mid-range professional look |
| **HeaderThreeTier** | Top utility bar (location, socials) + logo/phone row + nav bar | Established businesses wanting bold, info-rich header |
| **HeaderTopBar** | Slim utility bar (phone, hours, socials) + clean white nav bar below | Professional services, contractors who want contact info visible |
| **HeaderContainedDark** | Floating dark pill navbar over hero content | Modern, premium-feeling sites with strong hero imagery |
| **HeaderContainedLight** | Floating white pill navbar over hero content | Clean, airy sites over dark hero backgrounds |

### Visual Polish: Dividers & Patterns

**Dividers** — place between any two sections:

```astro
import SectionDivider from "../components/SectionDivider.astro";

<DarkSection />
<SectionDivider type="torn" color="text-white" />
<WhiteSection />
```

Types: `wave`, `torn`, `rough`, `angle`, `curve`, `zigzag`. Add `flip` to flip vertically.

**Background patterns** — set `siteConfig.pattern` once per client. Apply to dark/accent sections for consistent texture.

| Class | Effect | Best for |
|-------|--------|----------|
| `pattern-dots` | Offset dot pairs | Minimal, universal |
| `pattern-grid` | Geometric triangle grid | Corporate, clean |
| `pattern-diagonal` | Fine diagonal stripes | Corporate, professional |
| `pattern-topography` | Organic contour lines | Outdoor, landscaping |
| `pattern-waves` | Repeating wave curves | Plumbing, pool, marine |
| `pattern-zigzag` | Chevron zigzag | Bold, modern |
| `pattern-diamonds` | Repeating diamond tiles | Bold, contractor |
| `pattern-crosses` | Plus/cross grid | Medical, clean |
| `pattern-circuit` | Circuit board traces | Electrical, HVAC, tech |
| `pattern-hexagons` | Hexagonal tile pattern | Industrial, modern |
| `pattern-noise` | Grainy paper texture | Subtle, pairs with any other pattern |

Sections using patterns need `relative overflow-hidden` and content needs `relative z-10`.

### Icons

All sections use the `Icon` component instead of emojis:

```astro
import Icon from "../components/Icon.astro";
<Icon name="wrench" class="h-6 w-6 text-primary" />
```

Available: `wrench`, `shield`, `shield-check`, `star`, `phone`, `clock`, `map-pin`, `home`, `users`, `award`, `zap`, `thumbs-up`, `check`, `check-circle`, `settings`, `tool`, `truck`, `droplet`, `flame`, `thermometer`, `wind`, `sun`, `bolt`, `hammer`, `hard-hat`, `clipboard`, `arrow-right`, `search`, `eye`, `leaf`, `heart`, `dollar`, `lock`, `target`, `tag`, `refresh`.

Industry icon picks:
- **Plumbing**: `droplet`, `wrench`, `thermometer`, `tool`
- **HVAC**: `flame`, `wind`, `thermometer`, `sun`
- **Roofing**: `home`, `hammer`, `hard-hat`, `shield-check`
- **Electrical**: `zap`, `bolt`, `sun`, `settings`
- **Landscaping**: `leaf`, `sun`, `eye`, `truck`
- **Pressure Washing**: `droplet`, `zap`, `shield-check`, `star`
- **Cleaning**: `star`, `check-circle`, `shield-check`, `clock`
- **General contractor**: `hard-hat`, `hammer`, `tool`, `clipboard`

### Decorative Silhouettes

Set `siteConfig.silhouette` once per client:

| Type | Best for |
|------|----------|
| `trees` | Landscaping, tree service, outdoor contractors |
| `cityscape` | General contractors, commercial, urban services |
| `roofline` | Roofing, home improvement, remodeling |
| `tools` | Plumbing, electrical, HVAC, handyman |
| `waves` | Plumbing, pool service, marine, pressure washing |
| `mountains` | General outdoor, rural contractors |

### Copy Rules

- Do **not** use EM dashes (—) in any website copy (headlines, paragraphs, CTAs, FAQs, meta descriptions, etc.)
- Prefer full sentences, commas, or a single hyphen/dash (-) instead
- Bad: `Reliable plumbing — same-day service available`
- Good: `Reliable plumbing. Same-day service available.` or `Reliable plumbing, with same-day service available.` or `Reliable plumbing - same-day service available`

### SEO Rules

Aligned with current Astro SEO practice (technical foundation + local business schema). Cursor should follow these on every client build.

**Technical**
- One H1 per page; keyword/topic in H1, `<title>`, and opening paragraph
- Trailing slashes on every internal link (`trailingSlash: 'always'` in `astro.config.mjs`)
- Canonical URLs are path-only (no UTM/query params); omit canonical when `noindex` is set
- Robots meta includes `max-snippet:-1, max-image-preview:large, max-video-preview:-1`
- Sitemap auto-generated and split by collection (`services`, `service-areas`, `blog`); preview routes excluded
- `robots.txt` and `llms.txt` are generated from `siteConfig` (update `domain` there — do not hand-edit a static robots file)
- `<link rel="sitemap">` in the head; Open Graph on every page; Twitter only needs `twitter:card` (falls back to OG)
- `public/_headers` sets long-cache for `/_astro/` + `/images/` and `No-Vary-Search` for UTM params (Cloudflare Pages / Netlify)

**Structured data**
- Linked JSON-LD `@graph` on every page: `WebSite` + `LocalBusiness` + `WebPage` + `BreadcrumbList`
- Service pages add a `Service` node; blog posts add an `Article` node — all wired with `@id` references
- Breadcrumb URLs must use trailing slashes

**Content (topics over exact keyphrases)**
- Cover the topic thoroughly and clearly; exact keyword stuffing matters less than it used to
- Lead paragraphs with the point; one idea per paragraph; short sentences; no filler
- Write so a paragraph can stand alone (humans + AI extraction)
- Meta titles ~30–65 chars and descriptions ~70–160 when practical (enforced softly via content frontmatter)

**Skip unless a client asks:** IndexNow, auto OG image generation, RSS, schema endpoints / NLWeb, markdown alternate routes.

**After launch**
- Submit the sitemap index in Google Search Console and Bing Webmaster Tools
- Validate JSON-LD with Google’s Rich Results Test / ClassySchema

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
│   ├── SEOHead.astro         # Meta tags, OG, robots, canonical
│   ├── Header.astro          # Site header (swap from _section-library/headers/)
│   ├── Footer.astro          # Footer with contact info + socials
│   ├── Hero.astro            # Hero section with CTA
│   ├── ServiceCard.astro     # Service listing card
│   ├── AreaCard.astro        # Service area listing card
│   ├── CTABanner.astro       # Call-to-action banner
│   ├── LeadForm.astro        # Reusable lead form (full/compact variants)
│   ├── ContactForm.astro     # Contact page wrapper (uses LeadForm)
│   ├── PageHeader.astro      # Interior page banner (image/solid bg + breadcrumbs)
│   ├── GoogleMap.astro       # Reusable Google Maps iframe embed
│   ├── SectionDivider.astro  # SVG edge dividers (torn, wave, angle, curve, zigzag, rough)
│   ├── Icon.astro            # SVG icon set (~30 icons referenced by name)
│   ├── Silhouette.astro      # Decorative SVG silhouettes
│   └── SchemaOrg.astro       # Linked JSON-LD @graph
├── pages/
│   ├── index.astro           # Homepage
│   ├── about.astro           # About Us
│   ├── contact.astro         # Contact Us
│   ├── privacy-policy.astro  # Privacy Policy
│   ├── our-work.astro        # Portfolio / Our Work
│   ├── robots.txt.ts         # Dynamic robots.txt from siteConfig
│   ├── llms.txt.ts           # AI/agent site summary from siteConfig
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

## Commands

| Command           | Action                              |
|-------------------|-------------------------------------|
| `npm run dev`     | Start dev server at `localhost:4321`|
| `npm run build`   | Build static site to `./dist/`      |
| `npm run preview` | Preview built site locally          |
| `npm run favicons`| Generate favicons from `public/images/logo.png` |
| `npm run optimize-images` | Resize photos + convert to WebP in `public/images/` (logo stays PNG) |
