import { AuthorMetadata, Post, PostMetadata, Tag } from '@/types';
import matter from 'gray-matter';
import { Author } from '@/types';
import { readFile, readdir } from 'fs/promises';

export const API_URL =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_DOMAIN || 'https://fabiancdng.com' : 'http://localhost:3000';

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const absPath = process.cwd();

  // Get markdown from content API.
  // Load the markdown file using fs and send it back as a response.
  const markdown = await readFile(`${absPath}/content/blog/${slug}/post.md`);

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
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const absPath = process.cwd();

  // Get markdown from content API.
  // Load the markdown file using fs and send it back as a response.
  const markdown = await readFile(`${absPath}/content/authors/${slug}/author.md`).catch((err) => null);

  if (!markdown) return null;

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
}

/**
 * Iterates over all files in the `content/blog` directory and creates array with slugs.
 */
export async function getAllBlogPostSlugs() {
  const absPath = process.cwd();

  const slugs: string[] = [];

  const dirs = (await readdir(`${absPath}/content/blog`)).filter((dir) => !dir.startsWith('.'));

  dirs.forEach((dir) => slugs.push(dir));

  return slugs;
}

/**
 *  Iterates over all files in the `content/blog` directory and create array with data needed to
 *  display the blog in a feed.
 */
export async function getAllBlogPosts(): Promise<Post[]> {
  const absPath = process.cwd();

  const posts: Post[] = [];

  const slugs = await getAllBlogPostSlugs();

  for (const slug of slugs) {
    const markdown = await readFile(`${absPath}/content/blog/${slug}/post.md`).catch((err) => null);

    if (!markdown) continue;

    // Strip and parse metadata.
    const postMatter = matter(markdown, {
      excerpt: true,
    });

    const metadata = postMatter.data as PostMetadata;

    posts.push({
      slug: slug,
      metadata,
      content: '', // We don't need the content for the feed.
      excerpt: postMatter.excerpt,
    });
  }

  // Sort the array of posts descending by their metadata.published_at date.
  posts.sort((a, b) => {
    if (a.metadata.published_at < b.metadata.published_at) {
      return 1;
    } else {
      return -1;
    }
  });

  return posts;
}

/**
 * Iterates over all files in the `content/tags` directory and returns array with its slug
 * and other data specified in the matter.
 */
export async function getAllTags() {
  const absPath = process.cwd();

  const tags: Tag[] = [];

  const dirs = (await readdir(`${absPath}/content/tags`)).filter((dir) => !dir.startsWith('.'));

  for (const dir of dirs) {
    const markdown = await readFile(`${absPath}/content/tags/${dir}/tag.md`).catch((err) => null);

    if (!markdown) continue;

    const tagMatter = matter(markdown, {
      excerpt: false,
    });

    const tag = tagMatter.data as Tag;
    tag.slug = dir;

    tags.push(tag);
  }

  return tags;
}

/**
 * Returns a single tag by its slug.
 */
export async function getTag(slug: string) {
  const absPath = process.cwd();

  const markdown = await readFile(`${absPath}/content/tags/${slug}/tag.md`).catch((err) => null);

  if (!markdown) return null;

  const tagMatter = matter(markdown, {
    excerpt: false,
  });

  const tag = tagMatter.data as Tag;
  tag.slug = slug;

  return tag;
}

/**
 * Returns an array of tags by their slugs.
 */
export async function getTags(slugs: string[]) {
  const tags: Tag[] = [];

  for (const slug of slugs) {
    const tag = await getTag(slug);

    if (!tag) continue;

    tags.push(tag);
  }

  return tags;
}
