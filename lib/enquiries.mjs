/** Server-only persistence helper. Never import into a browser component. */
export async function saveEnquiry(enquiry, { url = process.env.SUPABASE_URL, secret = process.env.SUPABASE_SECRET_KEY, fetcher = fetch } = {}) {
  if (!url || !secret) throw new Error('Enquiry storage is not configured.');
  const endpoint = new URL('/rest/v1/enquiries?on_conflict=id', url);
  if (endpoint.protocol !== 'https:') throw new Error('SUPABASE_URL must use HTTPS.');
  const response = await fetcher(endpoint, {
    method: 'POST',
    headers: { apikey: secret, 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify({ id: enquiry.id, name: enquiry.name, email: enquiry.email, company: enquiry.company, service: enquiry.service, message: enquiry.message }),
    signal: AbortSignal.timeout(10000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Enquiry storage returned HTTP ${response.status}.`);
}
