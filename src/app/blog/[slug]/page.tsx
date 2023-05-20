import Post from '@/components/Blog/Post/Post';
import { getAllBlogPostSlugs, getPostBySlug } from '@/adapters/ContentAdapter';

/**
 * If a request comes in to a page that exists in the file system, but has not been built yet,
 * generate the page on the fly and cache it.
 */
export const dynamicParams = true;

/**
 * Cache the page for 20 seconds to prevent disk reads and re-parsing on every request.
 */
export const revalidate = 20;

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

/**
 * Export possible paths for this page.
 */
export async function generateStaticParams() {
  return getAllBlogPostSlugs();
}

export default BlogPostPage;
