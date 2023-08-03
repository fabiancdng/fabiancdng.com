import Post from '@/components/Blog/Post/Post';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import { notFound } from 'next/navigation';
import { env } from 'process';
import { WP_Post } from '@/types';

/**
 * If a request comes in to a page that exists in the file system, but has not been built yet,
 * generate the page on the fly and cache it.
 */
export const dynamicParams = true;

/**
 * Revalidate the cache for this page after 30 minutes as content might change.
 */
export const revalidate = 30 * 60;

/**
 * Dynamically/statically generate metadata for the blog post.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  const wordPressEndpoint = `${env.WP_REST_API_URL}/wp/v2/posts?slug=${params.slug}&_embed`;
  const postRequest = await fetch(wordPressEndpoint);
  const posts: WP_Post[] = await postRequest.json();
  const post = posts[0];

  if (!post) return null;

  return {
    title: `${post.title.rendered} | Blog | fabiancdng.com`,
    description: post.excerpt.rendered,
    authors: [{ name: post['_embedded']['author'][0].name, url: post['_embedded'].author[0].url }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${post.title.rendered} | Blog | fabiancdng.com`,
      description: post.excerpt.rendered,
      //creator: post['_embedded']['author'][0] ? `@${post['_embedded']['author'][0].slug}` : undefined,
      card: 'summary_large_image',
      images: [
        {
          type: post['_embedded']['wp:featuredmedia'][0].type,
          url: post['_embedded']['wp:featuredmedia'][0].source_url,
          width: post['_embedded']['wp:featuredmedia'][0].media_details.width,
          height: post['_embedded']['wp:featuredmedia'][0].media_details.height,
          alt: post['_embedded']['wp:featuredmedia'][0].alt_text,
        },
      ],
    },
    openGraph: {
      ...openGraphBaseMetadata,
      url: `/blog/${post.slug}`,
      title: `${post.title.rendered} | Blog | fabiancdng.com`,
      description: post.excerpt.rendered,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: [
        {
          type: post['_embedded']['wp:featuredmedia'][0].type,
          url: post['_embedded']['wp:featuredmedia'][0].source_url,
          width: post['_embedded']['wp:featuredmedia'][0].media_details.width,
          height: post['_embedded']['wp:featuredmedia'][0].media_details.height,
          alt: post['_embedded']['wp:featuredmedia'][0].alt_text,
        },
      ],
    },
  };
}

/**
 * A single blog post page.
 */
const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const wordPressEndpoint = `${env.WP_REST_API_URL}/wp/v2/posts?slug=${params.slug}&_embed`;
  const postRequest = await fetch(wordPressEndpoint);
  const posts: WP_Post[] = await postRequest.json();
  const post = posts[0];

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
  const wordPressEndpoint = env.WP_REST_API_URL + '/wp/v2/posts?_fields=slug';
  const postSlugsRequest = await fetch(wordPressEndpoint);
  const postSlugs = await postSlugsRequest.json();

  return postSlugs.map((post: { slug: string }) => ({ slug: post.slug }));
}

export default BlogPostPage;
