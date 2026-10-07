import { Content } from '../site';
import { notFound } from 'next/navigation';
import { pageMetadata, pageSEO } from '../../lib/seo.mjs';
export async function generateMetadata({ params }: { params: Promise<{ path: string[] }> }) {
  return pageMetadata((await params).path.join('/'));
}
export default async function Page({ params }: { params: Promise<{ path: string[] }> }) {
  const path = (await params).path.join('/');
  if (!(path in pageSEO)) notFound();
  return <Content path={path} />;
}
