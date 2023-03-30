import Head from 'next/head';
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
  ISbStoryData,
  ISbStoriesParams,
  ISbStories,
} from '@storyblok/react';
import Layout from '../components/Misc/Layout';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { PageOrPostAuthor } from '../types';

interface PageProps {
  story: ISbStoryData | false; // The story to render out on the page.
  author: PageOrPostAuthor | false; // The author of the post of the story (if set).
  subStories: ISbStories; // Other stories in the same folder.
  key: string | false;
}

export default function Page({ story, author, subStories }: PageProps) {
  // Make sure story and author object were passed correctly.
  if (!story) {
    return null;
  }

  console.log(subStories);

  // Run story object through the useStoryblokState hook.
  story = useStoryblokState(story);

  return (
    <div>
      <Head>
        <title>{story ? story.name : 'My Site'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <StoryblokComponent
          blok={story.content}
          story={story}
          author={author}
        />
      </Layout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const nextSlug = params?.slug ? Array.from(params?.slug) : Array.from('home');

  let slug = nextSlug.join('/');

  let sbParams: ISbStoriesParams = {
    starts_with: slug,
    resolve_relations: 'author',
    excluding_fields: 'content',
  };

  const storyblokApi = getStoryblokApi();
  let { data }: ISbStories = await storyblokApi.get(`cdn/stories`, sbParams);

  // If slug has stories, return the first one as the one to render.
  if (data.stories.length > 0) {
    const story = data.stories[0];

    return {
      props: {
        story: story ? story : false,
        author: data.rels[0] ? data.rels[0] : false,
        subStories: data.stories.slice(1),
        key: data ? story.id : false,
      },
      revalidate: 3600,
    };
  } else {
    // No story found for slug, return 404.
    return {
      notFound: true,
    };
  }
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
    version: 'draft',
  });

  // Define array of paths and other options (returned from this function).
  let staticPathsResult: GetStaticPathsResult = {
    paths: [],
    fallback: false,
  };

  // Go through each link and add it to the array of paths.
  Object.keys(data.links).forEach((linkKey) => {
    // Skip folders and home page.
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === 'home') {
      return;
    }

    // Split nested links into array.
    const slug = data.links[linkKey].slug;
    let slugArray = slug.split('/');

    staticPathsResult.paths.push({ params: { slug: slugArray } });
  });

  return staticPathsResult;
};
