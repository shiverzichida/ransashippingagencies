# Ransa Shipping Agencies

Corporate website for Ransa Group, covering Ransa Agencies Kalbarindo, Ransa Armada Tangguh, and Ransa Energi Muda.

## Production
- GitHub: `https://github.com/shiverzichida/ransashippingagencies`
- Vercel: `https://ransashippingagencies.vercel.app/`

## Stack
- Frontend: HTML, CSS, JavaScript modules
- TypeScript: source companion files in `js/**/*.ts`
- Hosting: Vercel
- Backend: Vercel Serverless Function
- Database: Supabase PostgreSQL

## Main Routes
- `/` -> `index.html`
- `/homepage-old/` -> previous homepage snapshot for quick rollback/reference
- `/homepage2/` -> homepage 2 prototype snapshot
- `/armada` -> `armada.html`
- `/energi` -> `energi.html`
- `/api/contact` -> `api/contact.js`

Routes are configured in `vercel.json`.

## Local Preview
Use any static server from the project root.

```powershell
python -m http.server 8080
```

Then open:

```text
http://127.0.0.1:8080/
```

For PHP fallback testing only, use:

```powershell
php -S 127.0.0.1:8080 -t .
```

## Environment Variables
Set these in Vercel project settings:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
```

Do not commit `.env` files or Supabase service-role secrets.

## Structure
- `index.html` - Active Ransa Group homepage, currently using the homepage 2 concept with the original navbar style
- `homepage-old/index.html` - Previous homepage preserved so the active home can be swapped back if needed
- `homepage2/index.html` - Homepage 2 prototype preserved as a standalone preview/reference
- `armada.html` - Vercel/static page for PT. Ransa Armada Tangguh
- `energi.html` - Vercel/static page for PT. Ransa Energi Muda
- `css/styles.css` - Global styling and page-specific sections
- `js/main.js` - Browser entry point
- `js/main.ts` - TypeScript source companion
- `js/components/` - Navigation and inquiry form modules
- `js/animations/` - Motion setup and fallbacks
- `js/utils/` - Bilingual copy helpers
- `api/contact.js` - Production inquiry endpoint for Vercel/Supabase
- `database/schema.sql` - Supabase schema reference
- `assets/images/` - Site imagery and extracted company profile assets
- `assets/pdf-reference/` - PDF-derived visual references used by the frontend

## Legacy Files
- `api/inquiry.php` is a PHP/local fallback and is not the production Vercel endpoint.
- `armada.php` and `energi.php` are legacy/local PHP page variants.
- `.htaccess` is for Apache/PHP hosting and is not used by Vercel.

For new development, prefer the Vercel/static files unless the project intentionally moves back to PHP hosting.

## Homepage Swap Notes
- Current active home: `index.html` uses the `homepage2` concept.
- Previous home backup: `homepage-old/index.html`.
- To restore the previous home, copy `homepage-old/index.html` over `index.html` and keep the existing shared assets/CSS.
- To re-apply the homepage 2 concept later, copy `homepage2/index.html` over `index.html` and ensure the original `site-header` navbar is preserved.

## Design References
- `COMPRO - RAK.pdf` drives the RAK visual language: white space, red/blue blocks, diagonal cuts, vessel imagery.
- `COMPRO - RAT.pdf` drives the RAT visual language: monochrome trucking/logistics imagery, industrial contrast, red/blue accents.
- `COMPRO - REM.pdf` supports the Ransa Energi Muda commodity/export direction.
