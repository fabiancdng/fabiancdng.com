import { readFileSync } from 'fs';

export async function GET(request: Request, { params }: { params: { slug: string[] } }) {
  const absPath = process.cwd();
  const url = new URL(request.url);
  const path = params.slug.join('/');

  console.log(params.slug);

  // Make sure request is authorized.
  const authorizationToken = url.searchParams.get('token');
  if (authorizationToken !== process.env.PRIVATE_CONTENT_MD_API_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Validate path.
  if (!path.endsWith('.md')) {
    return new Response('Not found', { status: 404 });
  }

  // Load the markdown file using fs and send it back as a response.
  try {
    const markdownFile = readFileSync(`${absPath}/content/${path}`);
    const headers = new Headers({ 'Content-Type': 'text/plain' });
    return new Response(markdownFile, { status: 200, headers });
  } catch (err) {
    return new Response('Not found', { status: 404 });
  }
}
