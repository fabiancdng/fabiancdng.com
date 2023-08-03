import BlogBanner from '@/components/Blog/Feed/BlogBanner';
import PostPreview from '@/components/Blog/Feed/PostPreview';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '../metadata';
import { env } from 'process';
import { WP_Post } from '@/types';

/**
 * Set some metadata for the page for SEO.
 */
export const metadata: Metadata = {
  title: 'Blog | fabiancdng.com',
  description: 'A blog about web development, my projects, and my learnings as a full-stack web developer.',
  alternates: {
    canonical: '/blog',
  },
  twitter: {
    ...twitterBaseMetadata,
    title: 'Blog | fabiancdng.com',
    description: 'A blog about web development, my projects, and my learnings as a full-stack web developer.',
  },
  openGraph: {
    ...openGraphBaseMetadata,
    url: '/blog',
    title: 'Blog | fabiancdng.com',
    description: 'A blog about web development, my projects, and my learnings as a full-stack web developer.',
  },
};

const BlogPage = async () => {
  const wordPressEndpoint =
    env.WP_REST_API_URL +
    '/wp/v2/posts?_fields=title,slug,author,date,categories,tags,excerpt,featued_image,_links,_embedded&_embed=author,wp:featuredmedia,wp:term';
  const blogPostsRequest = await fetch(wordPressEndpoint);
  const blogPosts: WP_Post[] = await blogPostsRequest.json();

  return (
    <main>
      <BlogBanner
        title="Fabian's Blog"
        description="A blog about web development, my projects, and my learnings."
        linkTitle="Read more about me and this blog."
        link="/blog"
      />

      <div className="container max-w-7xl mx-auto">
        {blogPosts.map((post, index) => (
          <PostPreview key={index} post={post} />
        ))}
      </div>
    </main>
  );
};
export default BlogPage;
