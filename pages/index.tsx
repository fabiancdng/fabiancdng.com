import {
  getStoryblokApi,
  ISbStoryParams,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react';
import Head from 'next/head';
import Layout from '../components/Core/Layout';
import SeoMetaTags from '../components/Seo/SeoMetaTags';
import { PageStoryData } from '../types';

const Home = ({ story }: { story: PageStoryData }) => {
  story = useStoryblokState(story);

  return (
    <div>
      <Head>
        <title>{story ? `${story.name} | fabiancdng.com` : 'My Site'}</title>
        <link rel="icon" href="/favicon.ico" />

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
