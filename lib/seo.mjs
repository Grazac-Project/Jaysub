export const BRAND_NAME = 'Jaysub Enterprise';
export const pageSEO = {
  '': { title: 'Jaysub Enterprise | IT Consulting & Software Development', description: 'Jaysub Enterprise is a Lagos-based technology partner for IT consulting, business analysis, and web and mobile app development in Nigeria.' },
  about: { title: 'About Jaysub Enterprise | Technology Partner in Lagos', description: 'Learn about Jaysub Enterprise, also known as Jaysub: a Lagos-based team connecting business analysis, technology consulting and software delivery.' },
  services: { title: 'IT Consulting & Software Development Services | Jaysub Enterprise', description: 'Explore IT consulting, business analysis, web development and mobile app development services from Jaysub Enterprise in Lagos, Nigeria.' },
  approach: { title: 'Our Approach to Software Delivery | Jaysub Enterprise', description: 'Discover how Jaysub Enterprise understands your business, defines requirements, builds digital solutions and supports handover through a collaborative process.' },
  contact: { title: 'Contact Jaysub Enterprise | Agege, Lagos, Nigeria', description: 'Contact Jaysub Enterprise about your technology project. Find us at 9, James Okiki Street, Oko Oba, Agege, Lagos State, Nigeria, or send an enquiry.' },
  privacy: { title: 'Project Enquiry Privacy Notice | Jaysub Enterprise', description: 'Learn how Jaysub Enterprise collects, stores and uses project enquiry information, and how to request access, correction or deletion.' },
  'services/it-consulting': { title: 'IT Consulting in Lagos, Nigeria | Jaysub Enterprise', description: 'Make informed technology decisions with Jaysub Enterprise. Explore IT strategy, technology roadmaps, solution architecture and systems integration planning.' },
  'services/business-analysis': { title: 'Business Analysis Services in Nigeria | Jaysub Enterprise', description: 'Jaysub Enterprise clarifies stakeholder needs, maps business processes and defines requirements to create a practical, delivery-ready product scope.' },
  'services/web-mobile': { title: 'Web & Mobile App Development in Nigeria | Jaysub Enterprise', description: 'Build web applications and mobile apps with Jaysub Enterprise. Services include product design, software development, testing, launch and improvement.' },
};
export function siteUrl(environment = process.env) {
  const url = new URL(environment.SITE_URL || 'https://www.jaysub.com');
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('SITE_URL must be an HTTP(S) URL without credentials.');
  return url.origin;
}
export function isIndexable(environment = process.env) {
  return environment.VERCEL_ENV !== 'preview' && environment.VERCEL_ENV !== 'development' && environment.NODE_ENV === 'production' && environment.SITE_NOINDEX !== 'true';
}
export function pageMetadata(path, environment = process.env) {
  const page = pageSEO[path];
  if (!page) return { title: 'Page not found | Jaysub Enterprise', robots: { index: false, follow: false } };
  const url = new URL(path ? `/${path}` : '/', siteUrl(environment)).href;
  return { title: page.title, description: page.description, alternates: { canonical: url }, robots: { index: isIndexable(environment), follow: true }, openGraph: { type: 'website', siteName: BRAND_NAME, locale: 'en_NG', title: page.title, description: page.description, url }, twitter: { card: 'summary', title: page.title, description: page.description } };
}
export function organizationSchema(environment = process.env) {
  const origin = siteUrl(environment);
  return { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${origin}/#organization`, name: BRAND_NAME, alternateName: 'Jaysub', url: `${origin}/`, logo: { '@type': 'ImageObject', url: `${origin}/brand-logo.svg` }, description: 'IT consulting, business analysis, and web and mobile app development in Lagos, Nigeria.', address: { '@type': 'PostalAddress', streetAddress: '9, James Okiki Street, Oko Oba', addressLocality: 'Agege', addressRegion: 'Lagos State', addressCountry: 'NG' } };
}
export function websiteSchema(environment = process.env) {
  const origin = siteUrl(environment);
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${origin}/#website`, name: BRAND_NAME, alternateName: ['Jaysub', 'jaysub.com'], url: `${origin}/`, inLanguage: 'en', publisher: { '@id': `${origin}/#organization` } };
}
export function breadcrumbSchema(path, environment = process.env) {
  const origin = siteUrl(environment); const parts = path.split('/');
  const items = [{ name: 'Home', item: `${origin}/` }];
  if (parts.length > 1) items.push({ name: 'Services', item: `${origin}/services` });
  const labels = { about: 'About', services: 'Services', approach: 'Our approach', contact: 'Contact', privacy: 'Privacy', 'services/it-consulting': 'IT consulting', 'services/business-analysis': 'Business analysis', 'services/web-mobile': 'Web & mobile solutions' };
  if (path && labels[path]) items.push({ name: labels[path], item: `${origin}/${path}` });
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((v,i)=>({ '@type': 'ListItem', position: i+1, ...v })) };
}
export function jsonLd(value) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
