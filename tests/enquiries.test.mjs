import { test } from 'node:test';
import assert from 'node:assert/strict';
import { saveEnquiry } from '../lib/enquiries.mjs';
const sample = { id: '6c030596-808f-4377-93f9-5da089a64e71', name: 'Test', email: 'test@example.com', company: '', service: 'IT consulting', message: 'A test project enquiry.' };
test('requires storage configuration; never reports an unsaved enquiry as saved', async () => {
  await assert.rejects(() => saveEnquiry(sample, { url: '', secret: '' }), /not configured/);
});
test('sends validated enquiry with server key and duplicate-safe insert', async () => {
  let request;
  await saveEnquiry(sample, { url: 'https://example.supabase.co', secret: 'sb_secret_test', fetcher: async (url, options) => { request = {url, options}; return { ok: true }; } });
  assert.equal(request.url.pathname, '/rest/v1/enquiries');
  assert.equal(request.url.searchParams.get('on_conflict'), 'id');
  assert.equal(request.options.headers.apikey, 'sb_secret_test');
  assert.equal(request.options.headers.Prefer, 'resolution=ignore-duplicates,return=minimal');
  assert.deepEqual(JSON.parse(request.options.body), sample);
});
test('propagates storage failure so the form can offer a retry', async () => {
  await assert.rejects(() => saveEnquiry(sample, { url: 'https://example.supabase.co', secret: 'sb_secret_test', fetcher: async () => ({ ok: false, status: 503 }) }), /HTTP 503/);
});
