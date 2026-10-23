import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from './site';
import { pageMetadata, siteUrl, organizationSchema, jsonLd } from '../lib/seo.mjs';
export const metadata: Metadata = { ...pageMetadata(''), metadataBase: new URL(siteUrl()), icons: { icon: '/favicon.svg' }, verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined } };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }} /><a href="#content" className="skip">Skip to content</a><Header /><div id="content">{children}</div><Footer /></body></html>;
}
