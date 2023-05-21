import Post from '@/components/Blog/Post/Post';
import { getAllBlogPostSlugs, getAuthorBySlug, getBlogPostThumbnail, getPostBySlug } from '@/adapters/ContentAdapter';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';

/**
 * If a request comes in to a page that exists in the file system, but has not been built yet,
 * generate the page on the fly and cache it.
 */
export const dynamicParams = true;

/**
 * Cache the page for 30 minutes to prevent disk reads and re-parsing on every request.
 */
export const revalidate = 30 * 60;

/**
 * Dynamically/statically generate metadata for the blog post.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  const post = await getPostBySlug(params.slug);

  if (!post) return null;

  const author = await getAuthorBySlug(post.metadata.author);
  const thumbnail = getBlogPostThumbnail(post.slug);

  return {
    title: `${post.metadata.title} | Blog | fabiancdng.com`,
    description: post.metadata.description,
    authors: [{ name: author?.metadata.name, url: author?.metadata.homepage }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${post.metadata.title} | Blog | fabiancdng.com`,
      description: post.metadata.description,
      creator: author ? `@${author.metadata.twitter}` : undefined,
      card: 'summary_large_image',
      images: [
        {
          type: 'image/jpeg',
          url: thumbnail.source,
          width: thumbnail.dimensions.width,
          height: thumbnail.dimensions.height,
          alt: post.metadata.title,
        },
      ],
    },
    openGraph: {
      ...openGraphBaseMetadata,
      title: `${post.metadata.title} | Blog | fabiancdng.com`,
      description: post.metadata.description,
      type: 'article',
      publishedTime: post.metadata.published_at.toISOString(),
      modifiedTime: post.metadata.updated_at.toISOString(),
      images: [
        {
          type: 'image/jpeg',
          url: thumbnail.source,
          width: thumbnail.dimensions.width,
          height: thumbnail.dimensions.height,
          alt: post.metadata.title,
        },
      ],
    },
  };
}

/**
 * A single blog post page.
 */
const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <h1 className="text-red-800 mt-20">404 - Not Found.</h1>;
  }

  return (
    <main>
      <Post post={post} />
    </main>
  );
};

/**
 * Export possible paths for this page.
 */
export async function generateStaticParams() {
  return await getAllBlogPostSlugs();
}

export default BlogPostPage;
