import {
  ISbStories,
  ISbStory,
  ISbStoryData,
  StoryblokComponent,
  getStoryblokApi,
} from '@storyblok/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import SeoMetaTags from '../../components/Seo/SeoMetaTags';
import Layout from '../../components/Core/Layout';
import { PageStoryData } from '../../types';

interface BlogOverviewPageProps {
  story: PageStoryData; // Story for the blog overview page.
  relations: any; // Relations for the blog overview page.
  blogPosts: ISbStoryData[]; // Collection of all stories representing blog posts (all stories in the blog folder).
  blogPostsRelations: ISbStoryData[]; // Relations for those blog post stories.
}

/**
 * Blog overview page.
 * Posts are still being rendered by [...slug].tsx.
 */
const BlogOverviewPage = (props: BlogOverviewPageProps) => {
  return (
    <div>
      <Head>
        <title>
          {props.story ? `${props.story.name} | fabiancdng.com` : 'My Site'}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SeoMetaTags story={props.story} />

      <Layout>
        <StoryblokComponent
          blok={props.story.content}
          story={props.story}
          payload={{
            blogPosts: props.blogPosts,
            blogPostsRelations: props.blogPostsRelations,
          }}
        />
      </Layout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const storyblokApi = getStoryblokApi();

  // Retrieve story for the blog overview page.
  let { data }: ISbStory = await storyblokApi.get(`cdn/stories/blog`, {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    resolve_relations: 'author',
  });

  // Retrieve stories for all blog posts (without content).
  const { data: blogPosts }: ISbStories = await storyblokApi.get(
    `cdn/stories`,
    {
      starts_with: 'blog/',
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      resolve_relations: 'author',
      excluding_fields: 'content', // Don't query content for all blog posts.
      excluding_slugs: 'blog/', // Don't query the blog overview page.
      per_page: 2,
    }
  );

  return {
    props: {
      story: data.story ? data.story : false,
      relations: data.rels ? data.rels : false,
      blogPosts: blogPosts.stories ? blogPosts.stories : false,
      blogPostsRelations: blogPosts.rels ? blogPosts.rels : false,
    },
    revalidate: 30 * 60, // revalidate every 30 minutes.
  };
};

export default BlogOverviewPage;
