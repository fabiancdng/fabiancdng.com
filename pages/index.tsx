import {
  getStoryblokApi,
  ISbStoryData,
  ISbStoryParams,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react';
import { NextPage } from 'next';
import Head from 'next/head';

interface PageProps {
  story: ISbStoryData;
  key: number;
}

const Home: NextPage<PageProps> = (props: PageProps) => {
  const story = useStoryblokState(props.story);

  return (
    <div>
      <Head>
        <title>{story ? story.name : 'My Site'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>{story ? story.name : 'My Site'}</h1>
      </header>

      <main>
        <StoryblokComponent blok={story.content} />
      </main>
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
