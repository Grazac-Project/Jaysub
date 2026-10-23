import {test} from 'node:test';import assert from 'node:assert/strict';
import {siteUrl,isIndexable,pageMetadata,pageSEO,organizationSchema,websiteSchema,breadcrumbSchema,jsonLd} from '../lib/seo.mjs';
const production={SITE_URL:'https://www.jaysub.com',VERCEL_ENV:'production',NODE_ENV:'production'};
test('all nine pages identify Jaysub Enterprise and use the real primary domain',()=>{
 assert.equal(Object.keys(pageSEO).length,9);assert.equal(new Set(Object.values(pageSEO).map(p=>p.description)).size,9);
 for(const path of Object.keys(pageSEO)){const m=pageMetadata(path,production);assert.ok(m.title.includes('Jaysub Enterprise'));assert.equal(m.alternates.canonical,'https://www.jaysub.com/'+path);assert.equal(m.openGraph.url,m.alternates.canonical);assert.equal(m.robots.index,true)}
});
test('preview and development deployments stay out of Google',()=>{assert.equal(isIndexable({...production,VERCEL_ENV:'preview'}),false);assert.equal(isIndexable({}),false);assert.equal(isIndexable({...production,SITE_NOINDEX:'true'}),false)});
test('default canonical never falls back to a Vercel deployment hostname',()=>{assert.equal(siteUrl({VERCEL_PROJECT_PRODUCTION_URL:'jaysub-eight.vercel.app'}),'https://www.jaysub.com');assert.equal(siteUrl({}),'https://www.jaysub.com')});
test('business and website entities agree on the full name, address and primary URL',()=>{const org=organizationSchema(production),web=websiteSchema(production);assert.equal(org.name,'Jaysub Enterprise');assert.equal(web.name,org.name);assert.equal(org.alternateName,'Jaysub');assert.equal(org.address.streetAddress,'9, James Okiki Street, Oko Oba');assert.equal(org.address.addressCountry,'NG');assert.equal(web.publisher['@id'],org['@id']);assert.equal(web.url,org.url)});
test('service breadcrumbs refer to real parent pages',()=>{assert.deepEqual(breadcrumbSchema('services/business-analysis',production).itemListElement.map(i=>i.item),['https://www.jaysub.com/','https://www.jaysub.com/services','https://www.jaysub.com/services/business-analysis'])});
test('JSON-LD escapes script-closing characters without changing parsed data',()=>{const data={name:'</script><script>alert(1)</script>'};assert.ok(!jsonLd(data).includes('<'));assert.deepEqual(JSON.parse(jsonLd(data)),data)});
