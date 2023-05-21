import { getAllBlogPosts } from '@/adapters/ContentAdapter';
import BlogBanner from '@/components/Blog/Feed/BlogBanner';
import PostPreview from '@/components/Blog/Feed/PostPreview';

/**
 * Cache the page for 30 minutes to prevent disk reads and re-parsing on every request.
 */
export const revalidate = 30 * 60;

const BlogPage = async () => {
  const blogPosts = await getAllBlogPosts();
  return (
    <>
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
    </>
  );
};
export default BlogPage;
