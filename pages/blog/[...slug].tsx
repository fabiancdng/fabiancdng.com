import {
  ISbStoriesParams,
  ISbStory,
  ISbStoryData,
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import { PageStoryData } from '../../types';
import Head from 'next/head';
import SeoMetaTags from '../../components/Seo/SeoMetaTags';
import Layout from '../../components/Core/Layout';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';

interface PageProps {
  story: PageStoryData; // The story to render out on the page.
  relations: ISbStoryData[]; // The relations for the story.
}

export default function BlogPage({ story, relations }: PageProps) {
  // Run story object through the useStoryblokState hook.
  story = useStoryblokState(story);

  return (
    <div>
      <Head>
        <title>{story ? `${story.name} | fabiancdng.com` : 'My Site'}</title>
        <link rel="icon" href="/favicon.ico" />
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
  const slugArray = params?.slug
    ? Array.from(params?.slug)
    : Array.from('blog');

  let slug = slugArray.join('/');

  let sbParams: ISbStoriesParams = {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    resolve_relations: 'author',
  };

  const storyblokApi = getStoryblokApi();

  // Retrieve the story for the slug.
  let { data }: ISbStory = await storyblokApi.get(
    `cdn/stories/blog/${slug}`,
    sbParams
  );

  return {
    props: {
      story: data.story ? data.story : false,
      relations: data.rels ? data.rels : false,
    },
    revalidate: 30 * 60, // revalidate every 30 minutes.
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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
  });

  // Define array of paths and other options (returned from this function).
  let staticPathsResult: GetStaticPathsResult = {
    paths: [],
    fallback: 'blocking',
  };

  // Go through each link and add it to the array of paths.
  Object.keys(data.links).forEach((linkKey) => {
    // Skip folders and other pages.
    if (
      data.links[linkKey].is_folder ||
      data.links[linkKey].is_startpage ||
      !data.links[linkKey].slug.startsWith('blog')
    ) {
      return;
    }

    // Split nested links into array.
    const slug = data.links[linkKey].slug.replace('blog/', '');
    let slugArray = slug.split('/');

    staticPathsResult.paths.push({ params: { slug: slugArray } });
  });

  return staticPathsResult;
};
