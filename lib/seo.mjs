export const pageSEO = {
  '': { title: 'Jaysub | IT Consulting, Business Analysis & Software Development in Nigeria', description: 'Jaysub helps businesses in Nigeria with IT consulting, business analysis, and web and mobile app development. Turn business goals into practical digital solutions.' },
  about: { title: 'About Jaysub | Technology Consulting & Software Development', description: 'Meet Jaysub, a Nigerian technology partner connecting business understanding with IT consulting, business analysis, and web and mobile software delivery.' },
  services: { title: 'IT Consulting & Software Development Services in Nigeria | Jaysub', description: 'Explore Jaysub’s IT consulting, business analysis, web development and mobile app development services. Get clarity, practical advice and thoughtful delivery.' },
  approach: { title: 'Our Approach | Discovery, Analysis & Software Delivery | Jaysub', description: 'See how Jaysub discovers business needs, defines requirements, delivers digital solutions and supports handover through a clear, collaborative process.' },
  contact: { title: 'Contact Jaysub | Discuss Your Technology or Software Project', description: 'Talk to Jaysub about IT consulting, business analysis, or web and mobile development. Share your business goals and tell us what you want to build or improve.' },
  privacy: { title: 'Project Enquiry Privacy Notice | Jaysub', description: 'Learn what Jaysub collects through its project enquiry form, how enquiries are stored and used, and how to request access, correction or deletion.' },
  'services/it-consulting': { title: 'IT Consulting in Nigeria | Technology Strategy & Architecture | Jaysub', description: 'Plan your next technology investment with Jaysub. IT consulting services include technology roadmaps, solution architecture, systems integration and advisory.' },
  'services/business-analysis': { title: 'Business Analysis Services in Nigeria | Requirements & Processes | Jaysub', description: 'Jaysub helps clarify stakeholder needs, map business processes, define requirements and prepare a delivery-ready product scope before software development.' },
  'services/web-mobile': { title: 'Web & Mobile App Development in Nigeria | Jaysub', description: 'Build web applications, platforms and mobile apps with Jaysub. Explore product design, software development, testing, launch and ongoing improvement.' },
};
export function siteUrl(environment = process.env) {
  const value = environment.SITE_URL || (environment.VERCEL_PROJECT_PRODUCTION_URL ? `https://${environment.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('SITE_URL must be an HTTP(S) URL without credentials.');
  return url.origin;
}
export function isIndexable(environment = process.env) {
  return environment.VERCEL_ENV !== 'preview' && environment.VERCEL_ENV !== 'development' && (environment.SITE_URL || environment.VERCEL_PROJECT_PRODUCTION_URL) != null && environment.SITE_NOINDEX !== 'true';
}
export function pageMetadata(path, environment = process.env) {
  const page = pageSEO[path];
  if (!page) return { title: 'Page not found | Jaysub', robots: { index: false, follow: false } };
  const url = `${siteUrl(environment)}/${path}`;
  return { title: page.title, description: page.description, alternates: { canonical: url }, robots: { index: isIndexable(environment), follow: true }, openGraph: { type: 'website', siteName: 'Jaysub', locale: 'en_NG', title: page.title, description: page.description, url }, twitter: { card: 'summary', title: page.title, description: page.description } };
}
