import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import { notFound } from 'next/navigation';
import PostPreview from '@/components/Blog/Feed/PostPreview';
import BlogBanner from '@/components/Blog/Feed/BlogBanner';
import { env } from 'process';
import { WP_Embedded_Term, WP_Post } from '@/types';
import { getWpRessource } from '@/adapters/WordPressAdapter';

/**
 * Dynamically/statically generate metadata for the blog post.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  // Get the category metadata from WordPress.
  const categories: WP_Embedded_Term[] = await getWpRessource('categories', {
    slug: params.slug,
  });
  const category = categories[0];

  if (!category) return null;

  return {
    title: `${category.name} | Blog | fabiancdng.com`,
    description: category.description,
    alternates: {
      canonical: `/blog/categories/${category.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${category.name} | Blog | fabiancdng.com`,
      description: category.description,
    },
    openGraph: {
      ...openGraphBaseMetadata,
      url: `/blog/categories/${category.slug}`,
      title: `${category.name} | Blog | fabiancdng.com`,
      description: category.description,
    },
  };
}

/**
 * A page for a category in the blog.
 */
const BlogCategoryPage = async ({ params }: { params: { slug: string } }) => {
  // Get the category metadata from WordPress.
  const categories: WP_Embedded_Term[] = await getWpRessource('categories', {
    slug: params.slug,
  });
  const category = categories[0];

  // If the tag doesn't exist, return a 404.
  if (!category) notFound();

  // Get the user's posts from WordPress (only needed fields).
  const categoryPosts: WP_Post[] = await getWpRessource('posts', {
    categories: category.id,
    _fields: ['slug', 'title', 'categories', 'tags', 'author', 'excerpt', 'date', 'featured_media', '_links', '_embedded'],
    _embed: ['author', 'wp:featuredmedia', 'wp:term'],
  });

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
  // Get all category slugs from WordPress.
  const categorySlugs = await getWpRessource('categories', {
    _fields: ['slug'],
  });

  return categorySlugs.map((category: { slug: string }) => ({ slug: category.slug }));
}

export default BlogCategoryPage;
