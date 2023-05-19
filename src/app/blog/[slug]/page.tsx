import Post from '@/components/Blog/Post/Post';
import { getPostBySlug } from '@/adapters/ContentAdapter';

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <h1 className="text-red-800 mt-20">404 - Not Found.</h1>;
  }

  return <Post metadata={post['metadata']} content={post.content} />;
};

/**
 * Revalidate page every 60 seconds.
 * Prevents parser from re-parsing the file on every request.
 */
export const revalidate = 60;

export default BlogPostPage;
