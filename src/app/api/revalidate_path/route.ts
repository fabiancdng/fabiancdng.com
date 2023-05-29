import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token') || '';
  const path = request.nextUrl.searchParams.get('path') || '/';

  if (token !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
  }

  revalidatePath(path);

  return NextResponse.json({ success: true, message: 'Revalidation order created.' }, { status: 200 });
}
