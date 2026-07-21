# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Project
Portal Web Terintegrasi Ransa Group

### Domain
ransa.id

### Tech Stack
- Frontend: HTML5, CSS3, TypeScript
- Backend: PHP Native (MVC sederhana)
- Database: MySQL (PDO)

## Objective
Membangun portal korporat yang menaungi:
- Ransa Agencies Kalbarindo
- Ransa Armada Tangguh
- Ransa Energi Muda

## Sitemap
/
- /about
- /agencies
- /armada
- /energi
- /energi/detail/{slug}
- /contact
- /admin/login

## Functional Requirements
### Public
- Bilingual (ID/EN)
- Dynamic inquiry routing
- Commodity catalog
- Floating WhatsApp
- Responsive

### Admin
- Login
- CRUD Services
- CRUD Commodities
- Inquiry Dashboard

## Database
admins
services
commodities
inquiries

## Security
- PDO Prepared Statements
- password_hash()
- htmlspecialchars()
- Server & Client validation

## Performance
- Target TTFB <300ms
- WebP images
- Responsive 320px+

## User Experience
- Premium international maritime branding
- Storytelling layout
- Spacious layout
- Apple / Stripe / Maersk inspired
- Avoid generic templates

## Motion
- GSAP + ScrollTrigger
- Lenis
- Parallax
- Sticky sections
- Clip-path reveal
- Text split
- Counters
- Timeline
- Horizontal scrolling
- 60 FPS
