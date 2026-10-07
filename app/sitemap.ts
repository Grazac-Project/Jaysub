import type { MetadataRoute } from 'next';
import { siteUrl, pageSEO } from '../lib/seo.mjs';
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(pageSEO).map(path => ({ url: `${siteUrl()}/${path}` }));
}
