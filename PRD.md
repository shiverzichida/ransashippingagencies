# Product Requirements Document (PRD)

## Project
Portal Web Terintegrasi Ransa Group

## Production URLs
- Repository: `https://github.com/shiverzichida/ransashippingagencies`
- Production: `https://ransashippingagencies.vercel.app/`
- Target brand domain: `ransa.id`

## Current Architecture
- Frontend: HTML5, CSS3, JavaScript modules, TypeScript source companions
- Hosting: Vercel static frontend
- Backend: Vercel Serverless Functions
- Database: Supabase PostgreSQL
- Form endpoint: `api/contact.js`
- Deployment routing: `vercel.json`

## Objective
Build a corporate portal that represents:
- PT. Ransa Agencies Kalbarindo
- PT. Ransa Armada Tangguh
- PT. Ransa Energi Muda

The website must feel like a premium maritime, fleet, and commodity group profile with strong shipping visuals, PDF-derived brand colors, and clear inquiry paths.

## Sitemap
- `/`
- `/armada`
- `/energi`
- `/#about`
- `/#agencies`
- `/#contact`

## Public Requirements
- Responsive layout from 320px and up
- Bilingual-ready frontend copy modules
- Dynamic inquiry routing by division/service
- Commodity and fleet/service presentation
- Floating WhatsApp shortcut
- Shipping-forward visuals and maritime accessories
- Core Web Vitals friendly static delivery

## Backend Requirements
- Accept inquiry submissions through Vercel Serverless Function
- Validate required fields before insert
- Store inquiries in Supabase table `inquiries`
- Use environment variables for Supabase credentials
- Never expose service-role secrets in frontend code

## Database
Primary database is Supabase PostgreSQL.

Current table:
- `inquiries`

Reference schema:
- `database/schema.sql`

## Environment Variables
Configured in Vercel project settings:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Security
- Validate client-side and server-side form data
- Keep Supabase keys in Vercel environment variables
- Use Supabase Row Level Security policies
- Allow anonymous insert only for public inquiry forms
- Avoid storing secrets in Git

## Design Direction
- Use the RAK company profile PDF as the base for Ransa Agencies Kalbarindo:
  - White space
  - Strong red and blue blocks
  - Diagonal/trapezoid shapes
  - Monochrome vessel imagery
  - Uppercase corporate headings
- Use the RAT company profile PDF as the base for Ransa Armada Tangguh:
  - Monochrome logistics and trucking photography
  - Industrial contrast
  - Red/blue corporate accents
  - Fleet and site logistics emphasis
- Use the REM company profile PDF/assets for Ransa Energi Muda:
  - Commodity/export positioning
  - Biomass and agriculture trading imagery

## Motion
- GSAP + ScrollTrigger when available
- Lenis smooth scrolling when available
- CSS/IntersectionObserver fallback when CDN scripts are unavailable
- Respect `prefers-reduced-motion`
- Keep animations GPU-friendly

## Legacy Notes
Earlier project notes referenced PHP Native and MySQL/PDO. The production direction has moved to Vercel + Supabase. PHP files may remain only as legacy/local fallback unless explicitly reactivated.
