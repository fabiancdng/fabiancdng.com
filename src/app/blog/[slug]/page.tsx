import Post from '@/components/Blog/Post/Post';
import { getPostBySlug } from '@/adapters/ContentAdapter';

/**
 * A single blog post page.
 */
const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return <h1 className="text-red-800 mt-20">404 - Not Found.</h1>;
  }

  return <Post slug={params.slug} post={post} />;
};

export default BlogPostPage;
