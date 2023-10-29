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
  if (
    body['args'][1]['post_id'] === undefined ||
    body['args'][1]['post_type'] === undefined ||
    body['args'][1]['post_name'] === undefined
  ) {
    return new Response(JSON.stringify({ success: false, message: 'Missing post_id, post_type or post_name field.' }), { status: 400 });
  }

  // If post_type is page, revalidate the specific page.
  if (body['args'][1]['post_type'] === 'page') {
    revalidatePath('/' + body['args'][1]['post_name']);
    return new Response(JSON.stringify({ success: true, message: 'Page revalidation order created successfully.' }), { status: 200 });
  }

  // If post_type is post, revalidate the specific post, the post overview page, the category pages, and the author pages.
  if (body['args'][1]['post_type'] === 'post') {
    revalidatePath(`/blog`);
    revalidatePath('/blog/' + body['args'][1]['post_name']);
    revalidatePath('/blog/categories/[slug]');
    revalidatePath('/authors/[slug]');
    return new Response(JSON.stringify({ success: true, message: 'Post revalidation order created successfully.' }), { status: 200 });
  }
}
