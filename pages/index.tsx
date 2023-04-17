import {
  getStoryblokApi,
  ISbStoryParams,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react';
import Head from 'next/head';
import Layout from '../components/Misc/Layout';
import SeoMetaTags from '../components/Seo/SeoMetaTags';
import { PageStoryData } from '../types';
import GetCurrentTimestamp from '../utils/get-time-stamp';

const Home = ({ story }: { story: PageStoryData }) => {
  story = useStoryblokState(story);

  return (
    <div>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}`} />
      </Head>

      <SeoMetaTags story={story} />

      <Layout>
        <StoryblokComponent blok={story.content} story={story} />
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  // Default slug for the homepage in Storyblok.
  let slug = 'home';

  // Console log on the server-side for easy maintenance.
  if (process.env.NODE_ENV === 'production') {
    console.log(
      `[${GetCurrentTimestamp()}] getStaticProps() executing for /...`
    );
  }

  // Load the draft version.
  let sbParams: ISbStoryParams = {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
  };

  const storyblokApi = getStoryblokApi();
  let { data }: any = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 30 * 60, // revalidate every 30 minutes.
  };
}

export default Home;
