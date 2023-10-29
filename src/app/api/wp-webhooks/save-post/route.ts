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

  console.log(`[${getCurrentTimestamp()}] WordPress webhook request received: ${JSON.stringify(body)}`);

  // Check if the args field has the required fields.
  if (body['args'][1]['post_type'] === undefined) {
    return new Response(JSON.stringify({ success: false, message: 'Missing post_type field.' }), { status: 400 });
  }

  // If post_type is page, revalidate the page cache.
  if (body['args'][1]['post_type'] === 'page') {
    revalidatePath('/[slug]', 'page');
    return new Response(JSON.stringify({ success: true, message: 'Page revalidation order created successfully.' }), { status: 200 });
  }

  // If post_type is post, revalidate the blog cache.
  if (body['args'][1]['post_type'] === 'post') {
    revalidatePath(`/blog`, 'page');
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/blog/categories/[slug]', 'page');
    revalidatePath('/authors/[slug]', 'page');
    return new Response(JSON.stringify({ success: true, message: 'Post revalidation order created successfully.' }), { status: 200 });
  }
}
