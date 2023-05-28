import { getAllPageSlugs, getPageBySlug } from '@/adapters/ContentAdapter';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import Page from '@/components/Page/Page';
import { notFound } from 'next/navigation';

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
 * Dynamically/statically generate metadata for the page.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  const page = await getPageBySlug(params.slug);

  if (!page) return null;

  return {
    title: `${page.metadata.title} | fabiancdng.com`,
    description: page.metadata.description,
    robots: !page.metadata.search_engine_index ? 'noindex, follow' : undefined,
    alternates: {
      canonical: `/${page.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${page.metadata.title} | fabiancdng.com`,
      description: page.metadata.description,
    },
    openGraph: {
      ...openGraphBaseMetadata,
      title: `${page.metadata.title} | fabiancdng.com`,
      description: page.metadata.description,
    },
  };
}

/**
 * A page dynamically/statically generated from Markdown.
 */
const DynamicPage = async ({ params }: { params: { slug: string } }) => {
  const page = await getPageBySlug(params.slug);

  // If the page doesn't exist, return a 404.
  if (!page) {
    return notFound();
  }

  return (
    <main>
      <Page page={page} />
    </main>
  );
};

/**
 * Export possible paths for this page.
 */
export async function generateStaticParams() {
  return await getAllPageSlugs();
}

export default DynamicPage;
