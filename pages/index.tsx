import {
  getStoryblokApi,
  ISbStoryData,
  ISbStoryParams,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Misc/Layout';

interface StoryData {
  story: ISbStoryData;
}

const Home: NextPage<StoryData> = ({ story }: StoryData) => {
  story = useStoryblokState(story);

  return (
    <div>
      <Head>
        <title>{story ? story.name : 'My Site'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <StoryblokComponent blok={story.content} story={story} />
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  // Default slug for the homepage in Storyblok.
  let slug = 'home';

  // Load the draft version.
  let sbParams: ISbStoryParams = {
    version: 'draft', // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data }: any = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600, // revalidate every hour
  };
}

export default Home;
