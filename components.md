# UI components to create (recommended)

## /components/ui
Core primitives:
- **Container**: max-w token + px-6
- **SectionShell**: outer rounded container for most sections (rounded-3xl, very dark bg, subtle border)
- **Pill**: shared pill style (rounded-full, subtle border, tiny dot option)
- **ButtonPill**: pill button with border + soft glow (primary/secondary variants)
- **Chip**: small rounded chip (skills/tools)
- **GlassPillLink**: the “View Casestudy” overlay pill (backdrop blur + border)
- **Divider**: subtle horizontal rule
- **IconBadge**: small icon-only badge used in cards (optional)

Section-specific:
- **StepCard**: process steps (icon, title, divider, body, step number)
- **ServiceCard**: 2x2 grid cards under Services
- **TagScroller**: horizontally scrollable row(s) of capability pills with icons
- **ReviewCard**: testimonial card with avatar, quote, rating
- **StarRating**: 5-star display
- **Accordion**: FAQ accordion (can use shadcn/ui)

## /components/sections
- Hero
- ProjectsMosaic
- ProjectsCarousel
- About
- RecentWorksRow
- Process
- Services
- Reviews
- StatsBar
- FAQ
- Footer (later)

