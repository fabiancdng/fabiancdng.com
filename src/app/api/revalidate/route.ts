import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  // Get token and path fields from the POST body.
  const body = await request.json().catch(() => ({}));

  if (body.token === undefined || body.path === undefined) {
    return NextResponse.json({ success: false, message: 'Missing token or path.' }, { status: 400 });
  }

  const { token, path } = body;

  if (token !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
  }

  revalidatePath(path);

  return NextResponse.json({ success: true, message: 'Revalidation order created.' }, { status: 200 });
}
