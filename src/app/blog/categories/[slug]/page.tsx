import { getAllBlogPostsByTag, getTagBySlug } from '@/adapters/ContentAdapter';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import { notFound } from 'next/navigation';
import PostPreview from '@/components/Blog/Feed/PostPreview';
import BlogBanner from '@/components/Blog/Feed/BlogBanner';
import { env } from 'process';

/**
 * Dynamically/statically generate metadata for the blog post.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  const tag = await getTagBySlug(params.slug.toLowerCase());

  if (!tag) return null;

  return {
    title: `${tag.name} | Blog | fabiancdng.com`,
    description: `All posts tagged with '${tag.name}'.`,
    alternates: {
      canonical: `/blog/categories/${tag.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${tag.name} | Blog | fabiancdng.com`,
      description: `All posts tagged with '${tag.name}'.`,
    },
    openGraph: {
      ...openGraphBaseMetadata,
      url: `/blog/categories/${tag.slug}`,
      title: `${tag.name} | Blog | fabiancdng.com`,
      description: `All posts tagged with '${tag.name}'.`,
    },
  };
}

/**
 * A page for a category in the blog.
 */
const BlogCategoryPage = async ({ params }: { params: { slug: string } }) => {
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
  const wordPressEndpoint = env.WP_REST_API_URL + '/wp/v2/categories?_fields=slug';
  const categorySlugsRequest = await fetch(wordPressEndpoint);
  const categorySlugs = await categorySlugsRequest.json();

  return categorySlugs.map((category: { slug: string }) => ({ slug: category.slug }));
}

export default BlogCategoryPage;
