import { PostMetadata } from '@/types';
import { readFile } from 'fs/promises';
import matter from 'gray-matter';

export async function getPostBySlug(slug: string): Promise<{ content: string; metadata: PostMetadata } | null> {
  const absPath = process.cwd();

  // Read the file.
  const file = await readFile(`${absPath}/content/blog/${slug}/post.md`).catch(() => {
    return null;
  });

  if (!file) return null;

  // Strip and parse metadata.
  const postMatter = matter(file.toString(), {
    excerpt: true,
  });

  const content = postMatter.excerpt ? postMatter.content.slice(postMatter.excerpt.length + 3) : postMatter.content;
  const metadata: PostMetadata = postMatter.data as PostMetadata;

  return {
    content,
    metadata,
  };
}
