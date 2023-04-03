import {
  ISbStories,
  ISbStoriesParams,
  ISbStory,
  ISbStoryData,
  StoryblokComponent,
  getStoryblokApi,
} from '@storyblok/react';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import Head from 'next/head';
import SeoMetaTags from '../../../components/Seo/SeoMetaTags';
import Layout from '../../../components/Core/Layout';
import { PageStoryData } from '../../../types';
import Pagination from '../../../components/BlogPosts/Pagination';
import { useRouter } from 'next/router';

interface PaginatedBlogOverviewPageProps {
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

const POSTS_PER_PAGE = 1;

/**
 * Paginated blog overview page (eg. /blog/posts/3).
 * Posts are still being rendered by [...slug].tsx.
 */
const PaginatedBlogOverviewPage = (props: PaginatedBlogOverviewPageProps) => {
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
            />
          )}
        </>
      </Layout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(String(params?.page));

  // If page is 1, redirect to /blog/posts.
  if (page === 1) {
    return {
      redirect: {
        destination: '/blog/posts',
        permanent: true,
      },
    };
  }

  const storyblokApi = getStoryblokApi();

  // Calculate how many blog posts there are by counting all links starting with 'blog/'.
  const { data: blogPostLinks }: ISbStories = await storyblokApi.get(
    `cdn/links`,
    {
      starts_with: 'blog/',
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    }
  );

  // Total count of blog posts in Storyblok.
  const blogPostTotalCount = Object.keys(blogPostLinks.links).length - 1; // -1 because the blog overview page is also counted.

  // Total number of /blog/posts pages (including index).
  const totalPages = Math.ceil(blogPostTotalCount / POSTS_PER_PAGE);

  if (page > totalPages) {
    return {
      notFound: true,
    };
  }

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
    per_page: POSTS_PER_PAGE,
    page: page ? page : 1,
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
        totalPages: Math.ceil(blogPostTotalCount / POSTS_PER_PAGE),
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const storyblokApi = getStoryblokApi();

  // Calculate how many blog posts there are by counting all links starting with 'blog/'.
  const { data: blogPostLinks }: ISbStories = await storyblokApi.get(
    `cdn/links`,
    {
      starts_with: 'blog/',
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    }
  );

  // Total count of blog posts in Storyblok.
  const blogPostTotalCount = Object.keys(blogPostLinks.links).length - 1; // -1 because the blog overview page is also counted.

  // Total number of overview pages (including the index page).
  const totalPages = Math.ceil(blogPostTotalCount / Number(POSTS_PER_PAGE));

  // Define array of paths and other options (returned from this function).
  let staticPathsResult: GetStaticPathsResult = {
    paths: [],
    fallback: 'blocking',
  };

  for (let i = 1; i < totalPages; i++) {
    staticPathsResult.paths.push({
      params: {
        page: i.toString(),
      },
    });
  }

  return staticPathsResult;
};

export default PaginatedBlogOverviewPage;
