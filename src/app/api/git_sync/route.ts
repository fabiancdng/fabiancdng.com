import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { revalidatePath } from 'next/cache';

/**
 *
 * THIS IS A POOF OF CONCEPT AND SHOULD NOT BE USED IN PRODUCTION.
 *
 */

/**
 * Clones the GitHub repository into the content directory.
 */
const cloneGitHubRepository = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const repoUrl = 'github.com/fabiancdng/fabiancdng.com-content';
    const accessToken = process.env.GITHUB_ACCESS_TOKEN || '';

    exec(`rm -rf content/* && git clone https://fabiancdng:${accessToken}@${repoUrl} content`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        reject();
        return NextResponse.json({ success: false, message: 'Error cloning repository.' }, { status: 500 });
      }

      // Remove the .git directory.
      exec('rm -rf content/.git', (error, stdout, stderr) => (error ? reject() : resolve()));
    });
  });
};

export async function POST(request: NextRequest) {
  return NextResponse.json({ success: false, message: 'This API is not ready for production use.' }, { status: 401 });
  const body = await request.json();
  const token: string = body.token;

  if (token !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
  }

  // Clone the GitHub repository.
  await cloneGitHubRepository().catch((error) => {
    return NextResponse.json({ success: false, message: 'Error cloning repository.' }, { status: 500 });
  });

  // Revalidate all paths.
  const revalidatePaths = ['/', '/[slug]', '/blog', '/blog/[slug]', '/tags/[slug]', '/authors/[slug]'];

  for (const path of revalidatePaths) {
    revalidatePath(path);
  }

  return NextResponse.json(
    { success: true, message: 'Successfully synced with GitHub repo and created revalidation orders.' },
    { status: 200 }
  );
}
