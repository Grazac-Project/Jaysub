import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from './site';
import { pageMetadata, siteUrl } from '../lib/seo.mjs';
export const metadata: Metadata = {
  ...pageMetadata(''),
  metadataBase: new URL(siteUrl()),
  icons: { icon: '/favicon.svg' },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const origin = siteUrl();
  const organisation = { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${origin}/#organization`, name: 'Jaysub', url: origin, description: 'IT consulting, business analysis, and web and mobile solutions in Nigeria.' };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation).replace(/</g, '\\u003c') }} /><a href="#content" className="skip">Skip to content</a><Header /><div id="content">{children}</div><Footer /></body></html>;
}
