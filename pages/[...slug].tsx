import Head from 'next/head';
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
  ISbStoriesParams,
  ISbStory,
} from '@storyblok/react';
import Layout from '../components/Core/Layout';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { PageStoryData } from '../types';
import SeoMetaTags from '../components/Seo/SeoMetaTags';
import GetCurrentTimestamp from '../utils/get-time-stamp';

interface PageProps {
  story: PageStoryData; // The story to render out on the page.
  relations: any; // Relations for the story.
}

export default function Page({ story, relations }: PageProps) {
  // Run story object through the useStoryblokState hook.
  story = useStoryblokState(story);

  return (
    <div>
      <Head>
        <title>
          {story
            ? `${story.name} ${
                story.full_slug.startsWith('blog') ? '| Blog ' : ''
              } | fabiancdng.com`
            : 'My Site'}
        </title>
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/${story.full_slug}`}
        />
      </Head>

      <SeoMetaTags story={story} />

      <Layout>
        <StoryblokComponent
          blok={story.content}
          story={story}
          relations={relations}
        />
      </Layout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Console log on the server-side for easy maintenance.
  if (process.env.NODE_ENV === 'production') {
    console.log(
      `[${GetCurrentTimestamp()}] getStaticProps() executing for [...slug]...`
    );
  }

  const slugArray = params?.slug
    ? Array.from(params?.slug)
    : Array.from('home');

  let slug = slugArray.join('/');

  let sbParams: ISbStoriesParams = {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    resolve_relations: 'author',
  };

  const storyblokApi = getStoryblokApi();

  // Retrieve the story for the slug.
  try {
    let { data }: ISbStory = await storyblokApi.get(
      `cdn/stories/${slug}`,
      sbParams
    );

    return {
      props: {
        story: data.story ? data.story : false,
        relations: data.rels ? data.rels : false,
      },
      revalidate: 30 * 60, // revalidate every 30 minutes.
    };
  } catch (e) {
    // Retrieving the story failed, probably not found.
    // Return 404 and cache for 30 minutes.
    return {
      notFound: true,
      revalidate: 5 * 60, // revalidate every 5 minutes.
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Console log on the server-side for easy maintenance.
  if (process.env.NODE_ENV === 'production') {
    console.log(
      `[${GetCurrentTimestamp()}] getStaticPaths() executing for [...slug]...`
    );
  }

  interface Link {
    id: number;
    slug: string;
    name: string;
    is_folder: boolean;
    parent_id: number;
    published: boolean;
    path: string;
    position: number;
    uuid: string;
    is_startpage: boolean;
    real_path: string;
  }

  interface LinksData {
    links: {
      [key: string]: Link;
    };
  }

  // Get possible slugs from Storyblok.
  const storyblokApi = getStoryblokApi();
  let { data }: { data: LinksData } = await storyblokApi.get('cdn/links/', {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    excluding_slugs: 'blog/,authors/*',
  });

  // Define array of paths and other options (returned from this function).
  let staticPathsResult: GetStaticPathsResult = {
    paths: [],
    fallback: 'blocking',
  };

  // Go through each link and add it to the array of paths.
  Object.keys(data.links).forEach((linkKey) => {
    // Skip folders and home page.
    if (
      data.links[linkKey].is_folder ||
      data.links[linkKey].is_startpage ||
      data.links[linkKey].slug === 'home' ||
      data.links[linkKey].slug.startsWith('authors')
    ) {
      return;
    }

    // Split nested links into array.
    const slug = data.links[linkKey].slug;
    let slugArray = slug.split('/');

    staticPathsResult.paths.push({ params: { slug: slugArray } });
  });

  return staticPathsResult;
};
