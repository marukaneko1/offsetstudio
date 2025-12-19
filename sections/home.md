# Home page section contracts (Cursor should follow this)

This spec is derived from the provided Framer screenshots. Aim for *visual parity* first; exact pixel perfection is optional.

---

## 1) Hero
**Visual**
- Full-bleed black background with a soft blurred “smoke” / gradient shape behind the headline.
- Centered layout (max width ~1100px).
- Eyebrow pill above H1: tiny dot + label.
- H1: very large, thin, white, 2 lines.
- Subcopy: muted white/gray, centered.
- 2 CTA pill buttons side-by-side: **Get Started Now** + **See Projects**.

**Implementation**
- File: `/components/sections/Hero.tsx`
- Use `Container` + `SectionShell` (hero uses shell but without rounded outer card).

---

## 2) Projects Mosaic (top portfolio grid)
**Visual**
- Dense masonry-like grid (3 columns with mixed heights).
- Each tile is an image with rounded corners.
- Each tile has a glassy overlay pill button near the bottom: **View Casestudy** + arrow icon.
- Some tiles are larger (center column tall).

**Implementation**
- File: `/components/sections/ProjectsMosaic.tsx`
- Data: `projectsMosaic: { imageSrc, href }[]`

---

## 3) Projects Carousel Row (4-up with arrow)
(Seen right before “Process” section)

**Visual**
- Horizontal row of ~4 image cards, each with **View Casestudy** overlay pill.
- On the far right: a circular “next” arrow button (carousel affordance).
- Row sits above the next rounded section container.

**Implementation**
- File: `/components/sections/ProjectsCarousel.tsx`
- Behavior: use `overflow-x-auto` snap scrolling on small screens; on desktop can stay fixed 4-up.
- Data: `projectsCarousel: { imageSrc, href }[]`

---

## 4) About (“Meet Meily”)
(Already captured in earlier screenshots)

**Visual**
- Left: “Meet Meily” heading, short bio, chip row, experience table.
- Right: large image card with rounded corners.

**Implementation**
- File: `/components/sections/About.tsx`

---

## 5) Recent Works
**Visual**
- Heading “Recent Works” with a down-arrow-in-circle icon.
- Divider line across.
- Horizontal row of image cards (scrollable on smaller screens).

**Implementation**
- File: `/components/sections/RecentWorksRow.tsx`
- Data: `recentWorks: { imageSrc, href? }[]`

---

## 6) Process (Design process)
**Visual**
- Section appears inside a large rounded container (soft border, very dark fill).
- Layout: two columns.
  - **Left:** a large, rounded image (black/white photo).
  - **Right:** pill label “Design process”, big title **Process**, subcopy line.
  - CTA buttons: **Book a Free Call** + **See Projects**
  - Below CTAs: stacked step cards (3 steps).
- Step cards:
  - Rounded, slightly lighter dark background.
  - Top left small icon.
  - Title + divider line.
  - Body text.
  - Step number in top-right (1/2/3).

**Step titles observed**
1. Define Your Vision
2. Submit Your Request
3. Project Delivered

**Implementation**
- Files:
  - `/components/sections/Process.tsx`
  - `/components/ui/StepCard.tsx`
- Data:
  - `processSteps: { step: number, icon: ReactNode, title: string, body: string }[]`

---

## 7) Services (Design services)
**Visual**
- Another large rounded section container.
- Two-column header layout:
  - **Left:** pill “Design services”, title **Services**, subcopy.
  - Under subcopy: a chip row of services (small dark pills).
  - Divider line.
  - CTA buttons: **Book a Free Call** + **See Projects**
  - **Right:** big rounded image.
- Below header: 2x2 grid of service cards:
  - Brand Identity
  - Brand Design
  - Package Design
  - Mockup Design
- Under the cards: long horizontally-scrollable “capability” pills (with small icons), e.g.
  - Copywriting, Brand Graphics, Brand Migration, Packaging Design, Branding, Slide Decks, Social Media, Icons, Brand Landing Pages, Optimization, Brand Integrations, Brand Visibility…

**Implementation**
- Files:
  - `/components/sections/Services.tsx`
  - `/components/ui/ServiceCard.tsx`
  - `/components/ui/TagScroller.tsx`
- Data:
  - `servicesChips: string[]`
  - `serviceCards: { icon: ReactNode, title: string, body: string }[]`
  - `capabilityTags: { icon?: ReactNode, label: string }[]`

---

## 8) Reviews (Client Reviews)
**Visual**
- Large rounded container.
- Two-column header:
  - **Left:** big rounded image.
  - **Right:** pill “Reviews”, title **Client Reviews**, subcopy.
  - CTA buttons: **Book a Free Call** + **See Services**
- Below: 3-up review cards (dark, rounded)
  - Circular avatar at top
  - Name
  - Role/company line
  - Divider
  - Quote
  - Rating row with “5.0” + stars

**Observed reviewers**
- June Lee — CEO of GreenRoots
- Jona Carter — Founder of EcoLux
- Sofia Toms — Founder at GreenK Studios

**Implementation**
- Files:
  - `/components/sections/Reviews.tsx`
  - `/components/ui/ReviewCard.tsx`
  - `/components/ui/StarRating.tsx`

---

## 9) Stats Bar
**Visual**
- Wide rounded card with 3 columns separated by thin vertical rules:
  - 180+ — design projects completed.
  - 96% — Client satisfaction rate.
  - 15+ — Years of experience

**Implementation**
- File: `/components/sections/StatsBar.tsx`
- Data: `stats: { value: string, label: string }[]`

---

## 10) FAQ (“Answers”)
**Visual**
- Section with pill label “FAQ'S” (as shown), big title **Answers**.
- Right side: accordion list. One open item shows:
  - Question row with close “x” icon on the right when open.
  - Answer text below.

**Implementation**
- Files:
  - `/components/sections/FAQ.tsx`
  - `/components/ui/Accordion.tsx` (or shadcn Accordion)
- Data: `faqs: { q: string, a: string }[]`

---

## Data placeholders
Keep section data inside each section component for now (simple arrays). Later wire to CMS if needed.

**Common**
- `imageSrc` should be taken from `/public/images/...` (you will add real assets).
- Use `next/image`.

