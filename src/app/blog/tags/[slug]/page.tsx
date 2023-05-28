import { getAllBlogPostsByTag, getAllTagSlugs, getTagBySlug } from '@/adapters/ContentAdapter';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import { notFound } from 'next/navigation';
import PostPreview from '@/components/Blog/Feed/PostPreview';
import BlogBanner from '@/components/Blog/Feed/BlogBanner';

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
 * Dynamically/statically generate metadata for the blog post.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  const tag = await getTagBySlug(params.slug.toLowerCase());

  if (!tag) return null;

  return {
    title: `${tag.name} | Blog | fabiancdng.com`,
    description: `All posts tagged with '${tag.name}}'.`,
    alternates: {
      canonical: `/blog/tags/${tag.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${tag.name} | Blog | fabiancdng.com`,
      description: `All posts tagged with '${tag.name}'.`,
    },
    openGraph: {
      ...openGraphBaseMetadata,
      title: `${tag.name} | Blog | fabiancdng.com`,
      description: `All posts tagged with '${tag.name}'.`,
    },
  };
}

/**
 * A page for a tag in the blog.
 */
const BlogTagPage = async ({ params }: { params: { slug: string } }) => {
  const tag = await getTagBySlug(params.slug.toLowerCase());

  // If the tag doesn't exist, return a 404.
  if (!tag) notFound();

  const posts = await getAllBlogPostsByTag(tag.slug);

  // If the posts can't be fetched, return a 404.
  if (!posts) notFound();

  return (
    <main>
      <BlogBanner
        title={`${tag.emoji} ${tag.name}`}
        description={`All blog posts tagged with "${tag.name}".`}
        linkTitle="Read more about me and this blog."
        link="/blog"
      />

      <div className="container max-w-7xl mx-auto">
        {posts.map((post, index) => (
          <PostPreview key={index} post={post} />
        ))}
      </div>
    </main>
  );
};

/**
 * Export possible paths for this page.
 */
export async function generateStaticParams() {
  return await getAllTagSlugs();
}

export default BlogTagPage;
