import Post from '@/components/Blog/Post/Post';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import { notFound } from 'next/navigation';
import { WP_Post } from '@/types';
import { getWpRessource } from '@/adapters/WordPressAdapter';
import { stripHtmlFromExcerpt } from '@/app/utils';

/**
 * Dynamically/statically generate metadata for the blog post.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  // Get the full post from WordPress.
  const posts: WP_Post[] = await getWpRessource('posts', {
    slug: params.slug,
    _embed: true,
  });
  const post = posts[0];

  const author = post['_embedded']['author'][0];
  const thumbnail = post['_embedded']['wp:featuredmedia'][0];

  if (!post) return null;

  return {
    title: `${post.title.rendered} | Blog | fabiancdng.com`,
    description: stripHtmlFromExcerpt(post.excerpt.rendered),
    authors: [{ name: author.name, url: author.url }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${post.title.rendered} | Blog | fabiancdng.com`,
      description: stripHtmlFromExcerpt(post.excerpt.rendered),
      //creator: post['_embedded']['author'][0] ? `@${post['_embedded']['author'][0].slug}` : undefined,
      card: 'summary_large_image',
      images: [
        {
          type: thumbnail.type,
          url: thumbnail.source_url,
          width: thumbnail.media_details.width,
          height: thumbnail.media_details.height,
          alt: thumbnail.alt_text,
        },
      ],
    },
    openGraph: {
      ...openGraphBaseMetadata,
      url: `/blog/${post.slug}`,
      title: `${post.title.rendered} | Blog | fabiancdng.com`,
      description: stripHtmlFromExcerpt(post.excerpt.rendered),
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: [
        {
          type: thumbnail.type,
          url: thumbnail.source_url,
          width: thumbnail.media_details.width,
          height: thumbnail.media_details.height,
          alt: thumbnail.alt_text,
        },
      ],
    },
  };
}

/**
 * A single blog post page.
 */
const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  // Get the full post from WordPress.
  const posts: WP_Post[] = await getWpRessource('posts', {
    slug: params.slug,
    _embed: true,
  });
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
  // Get all post slugs from WordPress.
  const postSlugs = await getWpRessource('posts', {
    _fields: 'slug',
  });

  return postSlugs.map((post: { slug: string }) => ({ slug: post.slug }));
}

export default BlogPostPage;
