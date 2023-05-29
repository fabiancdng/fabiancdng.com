import Post from '@/components/Blog/Post/Post';
import { getAllBlogPostSlugs, getAuthorBySlug, getBlogPostThumbnail, getPostBySlug } from '@/adapters/ContentAdapter';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import { notFound } from 'next/navigation';

/**
 * If a request comes in to a page that exists in the file system, but has not been built yet,
 * generate the page on the fly and cache it.
 */
export const dynamicParams = true;

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

  // If the post doesn't exist, return a 404.
  if (!post) {
    notFound();
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
  const postSlugs = await getAllBlogPostSlugs();
  return postSlugs.map((slug) => ({ slug }));
}

export default BlogPostPage;
