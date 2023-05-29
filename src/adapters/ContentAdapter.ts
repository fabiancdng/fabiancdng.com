import { AuthorMetadata, Page, PageMetadata, Post, PostMetadata, Project, ProjectMetadata, Tag } from '@/types';
import matter from 'gray-matter';
import { Author } from '@/types';
import { readFile, readdir } from 'fs/promises';
import { getImage } from './ImageAdapter';

/**
 * Retrieves a single blog post (content + metadata) by its slug.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const absPath = process.cwd();

  // Get markdown from content API.
  // Load the markdown file using fs and send it back as a response.
  const markdown = await readFile(`${absPath}/content/blog/${slug}/post.md`).catch((err) => null);

  if (!markdown) return null;

  // Strip and parse metadata.
  const postMatter = matter(markdown, {
    excerpt: true,
  });

  const content = postMatter.excerpt ? postMatter.content.slice(postMatter.excerpt.length + 3) : postMatter.content;
  const metadata = postMatter.data as PostMetadata;

  return {
    slug: slug,
    metadata,
    content,
    excerpt: postMatter.excerpt,
  };
}

/**
 * Returns the absolute path, source URL and dimensions of the thumbnail of a blog post.
 */
export function getBlogPostThumbnail(slug: string) {
  return getImage(`/blog/${slug}`, 'thumbnail.jpg');
}

/**
 * Retrieves an author (content + metadata) by its slug.
 */
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
  const metadata = { slug, ...authorMatter.data } as AuthorMetadata;

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
 * Iterates over all files in the `content/blog` directory and create array with data needed to
 * display the blog in a feed filtered by a specific tag.
 */
export async function getAllBlogPostsByTag(tag: string): Promise<Post[]> {
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

    if (metadata.tags.includes(tag)) {
      posts.push({
        slug: slug,
        metadata,
        content: '', // We don't need the content for the feed.
        excerpt: postMatter.excerpt,
      });
    }
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
 * Iterates over all files in the `content/blog` directory and create array with data needed to
 * display the blog in a feed filtered by a specific author.
 */
export async function getAllBlogPostsByAuthor(authorSlug: string) {
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

    if (metadata.author === authorSlug) {
      posts.push({
        slug: slug,
        metadata,
        content: '', // We don't need the content for the feed.
        excerpt: postMatter.excerpt,
      });
    }
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
 * Iterates over all files in the `content/tag` directory and returns array with its slug
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
 * Iterates over all files in the `content/tag` directory and creates array with slugs.
 */
export async function getAllTagSlugs() {
  const absPath = process.cwd();

  const slugs: string[] = [];

  const dirs = (await readdir(`${absPath}/content/tags`)).filter((dir) => !dir.startsWith('.'));

  dirs.forEach((dir) => slugs.push(dir));

  return slugs;
}

/**
 * Returns a single tag by its slug.
 */
export async function getTagBySlug(slug: string) {
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
    const tag = await getTagBySlug(slug);

    if (!tag) continue;

    tags.push(tag);
  }

  return tags;
}

/**
 * Retrieves a single blog post (content + metadata) by its slug.
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const absPath = process.cwd();

  // Get markdown from content API.
  // Load the markdown file using fs and send it back as a response.
  const markdown = await readFile(`${absPath}/content/pages/${slug}/page.md`).catch((err) => null);

  if (!markdown) return null;

  // Strip and parse metadata.
  const postMatter = matter(markdown, {
    excerpt: false,
  });

  const content = postMatter.excerpt ? postMatter.content.slice(postMatter.excerpt.length + 3) : postMatter.content;
  const metadata = postMatter.data as PageMetadata;

  return {
    slug: slug,
    metadata,
    content,
  };
}

/**
 * Iterates over all files in the `content/pages` directory and creates array with slugs.
 */
export async function getAllPageSlugs() {
  const absPath = process.cwd();

  const slugs: string[] = [];

  const dirs = (await readdir(`${absPath}/content/pages`)).filter((dir) => !dir.startsWith('.') && dir !== 'homepage');

  dirs.forEach((dir) => slugs.push(dir));

  return slugs;
}

/**
 * Iterates over all files in the `content/projects` directory and returns array with all slug.
 */
export async function getAllProjectSlugs() {
  const absPath = process.cwd();

  const slugs: string[] = [];

  const dirs = (await readdir(`${absPath}/content/projects`)).filter((dir) => !dir.startsWith('.'));

  dirs.forEach((dir) => slugs.push(dir));

  return slugs;
}

/**
 * Returns the absolute path, source URL and dimensions of the thumbnail of a project.
 */
export function getProjectThumbnail(slug: string) {
  return getImage(`/projects/${slug}`, 'thumbnail.jpg');
}

/**
 * Iterates over all files in the `content/projects` directory and create array with data needed to
 * display the project in a feed.
 */
export async function getAllProjects() {
  const absPath = process.cwd();

  const projects: Project[] = [];

  const slugs = await getAllProjectSlugs();

  for (const slug of slugs) {
    const markdown = await readFile(`${absPath}/content/projects/${slug}/project.md`).catch((err) => null);

    if (!markdown) continue;

    // Strip and parse metadata.
    const projectMatter = matter(markdown, {
      excerpt: false,
    });

    const metadata = projectMatter.data as ProjectMetadata;
    const content = projectMatter.content;
    const thumbnail = getProjectThumbnail(slug);

    projects.push({
      slug: slug,
      metadata,
      thumbnail,
      content,
    });
  }

  // Sort the array of projects descending by their metadata.published_at date.
  projects.sort((a, b) => {
    if (a.metadata.published_at < b.metadata.published_at) {
      return -1;
    } else {
      return 1;
    }
  });

  return projects;
}

export async function getIntroduction() {
  const absPath = process.cwd();

  const markdown = await readFile(`${absPath}/content/pages/homepage/introduction.md`).catch((err) => null);

  if (!markdown) return null;

  const introductionMatter = matter(markdown, {
    excerpt: false,
  });

  const content = introductionMatter.content;

  return content;
}

/**
 * Iterates over all files in the `content/author` directory and returns array with all slug.
 */
export async function getAllAuthorSlugs() {
  const absPath = process.cwd();

  const slugs: string[] = [];

  const dirs = (await readdir(`${absPath}/content`)).filter((dir) => !dir.startsWith('.'));

  dirs.forEach((dir) => slugs.push(dir));

  return slugs;
}
