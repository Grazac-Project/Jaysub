import { Content } from '../site';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMetadata, pageSEO, breadcrumbSchema, jsonLd } from '../../lib/seo.mjs';
export async function generateMetadata({ params }: { params: Promise<{ path: string[] }> }) { return pageMetadata((await params).path.join('/')); }
export default async function Page({ params }: { params: Promise<{ path: string[] }> }) {
  const path = (await params).path.join('/');
  if (!(path in pageSEO)) notFound();
  const labels: Record<string,string> = { about:'About',services:'Services',approach:'Our approach',contact:'Contact',privacy:'Privacy','services/it-consulting':'IT consulting','services/business-analysis':'Business analysis','services/web-mobile':'Web & mobile solutions' };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumbSchema(path))}} /><nav className="wrap breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>{path.startsWith('services/')&&<><Link href="/services">Services</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{labels[path]}</span></nav><Content path={path} /></>;
}
