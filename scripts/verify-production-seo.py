"""Verify the built site locally. Run after npm run build. No database needed."""
import subprocess,urllib.request,urllib.error,time,json,os
from html.parser import HTMLParser
class Page(HTMLParser):
 def __init__(self):super().__init__();self.canonical=[];self.robots=[];self.titles=[];self.in_title=False;self.in_ld=False;self.ld=[];self.buffer='';self.h1=0
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='title':self.in_title=True
  if t=='h1':self.h1+=1
  if t=='link' and d.get('rel')=='canonical':self.canonical.append(d.get('href'))
  if t=='meta' and d.get('name')=='robots':self.robots.append(d.get('content'))
  if t=='script' and d.get('type')=='application/ld+json':self.in_ld=True;self.buffer=''
 def handle_data(self,s):
  if self.in_title:self.titles.append(s)
  if self.in_ld:self.buffer+=s
 def handle_endtag(self,t):
  if t=='title':self.in_title=False
  if t=='script' and self.in_ld:self.ld.append(json.loads(self.buffer));self.in_ld=False
base='http://127.0.0.1:3107';primary='https://www.jaysub.com'
env={**os.environ,'SITE_URL':primary,'VERCEL_ENV':'production','NODE_ENV':'production'}
proc=subprocess.Popen(['node','node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3107'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,env=env)
op=urllib.request.build_opener(urllib.request.ProxyHandler({}))
def get(path):return op.open(urllib.request.Request(base+path,headers={'User-Agent':'Googlebot'}),timeout=5)
try:
 for _ in range(40):
  if proc.poll() is not None:raise RuntimeError('Local server stopped')
  try:r=get('/');r.close();break
  except urllib.error.URLError:time.sleep(.25)
 else:raise RuntimeError('Local server unavailable')
 paths=['','about','services','approach','contact','privacy','services/it-consulting','services/business-analysis','services/web-mobile']
 for path in paths:
  r=get('/'+path);text=r.read().decode();p=Page();p.feed(text)
  assert r.status==200 and p.h1==1,(path,p.h1)
  assert len(p.canonical)==1 and p.canonical[0].rstrip('/')==(primary+'/'+path).rstrip('/'),(path,p.canonical)
  assert any('Jaysub Enterprise' in t for t in p.titles),(path,p.titles)
  assert p.robots and all('noindex' not in x for x in p.robots),(path,p.robots)
  assert any(x.get('@type')=='Organization' and x.get('name')=='Jaysub Enterprise' for x in p.ld)
  if not path:
   assert any(x.get('@type')=='WebSite' and x.get('name')=='Jaysub Enterprise' for x in p.ld)
   assert text.index('reviews-title')<text.index('A FEW GOOD QUESTIONS')
  print('/'+path,'OK')
 robots=get('/robots.txt').read().decode();assert 'Sitemap: '+primary+'/sitemap.xml' in robots
 sitemap=get('/sitemap.xml').read().decode();assert sitemap.count('<loc>')==9 and 'vercel.app' not in sitemap
 assert get('/brand-logo.svg').status==200
 try:get('/this-page-does-not-exist');raise AssertionError('Unknown URL must return 404')
 except urllib.error.HTTPError as e:assert e.code==404
 print('robots, sitemap, logo, structured data, canonical URLs and 404: OK')
finally:
 proc.terminate()
 try:proc.wait(timeout=5)
 except subprocess.TimeoutExpired:proc.kill()
