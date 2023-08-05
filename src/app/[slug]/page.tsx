import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import Page from '@/components/Page/Page';
import { notFound } from 'next/navigation';
import { env } from 'process';
import { WP_Post } from '@/types';
import { stripHtmlFromExcerpt } from '../utils';

/**
 * Dynamically/statically generate metadata for the page.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  const wordPressEndpoint = `${env.WP_REST_API_URL}/wp/v2/pages?slug=${params.slug}&_embed`;
  const postRequest = await fetch(wordPressEndpoint);
  const pages: WP_Post[] = await postRequest.json();
  const page = pages[0];

  if (!page) return null;

  const robots = ['privacy-policy', 'legal-notice'];

  return {
    title: `${page.title.rendered} | fabiancdng.com`,
    description: stripHtmlFromExcerpt(page.excerpt.rendered),
    robots: robots.includes(page.slug) ? 'noindex, follow' : undefined,
    alternates: {
      canonical: `/${page.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${page.title.rendered} | fabiancdng.com`,
      description: stripHtmlFromExcerpt(page.excerpt.rendered),
    },
    openGraph: {
      ...openGraphBaseMetadata,
      url: `/${page.slug}`,
      title: `${page.title.rendered} | fabiancdng.com`,
      description: stripHtmlFromExcerpt(page.excerpt.rendered),
    },
  };
}

/**
 * A page dynamically/statically generated from Markdown.
 */
const DynamicPage = async ({ params }: { params: { slug: string } }) => {
  const wordPressEndpoint = `${env.WP_REST_API_URL}/wp/v2/pages?slug=${params.slug}&_embed`;
  const postRequest = await fetch(wordPressEndpoint);
  const pages: WP_Post[] = await postRequest.json();
  const page = pages[0];

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
  const wordPressEndpoint = env.WP_REST_API_URL + '/wp/v2/pages?_fields=slug';
  const pageSlugsRequest = await fetch(wordPressEndpoint);
  const pageSlugs = await pageSlugsRequest.json();

  return pageSlugs.map((page: { slug: string }) => ({ slug: page.slug }));
}

export default DynamicPage;
