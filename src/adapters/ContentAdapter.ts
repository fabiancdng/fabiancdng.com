import { AuthorMetadata, Post, PostMetadata } from '@/types';
import matter from 'gray-matter';
import { Author } from '@/types';
import { readFileSync } from 'fs';

export const API_URL =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_DOMAIN || 'https://fabiancdng.com' : 'http://localhost:3000';

export function getPostBySlug(slug: string): Post | null {
  const absPath = process.cwd();
  // Get markdown from content API.
  // Load the markdown file using fs and send it back as a response.
  try {
    const markdown = readFileSync(`${absPath}/content/blog/${slug}/post.md`);

    // Strip and parse metadata.
    const postMatter = matter(markdown, {
      excerpt: true,
    });

    const content = postMatter.excerpt ? postMatter.content.slice(postMatter.excerpt.length + 3) : postMatter.content;
    const metadata = postMatter.data as PostMetadata;

    return {
      metadata,
      content,
      excerpt: postMatter.excerpt,
    };
  } catch (err) {
    return null;
  }
}

export function getAuthorBySlug(slug: string): Author | null {
  const absPath = process.cwd();
  // Get markdown from content API.
  // Load the markdown file using fs and send it back as a response.
  try {
    const markdown = readFileSync(`${absPath}/content/authors/${slug}/author.md`);

    // Strip and parse metadata.
    const authorMatter = matter(markdown, {
      excerpt: false,
    });

    const content = authorMatter.content;
    const metadata = authorMatter.data as AuthorMetadata;

    return {
      metadata,
      content,
    };
  } catch (err) {
    return null;
  }
}
