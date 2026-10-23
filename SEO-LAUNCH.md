# Jaysub Enterprise: branded search launch

Target query: **Jaysub Enterprise**
Primary website: **https://www.jaysub.com/**
Audit date: 23 October 2026

## What was found on the live website

Direct HTTP inspection found:

- `https://www.jaysub.com/` returns HTTP 200 without a login or an X-Robots-Tag block.
- `https://jaysub.com/` redirects to `https://www.jaysub.com/`.
- The homepage title begins with Jaysub, not Jaysub Enterprise.
- Homepage, About and Business Analysis canonical tags point to `https://jaysub-eight.vercel.app`, rather than the custom domain.
- `/robots.txt` advertises a sitemap on `jaysub-eight.vercel.app`.
- All nine sitemap entries use `jaysub-eight.vercel.app`.

This points search engines towards the deployment hostname instead of the intended primary domain. Updating a local ZIP or the ChatGPT preview does not update the independent Vercel project.

## Implemented in this codebase

- Full brand name in the header lockup, homepage copy, About copy and footer.
- Unique titles and descriptions for all nine pages using Jaysub Enterprise.
- Canonical-domain fallback fixed to `https://www.jaysub.com`.
- Vercel production build guard rejects an explicitly configured wrong SITE_URL.
- Production sitemap and robots.txt use the primary domain.
- Preview/development pages stay noindex; production can be intentionally disabled with SITE_NOINDEX=true.
- Organization JSON-LD with name Jaysub Enterprise, alternateName Jaysub, confirmed Lagos address and a matching SVG logo asset.
- Homepage WebSite JSON-LD with the preferred site name and its alternatives.
- Crawlable breadcrumbs and matching BreadcrumbList JSON-LD.
- Existing testimonials, location, enquiry form, mobile layout, image optimisation and routes preserved.
- No fabricated social accounts, registration numbers, ratings, opening hours or telephone numbers added.

## Required deployment steps — Vercel project owner/developer

1. Push this package to the repository actually connected to www.jaysub.com. Preserve legitimate edits made to the live repository since this export; compare before replacing files.
2. In Vercel Production variables set `SITE_URL=https://www.jaysub.com` and `SITE_NOINDEX=false`. Replace the old `jaysub-eight.vercel.app` value. Keep existing Supabase variables.
3. Deploy to Production. Environment changes need a new deployment. The build will stop if Production SITE_URL is configured to a different origin.
4. Keep the primary domain public; protect Preview deployments. Retain the existing apex-to-www redirect.
5. Check the rendered homepage and core service pages: the canonical must use www.jaysub.com and must not contain a Vercel hostname.
6. Check https://www.jaysub.com/robots.txt and https://www.jaysub.com/sitemap.xml. All sitemap URLs must use www.jaysub.com.
7. Check title/description, WebSite and Organization JSON-LD, logo, address, mobile navigation and the contact form on the actual production deployment.
8. Test real-page status 200, nonexistent-page status 404, and no unintended `noindex` meta tag or `X-Robots-Tag: noindex` header.

## Required Google Search Console steps — verified domain owner

These cannot be performed from this workspace without access to your Search Console/DNS account.

1. Add or open the Domain property `jaysub.com` in https://search.google.com/search-console . Prefer DNS verification at the domain provider.
2. Alternatively use a URL-prefix property for https://www.jaysub.com/ and the provided GOOGLE_SITE_VERIFICATION variable. This variable takes only the HTML verification tag's content value, not the whole tag. Redeploy after adding it.
3. Submit https://www.jaysub.com/sitemap.xml after the corrected production deployment is live.
4. Use URL Inspection → Test live URL for the homepage and key service pages. Confirm access and the declared canonical. Request indexing where available.
5. Monitor Page indexing and Search results reports. Filter the exact query `Jaysub Enterprise`; review impressions/clicks and Google's selected canonical when data becomes available.

Google may take days or weeks to recrawl and does not guarantee inclusion or a particular ranking. Do not repeatedly request indexing of the same URL or use the Google Indexing API for ordinary business pages.

## Brand references outside the site

Use the consistent name **Jaysub Enterprise**, website **https://www.jaysub.com/** and the same real address on company profiles and legitimate directories. Update profiles you actually control; do not create purchased backlinks or fabricated reviews.

Public search also returned a separate site at `https://jaysub-enterprise.vercel.app/`. Ownership was not established. If this is your old website, audit its URLs and implement permanent redirects from relevant old pages to the matching new pages, then update profile links. If it belongs to someone else, leave it alone. Do not redirect unrelated old services to misleading new content.

## Validation completed

- Next.js production build, including TypeScript: passed.
- Nine unit tests covering storage, brand metadata, canonical defaults, preview noindex, entity identity, address, breadcrumbs and safe JSON-LD: passed.
- Production HTTP smoke test against the locally built app: all nine pages passed; correct titles, canonical URLs and Organization data; homepage WebSite data; robots.txt, nine sitemap URLs, logo and genuine 404 passed.
- Live Google Search Console submission, Google Rich Results Test and live PageSpeed/Core Web Vitals review: not performed; require the updated live deployment and appropriate account access.

Run the included HTTP smoke test after building with production variables:

```bash
npm test
npm run build
python3 scripts/verify-production-seo.py
```

The smoke test requires Python 3 and uses an isolated local Next.js server; it does not submit an enquiry or contact Supabase.

## Official references

- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/crawling-indexing/301-redirects
