# Spec folder (Framer → Next.js rebuild)

Goal: recreate the Framer site as a clean Next.js (App Router) + Tailwind codebase.

How to use:
1) Put section screenshots in /spec/screens (desktop + mobile).
2) Fill /spec/tokens.md with exact values (fonts, colors, radius, shadows).
3) Build sections in the order described in /spec/sections/home.md.

Non-negotiable rules:
- Build section-by-section (no “whole site in one shot”).
- Match layout & spacing first, typography second, effects third, motion last.
- UI primitives go in /components/ui; page sections in /components/sections.
