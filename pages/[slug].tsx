import GhostContentAPI, { PostOrPage } from '@tryghost/content-api';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { env } from 'process';
import { useEffect, useState } from 'react';
import Layout from '../components/Misc/Layout';

/**
 * Component to render the post/page from Ghost in the React app.
 */
const PageContent = ({ page }: { page: PostOrPage }) => {
  /**
   * The page content (HTML).
   */
  const pageContent = String(page.html);

  return (
    <div className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
      <h1 className="text-5xl font-semibold">{page.title}</h1>
      <div
        className="ghost-css"
        id="ghost-page"
        dangerouslySetInnerHTML={{ __html: pageContent }}
      />
    </div>
  );
};

/**
 * Custom Page component.
 * Gets the page content from Ghost by its slug (if it exists).
 */
const Page = ({ page }: { page: PostOrPage }) => {
  const [currentURL, setCurrentURL] = useState('');

  useEffect(() => {
    // Set initial state.
    setCurrentURL(window.location.href);
  }, []);

  return (
    <>
      <Head>
        <title>{page.title + ' | fabiancdng.com'}</title>
        <meta
          name="description"
          content={page.meta_description ? page.meta_description : page.excerpt}
        />
        <link rel="canonical" href={currentURL} />
        <meta property="og:site_name" content="fabiancdng.com" />
        <meta property="og:title" content={page.title} />
        <meta
          property="og:description"
          content={page.meta_description ? page.meta_description : page.excerpt}
        />
        <meta property="og:url" content={currentURL} />
        <meta property="og:type" content="article" />
        <meta
          property="article:published_time"
          content={String(page.published_at)}
        />
        <meta
          property="article:modified_time"
          content={String(page.updated_at)}
        />
        {
          // Always 'null'.
          // <meta property="og:image" content={ String(page.feature_image) } />
        }
      </Head>

      <Layout>
        <PageContent page={page} />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  /**
   * The list of available paths to return.
   */
  const paths: string[] = [];

  const { GHOST_URL, GHOST_CONTENT_API_KEY } = env;

  // Initialize GhostContentAPI.
  const ghost = new GhostContentAPI({
    url: String(GHOST_URL),
    key: String(GHOST_CONTENT_API_KEY),
    version: 'v5.0',
  });

  // Get list of all pages from Ghost.
  // TODO: Don't get full page, only list of slugs is necessary.
  const pages = await ghost.pages.browse({
    include: 'authors',
  });

  // Go through each page and add its slug to the list of available paths.
  pages.forEach((page: PostOrPage) => {
    const pageSlug = '/' + page.slug;
    paths.push(pageSlug);
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  /**
   * The slug of this page.
   */
  const pageSlug = String(context.params?.slug);

  const { GHOST_URL, GHOST_CONTENT_API_KEY } = env;

  // Initialize GhostContentAPI.
  const ghost = new GhostContentAPI({
    url: String(GHOST_URL),
    key: String(GHOST_CONTENT_API_KEY),
    version: 'v4',
  });

  let pageData;

  // Try to get page from Ghost by slug.
  try {
    pageData = await ghost.pages.read({
      slug: pageSlug,
    });
  } catch (error) {
    // Return 404 page if the page doesn't exist.
    return {
      notFound: true,
    };
  }

  // Pass the page metadata and content from Ghost.
  return {
    props: {
      page: pageData,
    },
    revalidate: 1800, // seconds
  };
};

export default Page;
