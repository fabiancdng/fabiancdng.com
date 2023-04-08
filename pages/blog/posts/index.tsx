import {
  ISbStories,
  ISbStoriesParams,
  ISbStoryData,
  getStoryblokApi,
} from '@storyblok/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../../../components/Core/Layout';
import { BlogPostStoryData, IsbTags } from '../../../types';
import Pagination from '../../../components/BlogPosts/Pagination';
import GetCurrentTimestamp from '../../../utils/get-time-stamp';
import BlogPosts from '../../../components/BlogPosts/BlogPosts';

interface BlogPostStories extends ISbStories {
  data: {
    cv: number;
    links: ISbStoryData[];
    rels: ISbStoryData[];
    stories: BlogPostStoryData[];
  };
  perPage: number;
  total: number;
  headers: any;
}

interface BlogOverviewPageProps {
  blogPosts: BlogPostStoryData[]; // Collection of all stories representing blog posts (all stories in the blog folder).
  blogPostsRelations: ISbStoryData[]; // Relations for those blog post stories.
  blogPostTotalCount: number; // Total number of blog posts.
  tags: IsbTags['data']['tags']; // Collection of all tags.
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

const POSTS_PER_PAGE = 15;

/**
 * Blog overview page.
 * Posts are still being rendered by [...slug].tsx.
 */
const BlogOverviewPage = (props: BlogOverviewPageProps) => {
  return (
    <>
      <Head>
        <title>{`Blog | fabiancdng.com`}</title>

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/blog/posts`}
        />

        <meta
          name="description"
          content={`Overview of my blog posts revolving around web and app development/programming.
                  I write tutorials, guides and overall issues and projects I work on.`}
        />

        <meta property="og:type" content="website" />

        <meta property="og:title" content={`Blog | fabiancdng.com`} />

        <meta
          property="og:description"
          content={`Overview of my blog posts revolving around web and app development/programming.
                  I write tutorials, guides and overall issues and projects I work on.`}
        />

        <meta property="twitter:card" content="summary" />

        <meta property="twitter:title" content={`Blog | fabiancdng.com`} />

        <meta
          property="twitter:description"
          content={`Overview of my blog posts revolving around web and app development/programming.
                  I write tutorials, guides and overall issues and projects I work on.`}
        />

        {props.pagination.totalPages > 1 && (
          <link
            rel="next"
            href={`${process.env.NEXT_PUBLIC_DOMAIN}/blog/posts/2`}
          />
        )}
      </Head>

      <Layout>
        <main>
          <div className="container pt-20 max-w-5-xl mx-auto px-10">
            <h1 className="text-5xl mt-16 font-semibold text-center sm:text-left">
              Blog
            </h1>
          </div>

          <BlogPosts
            blogPosts={props.blogPosts}
            blogPostsRelations={props.blogPostsRelations}
          />

          {props.pagination.totalPages > 1 && (
            <Pagination
              currentPage={props.pagination.currentPage}
              totalPages={props.pagination.totalPages}
            />
          )}
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const storyblokApi = getStoryblokApi();

  // Console log on the server-side for easy maintenance.
  if (process.env.NODE_ENV === 'production') {
    console.log(
      `[${GetCurrentTimestamp()}] getStaticProps() executing for /blog/posts...`
    );
  }

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

  const sbParams: ISbStoriesParams = {
    starts_with: 'blog/',
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    resolve_relations: 'author',
    excluding_fields: 'content', // Don't query content for all blog posts.
    excluding_slugs: 'blog/', // Don't query the blog overview page.
    per_page: POSTS_PER_PAGE,
    page: 1,
  };

  // Retrieve stories for all blog posts (without content).
  const { data: blogPosts }: BlogPostStories = await storyblokApi.get(
    `cdn/stories`,
    sbParams
  );

  if (blogPosts.stories.length === 0) {
    return {
      notFound: true,
      revalidate: 5 * 60, // revalidate every 5 minutes.
    };
  }

  return {
    props: {
      blogPosts: blogPosts.stories ? blogPosts.stories : false,
      blogPostsRelations: blogPosts.rels ? blogPosts.rels : false,
      pagination: {
        currentPage: sbParams['page'],
        totalPages: totalPages,
      },
    },
    revalidate: 30 * 60, // revalidate every 30 minutes.
  };
};

export default BlogOverviewPage;
