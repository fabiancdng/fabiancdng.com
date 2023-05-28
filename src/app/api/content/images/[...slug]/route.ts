import { readFileSync } from 'fs';

export async function GET(request: Request, { params }: { params: { slug: string[] } }) {
  const absPath = process.cwd();
  const url = new URL(request.url);
  const path = params.slug.join('/');

  // Validate path.
  if (!path.includes('/img/') || !(path.endsWith('.jpg') || path.endsWith('.png'))) {
    return new Response('Not found', { status: 404 });
  }

  // Load the image file using fs and send it back as a response.
  try {
    const imageFile = readFileSync(`${absPath}/content/${path}`);
    const headers = new Headers({ 'Content-Type': path.endsWith('.jpg') ? 'image/jpeg' : 'image/png' });
    return new Response(imageFile, { status: 200, headers });
  } catch (err) {
    return new Response('Not found', { status: 404 });
  }
}
