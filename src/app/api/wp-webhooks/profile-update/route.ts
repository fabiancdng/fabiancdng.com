import { getCurrentTimestamp } from '@/app/utils';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

/**
 * Handle incoming webhook requests from WordPress (WP Hook Expose plugin).
 */
export async function POST(request: NextRequest) {
  // Get the request body (JSON).
  const body = await request.json().catch(() => ({}));

  // Check if the request body has the required fields.
  if (body['wp_webhook_secret'] === undefined || body['args'] === undefined) {
    return new Response(JSON.stringify({ success: false, message: 'Missing token or args field.' }), { status: 400 });
  }

  // Check if the webhook secret is correct.
  if (body['wp_webhook_secret'] !== process.env.ADMIN_API_KEY) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid webhook secret.' }), { status: 401 });
  }

  console.log(`[${getCurrentTimestamp()}] WordPress profile-update webhook request received: ${JSON.stringify(body)}`);

  // Revalidate the authors page cache.
  revalidatePath('/authors/[slug]', 'page');
}
