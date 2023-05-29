import { getAllBlogPosts } from '@/adapters/ContentAdapter';
import BlogBanner from '@/components/Blog/Feed/BlogBanner';
import PostPreview from '@/components/Blog/Feed/PostPreview';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '../metadata';

/**
 * Revalidate the cache for this page after 30 minutes as content might change.
 */
export const revalidate = 30 * 60;

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
    title: 'Blog | fabiancdng.com',
    description: 'A blog about web development, my projects, and my learnings as a full-stack web developer.',
  },
};

const BlogPage = async () => {
  const blogPosts = await getAllBlogPosts();
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
