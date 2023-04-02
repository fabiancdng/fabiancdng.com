import {
  ISbStories,
  ISbStoriesParams,
  ISbStory,
  ISbStoryData,
  ISbStoryParams,
  StoryblokComponent,
  getStoryblokApi,
} from '@storyblok/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import SeoMetaTags from '../../components/Seo/SeoMetaTags';
import Layout from '../../components/Core/Layout';
import { PageStoryData } from '../../types';
import Pagination from '../../components/BlogPosts/Pagination';
import { useRouter } from 'next/router';

interface BlogOverviewPageProps {
  story: PageStoryData; // Story for the blog overview page.
  relations: any; // Relations for the blog overview page.
  blogPosts: ISbStoryData[]; // Collection of all stories representing blog posts (all stories in the blog folder).
  blogPostsRelations: ISbStoryData[]; // Relations for those blog post stories.
  blogPostTotalCount: number; // Total number of blog posts.
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

/**
 * Blog overview page.
 * Posts are still being rendered by [...slug].tsx.
 */
const BlogOverviewPage = (props: BlogOverviewPageProps) => {
  const router = useRouter();

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
        <>
          <StoryblokComponent
            blok={props.story.content}
            story={props.story}
            payload={{
              blogPosts: props.blogPosts,
              blogPostsRelations: props.blogPostsRelations,
            }}
          />

          {props.pagination.totalPages > 1 && (
            <Pagination
              currentPage={props.pagination.currentPage}
              totalPages={props.pagination.totalPages}
              onPageChange={(page) => {
                // Redirect to the blog page with the new page number using next/router.
                router.push({
                  pathname: '/blog',
                  query: {
                    page: page,
                  },
                });
              }}
            />
          )}
        </>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const storyblokApi = getStoryblokApi();

  // Get how many blog posts there are by counting all links starting with 'blog/'.
  const { data: blogPostLinks }: ISbStories = await storyblokApi.get(
    `cdn/links`,
    {
      starts_with: 'blog/',
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    }
  );

  const blogPostTotalCount = Object.keys(blogPostLinks.links).length - 1; // -1 because the blog overview page is also counted.

  // Retrieve story for the blog overview page.
  let { data }: ISbStory = await storyblokApi.get(`cdn/stories/blog`, {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    resolve_relations: 'author',
  });

  const sbParams: ISbStoriesParams = {
    starts_with: 'blog/',
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    resolve_relations: 'author',
    excluding_fields: 'content', // Don't query content for all blog posts.
    excluding_slugs: 'blog/', // Don't query the blog overview page.
    per_page: context.query['per_page']
      ? Number(context.query['per_page'])
      : 15,
    page: context.query.page ? Number(context.query.page) : 1,
  };

  // Retrieve stories for all blog posts (without content).
  const { data: blogPosts }: ISbStories = await storyblokApi.get(
    `cdn/stories`,
    sbParams
  );

  if (blogPosts.stories.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      story: data.story ? data.story : false,
      relations: data.rels ? data.rels : false,
      blogPosts: blogPosts.stories ? blogPosts.stories : false,
      blogPostsRelations: blogPosts.rels ? blogPosts.rels : false,
      pagination: {
        currentPage: sbParams['page'],
        totalPages: Math.ceil(
          blogPostTotalCount / Number(sbParams['per_page'])
        ),
      },
    },
  };
};

export default BlogOverviewPage;
