import {
  getAllAuthorSlugs,
  getAllBlogPostSlugs,
  getAllBlogPostsByAuthor,
  getAllBlogPostsByTag,
  getAllPageSlugs,
  getAllTagSlugs,
  getAuthorBySlug,
  getPageBySlug,
  getPostBySlug,
  getTagBySlug,
} from '@/adapters/ContentAdapter';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  /**
   * Statics
   */
  sitemap.push({
    url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
  });

  const allBlogPostSlugs = await getAllBlogPostSlugs();
  const latestBlogPost = await getPostBySlug(allBlogPostSlugs[0]);
  sitemap.push({
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/blog`,
    lastModified: latestBlogPost ? latestBlogPost.metadata.updated_at : undefined,
  });

  /**
   * Pages
   */
  const pageSlugs = await getAllPageSlugs();

  for (const pageSlug of pageSlugs) {
    const page = await getPageBySlug(pageSlug);

    if (!page) continue;

    sitemap.push({
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/${pageSlug}`,
      lastModified: page.metadata.updated_at,
    });
  }

  /**
   * Blog Posts
   */
  const blogPostSlugs = await getAllBlogPostSlugs();

  for (const blogPostSlug of blogPostSlugs) {
    const post = await getPostBySlug(blogPostSlug);

    if (!post) continue;

    sitemap.push({
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/blog/${blogPostSlug}`,
      lastModified: post.metadata.updated_at,
    });
  }

  /**
   * Tags
   */
  const tagSlugs = await getAllTagSlugs();

  for (const tagSlug of tagSlugs) {
    const tag = await getTagBySlug(tagSlug);
    if (!tag) continue;

    const posts = await getAllBlogPostsByTag(tag.slug);

    sitemap.push({
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/blog/tags/${tagSlug}`,
      lastModified: posts[0].metadata.updated_at,
    });
  }

  /**
   * Authors
   */
  const authorSlugs = await getAllAuthorSlugs();

  for (const authorSlug of authorSlugs) {
    const author = await getAuthorBySlug(authorSlug);
    if (!author) continue;

    const posts = await getAllBlogPostsByAuthor(author.metadata.slug);

    sitemap.push({
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/blog/authors/${author.metadata.slug}`,
      lastModified: posts[0].metadata.updated_at,
    });
  }

  return sitemap;
}
