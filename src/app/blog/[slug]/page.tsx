import Post from '@/components/Blog/Post/Post';
import { getAllBlogPostSlugs, getPostBySlug } from '@/adapters/ContentAdapter';

/**
 * If a request comes in to a page that exists in the file system, but has not been built yet,
 * generate the page on the fly and cache it.
 */
export const dynamicParams = true;

/**
 * Cache the page for 30 minutes to prevent disk reads and re-parsing on every request.
 */
export const revalidate = 30 * 60;

/**
 * A single blog post page.
 */
const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <h1 className="text-red-800 mt-20">404 - Not Found.</h1>;
  }

  return (
    <main>
      <Post slug={params.slug} post={post} />
    </main>
  );
};

/**
 * Export possible paths for this page.
 */
export async function generateStaticParams() {
  return await getAllBlogPostSlugs();
}

export default BlogPostPage;
