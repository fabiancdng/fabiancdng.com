import { getWpRessource } from '@/adapters/WordPressAdapter';
import { MetadataRoute } from 'next';
import { getRobots } from './utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'https://fabiancdng.com';

  /**
   * Statics
   */
  sitemap.push({
    url: `${DOMAIN}`,
  });

  // Fetch latest blog post
  const latestBlogPost = await getWpRessource('posts', {
    per_page: 1,
    orderby: 'date',
    order: 'desc',
  });

  sitemap.push({
    url: `${DOMAIN}/blog`,
    lastModified: latestBlogPost.length ? latestBlogPost[0].date : undefined,
  });

  /**
   * Pages
   */
  const pages = await getWpRessource('pages', { _fields: ['slug', 'modified'] });
  const robots = getRobots();

  for (const page of pages) {
    if (!robots.includes(page.slug)) {
      sitemap.push({
        url: `${DOMAIN}/${page.slug}`,
        lastModified: page.modified,
      });
    }
  }

  /**
   * Blog Posts
   */
  const blogPosts = await getWpRessource('posts', { _fields: ['slug', 'modified'] });

  for (const post of blogPosts) {
    sitemap.push({
      url: `${DOMAIN}/blog/${post.slug}`,
      lastModified: post.modified,
    });
  }

  /**
   * Categories
   */
  const categories = await getWpRessource('categories', {});

  for (const category of categories) {
    const posts = await getWpRessource('posts', {
      per_page: 1,
      orderby: 'date',
      order: 'desc',
      categories: category.id,
    });

    if (posts.length) {
      sitemap.push({
        url: `${DOMAIN}/blog/categories/${category.slug}`,
        lastModified: posts[0].date,
      });
    }
  }

  /**
   * Authors
   */
  const authors = await getWpRessource('users', {});

  for (const author of authors) {
    const posts = await getWpRessource('posts', {
      per_page: 1,
      orderby: 'date',
      order: 'desc',
      author: author.id,
    });

    if (posts.length) {
      sitemap.push({
        url: `${DOMAIN}/blog/authors/${author.slug}`,
        lastModified: posts[0].date,
      });
    }
  }

  return sitemap;
}
