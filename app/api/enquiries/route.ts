import { z } from 'zod';
import { saveEnquiry } from '../../../lib/enquiries.mjs';
export const runtime = 'nodejs';
const schema = z.object({
  id: z.string().uuid(), name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254), company: z.string().trim().max(160),
  service: z.enum(['IT consulting', 'Business analysis', 'Web & mobile solutions', 'I’d like some guidance']),
  message: z.string().trim().min(20).max(5000), consent: z.literal('yes'), website: z.literal('').optional(),
});
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: 'Please submit from this website.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 15000) return Response.json({ error: 'Your message is too long.' }, { status: 413 });
  let raw;
  try {
    const body = await request.text();
    if (body.length > 15000) return Response.json({ error: 'Your message is too long.' }, { status: 413 });
    raw = JSON.parse(body);
  } catch { return Response.json({ error: 'Please check your details.' }, { status: 400 }); }
  const result = schema.safeParse(raw);
  if (!result.success) return Response.json({ error: 'Please check your name, email and project description.' }, { status: 400 });
  try {
    await saveEnquiry(result.data);
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Enquiry storage failed:', error instanceof Error ? error.message : 'Unknown error');
    return Response.json({ error: 'We could not save your enquiry. Your details are still here; please try again.' }, { status: 503 });
  }
}
