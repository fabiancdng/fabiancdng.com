import {
  ISbStories,
  ISbStoriesParams,
  ISbStory,
  ISbStoryData,
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../../components/Core/Layout';
import { BlogPostStoryData, IsbTags } from '../../types';
import Pagination from '../../components/Blog/Pagination';
import GetCurrentTimestamp from '../../utils/get-time-stamp';
import SeoMetaTags from '../../components/Seo/SeoMetaTags';
import { PageStoryData } from '../../types';
import { PostOrPageAuthor } from '../../types';

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

interface BlogHomePageProps {
  story: PageStoryData;
  blogPosts: BlogPostStoryData[]; // Collection of all stories representing blog posts (all stories in the blog folder).
  blogPostsRelations: ISbStoryData[]; // Relations for those blog post stories.
  blogPostTotalCount: number; // Total number of blog posts.
  tags: IsbTags['data']['tags']; // Collection of all tags.
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

const POSTS_PER_PAGE = process.env.POSTS_PER_PAGE
  ? parseInt(process.env.POSTS_PER_PAGE)
  : 15;

/**
 * Blog home page.
 * Posts are still being rendered by [...slug].tsx.
 */
const BlogHomePage = (props: BlogHomePageProps) => {
  // Run story object through the useStoryblokState hook.
  const story = useStoryblokState(props.story);

  return (
    <>
      <Head>
        <title>{`Blog | fabiancdng.com`}</title>

        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/blog`} />

        {props.pagination.totalPages > 1 && (
          <link
            rel="next"
            href={`${process.env.NEXT_PUBLIC_DOMAIN}/blog/posts/2`}
          />
        )}
      </Head>

      <SeoMetaTags story={story} />

      <Layout>
        <main>
          <StoryblokComponent
            blok={story.content}
            story={story}
            relations={{}}
            key={story.content._uid}
            payload={{
              blogPosts: props.blogPosts,
              blogPostsRelations: props.blogPostsRelations,
              tags: props.tags,
              currentTopic: '',
            }}
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
      `[${GetCurrentTimestamp()}] getStaticProps() executing for /blog...`
    );
  }

  // Get the blog overview page story from Storyblok.
  try {
    const { data: story }: ISbStory = await storyblokApi.get(
      `cdn/stories/blog`,
      {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      }
    );

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

    // Retrieve all tags from Storyblok.
    const { data: tags }: IsbTags = await storyblokApi.get(`cdn/tags`, {
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    });

    return {
      props: {
        story: story.story ? story.story : false,
        blogPosts: blogPosts.stories ? blogPosts.stories : false,
        blogPostsRelations: blogPosts.rels ? blogPosts.rels : false,
        tags: tags.tags ? tags.tags : false,
        pagination: {
          currentPage: sbParams['page'],
          totalPages: totalPages,
        },
      },
      revalidate: 30 * 60, // revalidate every 30 minutes.
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
      revalidate: 5 * 60, // Revalidate every 5 minutes.
    };
  }
};

export default BlogHomePage;
