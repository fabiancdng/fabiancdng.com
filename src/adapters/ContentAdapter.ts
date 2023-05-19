import { AuthorMetadata, Post, PostMetadata } from '@/types';
import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import { Author } from '@/types';

export async function getPostBySlug(slug: string): Promise<Post | null> {
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
  const metadata = postMatter.data as PostMetadata;

  return {
    metadata,
    content,
    excerpt: postMatter.excerpt,
  };
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const absPath = process.cwd();

  // Read the file.
  const file = await readFile(`${absPath}/content/authors/${slug}/author.md`).catch(() => {
    return null;
  });

  if (!file) return null;

  // Strip and parse metadata.
  const authorMatter = matter(file.toString(), {
    excerpt: false,
  });

  const content = authorMatter.content;
  const metadata = authorMatter.data as AuthorMetadata;

  return {
    metadata,
    content,
  };
}
