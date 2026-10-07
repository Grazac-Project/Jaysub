import {test} from 'node:test';import assert from 'node:assert/strict';
import {siteUrl,isIndexable,pageMetadata,pageSEO} from '../lib/seo.mjs';
const production={SITE_URL:'https://jaysub.example',VERCEL_ENV:'production'};
test('all nine pages have distinct descriptions and self-referencing canonical URLs',()=>{
 assert.equal(Object.keys(pageSEO).length,9);assert.equal(new Set(Object.values(pageSEO).map(p=>p.description)).size,9);
 for(const path of Object.keys(pageSEO)){const m=pageMetadata(path,production);assert.equal(m.alternates.canonical,'https://jaysub.example/'+path);assert.equal(m.openGraph.url,m.alternates.canonical);assert.equal(m.robots.index,true)}
});
test('preview and unconfigured local deployments are not indexable',()=>{assert.equal(isIndexable({...production,VERCEL_ENV:'preview'}),false);assert.equal(isIndexable({}),false);assert.equal(isIndexable({...production,SITE_NOINDEX:'true'}),false)});
test('canonical uses configured production domain and strips paths',()=>{assert.equal(siteUrl({...production,SITE_URL:'https://jaysub.example/path/'}),'https://jaysub.example');assert.equal(siteUrl({VERCEL_PROJECT_PRODUCTION_URL:'project.vercel.app'}),'https://project.vercel.app')});
