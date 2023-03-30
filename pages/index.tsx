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
