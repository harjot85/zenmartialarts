# Zen MMA — Claude Code Instructions

## Project Overview

Marketing website for Zen MMA, a martial arts gym in Chilliwack, BC.
Mostly static. No database. Owner edits class schedule via Decap CMS (no code).
Primary goals: Lighthouse SEO 100, Performance 95+, strong trial booking conversion.

## Tech Stack

- Astro (static output)
- Tailwind CSS v4
- TypeScript (content schemas only)
- Decap CMS (schedule editing at /admin)
- Deployment: Vercel

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run astro check` — TypeScript check

## File Structure

src/
components/ — reusable Astro components
layouts/ — Layout.astro, Head.astro
pages/ — one file per route
content/ — schedule.json (owner-editable via Decap)
styles/ — global.css, design-tokens.css
public/
images/ — optimized WebP images
fonts/ — self-hosted Fontsource files

## Coding Rules

- Mobile-first always. Test at 375px before desktop.
- Use semantic HTML5: header, main, section, article, footer, nav.
- Images MUST have: width, height, alt text, loading="lazy" (hero uses loading="eager").
- No inline styles. Tailwind utilities or CSS custom properties only.
- Self-host fonts via Fontsource. Never use Google Fonts CDN links.
- Output complete files — no truncation, no placeholder comments like "// add logic here".

## SEO Rules (apply to every page)

- Unique <title> per page — include "Chilliwack" and service keyword.
- <meta name="description"> 150–160 chars on every page.
- LocalBusiness JSON-LD schema lives in Head.astro.
- Canonical URL on every page.
- Open Graph + Twitter Card tags on every page.

## Design System

- Font display: Bebas Neue
- Font UI/labels: Barlow Condensed
- Font body: Barlow
- Primary red: #b61b1b
- Background dark: #0a0a0a
- Text light: #f5f5f5
- Buttons: zero border-radius (sharp corners always)
- Form inputs: 2px solid border, zero border-radius, tall padding (20px)

## After Every Change

Run: `npm run astro check && npm run build`
Fix any TypeScript or build errors before considering the task done.

## Deployment

- This is hosted on Github and is deployed on Vercel.

## Do Not

- Use React, Vue, or any JS framework — Astro components only.
- Add npm packages without asking first.
- Modify schedule.json manually — that file is owner-managed via Decap CMS.
- Use Google Fonts CDN.

## Mockup Reference

The approved design has been finalized. Match it exactly.

### Global

- Background: #0a0a0a
- Text: #f5f5f5
- Accent red: #CC1C1C
- All buttons and inputs: border-radius 0 (sharp corners, no exceptions)
- Fonts: Bebas Neue (headlines/logo), Barlow Condensed (labels/nav/badges),
  Barlow (body copy)

### Nav

- Dark bg #0a0a0a, sticky on scroll
- Logo: "ZEN MMA" — ZEN in white, MMA in #CC1C1C
- "Free Trial" button: background #ffffff, color #0a0a0a,
  sharp corners, Barlow Condensed bold uppercase

### Hero

- Full-bleed dark background with subtle red diagonal pattern overlay
- Small red badge top-left: "Now enrolling · Chilliwack, BC"
- Bebas Neue headline, large (72px mobile), red accent on last word
- Grey subheading body text
- Two buttons stacked: red primary CTA + ghost secondary
- Stat strip at bottom (Years / Members / Coaches) separated by borders

### Trust Bar

- Solid #CC1C1C background
- Three items in white uppercase: "No Contract · All Ages · Free First Three Classes"

### Classes Section

- Dark bg, stacked card list
- Each card: #111 bg, red left border on active card
- Class name in Barlow Condensed bold uppercase
- "Popular" / "New" badges in red

### Instructor Carousel

- Horizontally scrollable, snap-to-card
- Cards: 200px wide, portrait photo placeholder on top, bio below
- Red dot indicator tracks current card
- "Swipe to see all coaches" hint text

### Trial Booking Form

- Light bg #f5f5f5 section
- Inputs: white bg, 2px solid #bbb border, padding 20px, zero border-radius
- Submit button: full width, red bg, Bebas Neue, sharp corners
- Note text below button: "No credit card. No pressure. Just show up."

### Testimonials

- Dark #0d0d0d bg
- Cards with red top border
- Red star ratings
- Circular member photo placeholder

### Footer CTA

- Solid #CC1C1C bg
- "READY TO START?" headline in white
- "BOOK FREE TRIAL" button: white bg, red text, sharp corners

### Footer

- #050505 bg
- Gym name, address, phone, nav links in muted color
