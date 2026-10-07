# Jaysub website

A complete, responsive Next.js website for Jaysub, preserving the blue/navy/cyan branding and all nine pages from the original site.

## Included

- Home, About, Our Approach, Services, three service detail pages, Contact and Privacy.
- Responsive navigation, service links, expandable FAQs, local image and custom favicon.
- Validated project enquiry form with loading, success and recoverable error states.
- Server-side Supabase storage with duplicate-safe submission IDs.
- Production Next.js configuration, environment template, database schema and tests.

## Run locally

Use Node.js 22.13 or newer (Node 22 LTS recommended).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The pages work without database credentials. The form will show a recoverable error until Supabase is configured; it never claims an unsaved message was received.

## Set up enquiry storage

1. Create a Supabase project at https://supabase.com.
2. Enable its Data API if needed. Run `supabase/schema.sql` in the SQL Editor.
3. Copy the project URL and a **secret API key** (`sb_secret_...`) from the dashboard into `.env.local` using the names in `.env.example`.
4. Restart the development server and submit a test enquiry.
5. Open the `enquiries` table in Supabase's Table Editor to read submissions.

This key stays on the server. Do not commit `.env.local`, expose the key in browser code or rename it with a `NEXT_PUBLIC_` prefix. RLS is enabled and direct access by anonymous or ordinary authenticated visitors is revoked. The server validates input and uses the secret key for inserts.

Database records from the original hosted version are **not** included or automatically migrated. Email notifications are not implemented in either version. Successful submission confirms database storage only.

## GitHub and Vercel

1. Extract this folder and create a GitHub repository.
2. Upload the contents of `jaysub-vercel` as the repository root (including `.gitignore` and `.env.example`), or run:

```bash
git init
git add .
git commit -m "Add Jaysub website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

3. In Vercel, choose **Add New → Project**, import that repository and select **Next.js**.
4. Use the repository root, Node.js **22.x**, the default install command and `npm run build` as the build command.
5. Add `SUPABASE_URL` and `SUPABASE_SECRET_KEY` to the Vercel environment variables for Production. Add them to Preview/Development only if those deployments should also write to this database. A separate preview database avoids mixing test enquiries with production.
6. Deploy. If environment variables change, redeploy to apply them.
7. Test the contact form and verify the record in Supabase. Then add your domain in Vercel's project settings.

No Cloudflare account, Sites project, Vite configuration or private hosting credentials are required.

## Checks

```bash
npm run typecheck
npm test
npm run build
```

Storage tests use a stub; they do not contact a real Supabase database. A real submission should be verified after adding your credentials.

## Editing

- `app/site.tsx`: page copy, service data, navigation, footer, FAQ and form.
- `app/globals.css`: colours, spacing, typography and responsive layouts.
- `app/layout.tsx`: site title, description and shared page shell.
- `app/[...path]/page.tsx`: routes and individual page titles.
- `app/api/enquiries/route.ts`: validation and submission endpoint.
- `lib/enquiries.mjs`: server-only storage adapter.
- `public/`: team photo and favicon.
- `supabase/schema.sql`: database setup.

Before public launch, review the privacy notice for your organisation, add real company contact details as desired, and configure bot/rate protection in Vercel if needed. No fictional testimonials, client logos or delivery metrics are included.

## Assets

The office photo is by Thirdman on Pexels: https://www.pexels.com/photo/a-group-of-people-in-the-office-5257763/ . Review the current Pexels licence for your intended use: https://www.pexels.com/license/ . The people shown are stock-photo subjects, not claimed to be Jaysub employees.

Inter is loaded from Google Fonts with an Arial/sans-serif fallback. Lucide supplies interface icons. The Jaysub logo is embedded as SVG in `app/site.tsx`; the favicon is in `public/favicon.svg`.

## References

- Next.js on Vercel: https://vercel.com/docs/frameworks/full-stack/nextjs
- Importing Git repositories: https://vercel.com/docs/git
- Supabase API keys: https://supabase.com/docs/guides/api/api-keys
- Supabase Data REST API: https://supabase.com/docs/guides/api

## SEO and Google launch checklist

The source includes per-page titles/descriptions, canonical URLs, an XML sitemap, robots.txt, Organization JSON-LD, Search Console verification support, crawlable links, server-rendered content, image alternative text and Next.js image optimisation. These are foundations, not a guarantee of indexing or rankings.

1. Choose one primary domain (for example, a domain you own), connect it to Vercel, and redirect alternative hostnames to it using Vercel's domain settings.
2. Set `SITE_URL` to the exact primary origin, such as `https://your-domain.com`, in Vercel. Redeploy after changing it. Set `SITE_NOINDEX=false` for the public production site.
3. The production URL must be publicly accessible without deployment protection, a login or a password. Preview deployments intentionally block indexing.
4. Verify the domain in Google Search Console, preferably through its DNS verification method. For the alternative URL-prefix HTML-tag method, set `GOOGLE_SITE_VERIFICATION` to the tag's content value and redeploy.
5. Check `/robots.txt` and `/sitemap.xml` on the final production domain. Submit the sitemap URL in Search Console and use URL Inspection to request indexing of the homepage and core service pages.
6. Test live pages with Google PageSpeed Insights on mobile. Review the final domain's canonical tags, indexing status and Search Console reports after launch.
7. Add real business contact details, substantive service information and genuine project examples. Build links from your real company profiles, partners and relevant directories. Do not invent clients, reviews or offices.
8. For broader service searches, develop useful content around specific customer problems and actual projects. Keep relevant pages updated; avoid duplicate keyword-stuffed pages.

`SITE_URL` or Vercel's production-domain variable must be present for indexing to be enabled. If you deploy somewhere other than Vercel, set `SITE_URL` explicitly. A full Lighthouse or live Google indexing check has not been run; production performance and indexing must be verified on the deployed domain.

Official Google guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
Sitemap guide: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
