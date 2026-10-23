import { Home } from './site';
import { websiteSchema, jsonLd } from '../lib/seo.mjs';
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema()) }} /><Home /></>; }
