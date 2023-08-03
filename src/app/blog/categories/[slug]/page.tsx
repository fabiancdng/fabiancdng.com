import { getAllBlogPostsByTag, getTagBySlug } from '@/adapters/ContentAdapter';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import { notFound } from 'next/navigation';
import PostPreview from '@/components/Blog/Feed/PostPreview';
import BlogBanner from '@/components/Blog/Feed/BlogBanner';
import { env } from 'process';
import { WP_Embedded_Term, WP_Post } from '@/types';

/**
 * Dynamically/statically generate metadata for the blog post.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  const wordPressEndpoint = `${env.WP_REST_API_URL}/wp/v2/categories?slug=${params.slug}`;
  const categoryRequest = await fetch(wordPressEndpoint);
  const categories: WP_Embedded_Term[] = await categoryRequest.json();
  const category = categories[0];

  if (!category) return null;

  return {
    title: `${category.name} | Blog | fabiancdng.com`,
    description: `All posts in the category '${category.name}'.`,
    alternates: {
      canonical: `/blog/categories/${category.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${category.name} | Blog | fabiancdng.com`,
      description: `All posts tagged with '${category.name}'.`,
    },
    openGraph: {
      ...openGraphBaseMetadata,
      url: `/blog/categories/${category.slug}`,
      title: `${category.name} | Blog | fabiancdng.com`,
      description: `All posts tagged with '${category.name}'.`,
    },
  };
}

/**
 * A page for a category in the blog.
 */
const BlogCategoryPage = async ({ params }: { params: { slug: string } }) => {
  let wordPressEndpoint = `${env.WP_REST_API_URL}/wp/v2/categories?slug=${params.slug}&_embed`;
  const categoryRequest = await fetch(wordPressEndpoint);
  const categories: WP_Embedded_Term[] = await categoryRequest.json();
  const category = categories[0];

  // If the tag doesn't exist, return a 404.
  if (!category) notFound();

  wordPressEndpoint = `${env.WP_REST_API_URL}/wp/v2/posts?categories=${category.id}&_fields=slug,title,categories,tags,author,excerpt,date,featured_media,_links,_embedded&_embed=author,wp:featuredmedia,wp:term`;
  const categoryPostsRequest = await fetch(wordPressEndpoint);
  const categoryPosts: WP_Post[] = await categoryPostsRequest.json();

  // If the posts can't be fetched, return a 404.
  if (!categoryPosts) notFound();

  return (
    <main>
      <BlogBanner
        title={`${category.name}`}
        description={category.description}
        linkTitle="Read more about me and this blog."
        link="/blog"
      />

      <div className="container max-w-7xl mx-auto">
        {categoryPosts.map((post, index) => (
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
