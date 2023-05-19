import Post from '@/components/Blog/Post/Post';
import { getPostBySlug } from '@/adapters/ContentAdapter';

/**
 * A single blog post page.
 */
const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <h1 className="text-red-800 mt-20">404 - Not Found.</h1>;
  }

  return <Post metadata={post.metadata} content={post.content} excerpt={post.excerpt} />;
};

export default BlogPostPage;
