const primary = 'https://www.jaysub.com';
if (process.env.VERCEL_ENV === 'production') {
 if (process.env.SITE_URL && new URL(process.env.SITE_URL).origin !== primary) throw new Error(`SEO configuration: SITE_URL must be ${primary}. Remove the old vercel.app origin before deploying.`);
 if (process.env.SITE_NOINDEX === 'true') console.warn('SITE_NOINDEX=true: this production build will intentionally stay out of Google.');
}
