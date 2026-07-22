# Design System

## Brand Direction
Premium corporate maritime, fleet logistics, and commodity export portal.

The visual direction follows the supplied company profile PDFs:
- `COMPRO - RAK.pdf` for PT. Ransa Agencies Kalbarindo
- `COMPRO - RAT.pdf` for PT. Ransa Armada Tangguh
- `COMPRO - REM.pdf` for PT. Ransa Energi Muda assets and commodity context

## Core Colors
- RAK Blue: `#2d3490`
- RAK Red: `#ee1b2a`
- Deep Blue: `#171f6c`
- Industrial Charcoal: `#1f2228`
- White: `#ffffff`
- Mist Gray: `#f4f7fa`
- Body Text: `#122033`
- Muted Text: `#66758a`

Avoid drifting into generic teal/emerald maritime palettes. Red and blue from the PDF profiles should remain the dominant brand accents.

## Typography
- Use modern sans-serif typography.
- Use large uppercase headings for profile and subpage hero sections.
- Keep letter spacing at `0`.
- Use strong hierarchy with compact body copy blocks.

## Layout Language
- Use full-width visual bands instead of nested cards.
- Use diagonal, trapezoid, and clipped blocks inspired by the PDFs.
- Use white space and bold red/blue sections for RAK content.
- Use monochrome industrial image backgrounds for RAT content.
- Keep repeated content in simple cards with `8px` border radius or less.

## Imagery
- Use extracted PDF images when they directly match the company profile direction.
- Use monochrome treatment for RAK/RAT maritime and fleet visuals.
- Use actual vessels, ports, trucks, trailers, containers, cargo, and commodity imagery.
- Avoid generic abstract gradients as primary visuals.

## Components
- Navbar
- Hero with shipping console/accessory elements
- Capability strip
- Company profile sections
- Operations route map
- Fleet/service cards
- Commodity catalog
- Inquiry form
- Footer
- Floating WhatsApp button

## Motion
Duration:
- Fast: `200ms`
- Normal: `400ms`
- Slow: `800ms`

Rules:
- Give each major section a distinct animation style.
- Prefer transform and opacity animations.
- Keep animations GPU-friendly.
- Respect `prefers-reduced-motion`.
- GSAP, ScrollTrigger, and Lenis are optional runtime enhancements.

## Accessibility
- Keep semantic landmarks.
- Preserve keyboard navigation.
- Provide useful image alt text.
- Maintain visible focus states.
- Keep text readable over photographic backgrounds.
