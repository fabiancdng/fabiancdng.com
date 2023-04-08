import { ISbStories, ISbStoryData, getStoryblokApi } from '@storyblok/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../../components/Core/Layout';
import Head from 'next/head';
import GetCurrentTimestamp from '../../../utils/get-time-stamp';
import { BlogPostStoryData, IsbTags, Tag } from '../../../types';
import BlogPosts from '../../../components/BlogPosts/BlogPosts';

interface TagPageProps {
  tag: Tag;
  posts: BlogPostStoryData[];
  rels: ISbStoryData[];
}

const TagPage = ({ tag, posts, rels }: TagPageProps) => {
  if (!tag) return null;

  return (
    <>
      <Head>
        <title>{`${tag.name} | Tags | fabiancdng.com`}</title>

        <meta
          name="description"
          content={`All blog posts tagged with ${tag.name} on fabiancdng.com.`}
        />

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/blog/tags/${tag.name}`}
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:title"
          content={`${tag.name} | Tags | fabiancdng.com`}
        />

        <meta
          property="og:description"
          content={`All blog posts tagged with ${tag.name} on fabiancdng.com.`}
        />

        <meta property="twitter:card" content="summary" />

        <meta
          property="twitter:title"
          content={`${tag.name} | Tags | fabiancdng.com`}
        />

        <meta
          property="twitter:description"
          content={`All blog posts tagged with ${tag.name} on fabiancdng.com.`}
        />
      </Head>

      <Layout>
        <main className="mt-36 container mx-auto flex flex-col items-center md:items-start px-10 pb-20">
          <h1 className="text-5xl text-center md:text-start font-semibold">
            {tag.name}
          </h1>

          <h2 className="text-2xl lg:text-3xl text-center lg:text-left text-gray-500 dark:text-slate-400 mt-5">
            {tag.taggings_count} post{tag.taggings_count > 1 && 's'} tagged with{' '}
            {tag.name}
          </h2>

          {/* Posts for this tag */}
          <BlogPosts blogPosts={posts} blogPostsRelations={rels} />
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const storyblokApi = getStoryblokApi();

  // Console log on the server-side for easy maintenance.
  if (process.env.NODE_ENV === 'production') {
    console.log(
      `[${GetCurrentTimestamp()}] getStaticProps() executing for /blog/tags/[tag]...`
    );
  }

  // Get tag from params.
  const tagName = params?.tag as string;

  // Retrieve tag from Storyblok by name.
  try {
    const { data: tags }: IsbTags = await storyblokApi.get(`cdn/tags`, {
      starts_with: 'blog/',
    });

    const tag = tags.tags.find((tag: Tag) => tag.name === tagName);

    if (!tag) {
      throw new Error('Tag not found.');
    }

    // Get all posts with the given tag.
    try {
      const { data: posts }: ISbStories = await storyblokApi.get(
        `cdn/stories`,
        {
          starts_with: 'blog/',
          with_tag: tagName,
          resolve_relations: 'author',
          excluding_slugs: 'blog,blog/',
        }
      );

      return {
        props: {
          tag: tag,
          posts: posts.stories ? posts.stories : [],
          rels: posts.rels ? posts.rels : [],
        },
        revalidate: 30 * 60, // Revalidate every 30 minutes.
      };
    } catch (error) {
      return {
        notFound: true,
        revalidate: 5 * 60, // Revalidate every 5 minutes.
      };
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 5 * 60, // Revalidate every 5 minutes.
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const storyblokApi = getStoryblokApi();

  // Console log on the server-side for easy maintenance.
  if (process.env.NODE_ENV === 'production') {
    console.log(
      `[${GetCurrentTimestamp()}] getStaticPaths() executing for /blog/tags/[tag]...`
    );
  }

  // Get all tags from Storyblok.
  const { data }: IsbTags = await storyblokApi.get(`cdn/tags`, {
    starts_with: 'blog/',
  });

  // Create an array of paths for each author.
  const paths = data.tags.map((tag) => ({
    params: { tag: `/blog/tags/${tag.name}` },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default TagPage;
