import type { MetadataRoute } from 'next';
import { siteUrl, pageSEO, isIndexable } from '../lib/seo.mjs';
export default function sitemap(): MetadataRoute.Sitemap { return isIndexable() ? Object.keys(pageSEO).map(path => ({url:new URL(path ? `/${path}` : '/', siteUrl()).href})) : []; }
