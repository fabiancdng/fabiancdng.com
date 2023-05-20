import { getAllBlogPosts } from '@/adapters/ContentAdapter';
import BlogBanner from '@/components/Blog/Feed/BlogBanner';
import PostPreview from '@/components/Blog/Feed/PostPreview';

const BlogPage = () => {
  const blogPosts = getAllBlogPosts();
  return (
    <>
      <BlogBanner
        title="Blog"
        subtitle="Welcome to my blog!"
        description="Here you can find posts about web development, my projects, and my learnings."
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
