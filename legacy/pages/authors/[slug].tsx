import {
  ISbStories,
  ISbStory,
  ISbStoryData,
  getStoryblokApi,
} from '@storyblok/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Misc/Layout';
import Head from 'next/head';
import { PostOrPageAuthor } from '../../types';
import Image from 'next/image';
import GetCurrentTimestamp from '../../utils/get-time-stamp';
import Link from 'next/link';
import SeoMetaTags from '../../components/Seo/SeoMetaTags';

interface AuthorPageProps {
  author: PostOrPageAuthor;
  posts: ISbStoryData[];
}

const AuthorPage = ({ author, posts }: AuthorPageProps) => {
  if (!author) return null;

  return (
    <>
      <Head>
        <title>{`${author.name} | Authors | fabiancdng.com`}</title>

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/${author.full_slug}`}
        />

        <meta property="og:type" content="website" />
      </Head>

      <SeoMetaTags story={author} />

      <Layout>
        <main className="mt-10">
          <article className="container pt-20 mx-auto px-20 lg:px-0 mb-20 max-w-5xl text-black dark:text-white">
            {/* Responsive section with the author's profile picture on the left and their name, bio and socials on the right */}
            <header className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
              {/* Profile picture */}
              {author.content.avatar && author.content.avatar.filename ? (
                <div className="flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={author.content.avatar.filename}
                    alt={author.content.avatar.alt}
                    width={200}
                    height={200}
                    sizes="(min-width: 1024px) 25vw
                      (min-width: 1280px) 35vw,
                      45vw"
                    priority
                    className="rounded-full"
                  />
                </div>
              ) : (
                // When there's no avatar, use Font Awesome's user icon in same size as fallback.
                <div className="flex-shrink-0 overflow-hidden rounded-full bg-slate-400 px-5 pt-2">
                  <i
                    className="fa fa-user text-slate-800"
                    style={{ fontSize: '200px' }}></i>
                </div>
              )}

              {/* Name, bio and socials */}
              <div className="flex flex-col items-center justify-center space-y-5 md:items-start">
                <h1 className="text-4xl font-bold text-center md:text-left">
                  {author.name}
                </h1>
                <p className="text-center md:text-left text-gray-600 dark:text-slate-400 text-lg">
                  {author.content.bio}
                </p>
                <div className="flex items-center space-x-4">
                  {/* Website link */}
                  {author.content.website && (
                    <a
                      className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                      href={author.content.website}
                      target="_blank">
                      <i className="fa-solid fa-globe mr-2 text-xl" />
                      <p className="mr-1">Website</p>
                    </a>
                  )}

                  {/* Twitter link */}
                  {author.content.twitterHandle && (
                    <a
                      className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                      href={`https://twitter.com/${author.content.twitterHandle}`}
                      target="_blank">
                      <i className="fa-brands fa-twitter mr-2 text-xl" />
                      <p className="mr-1">Twitter</p>
                    </a>
                  )}

                  {/* GitHub link */}
                  {author.content.githubUser && (
                    <a
                      className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                      href={`https://github.com/${author.content.githubUser}`}
                      target="_blank">
                      <i className="fa-brands fa-github mr-2 text-xl" />
                      <p className="mr-1">GitHub</p>
                    </a>
                  )}
                </div>
              </div>
            </header>
          </article>

          <div className="container mx-auto px-10">
            <hr className="w-full border-gray-300 dark:border-slate-600 my-10" />
          </div>

          {/* Author's latest blog posts */}
          <section className="container mx-auto flex flex-col items-center md:items-start px-10">
            <h2 className="text-4xl text-center md:text-start font-semibold mb-14">
              Latest posts by {author.name.split(' ')[0]}
            </h2>

            <div className="grid grid-cols-1 gap-x-20 gap-y-20 md:gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-center md:items-start justify-between space-y-5">
                  {/* The post's thumbnail */}
                  <div className="flex flex-col items-center md:items-start space-y-7">
                    {post.content.thumbnail.filename && (
                      <div className="overflow-hidden rounded-lg">
                        <Link href={`/blog/${post.slug}`}>
                          <Image
                            src={post.content.thumbnail.filename}
                            alt={post.content.thumbnail.alt}
                            width={600}
                            height={400}
                            sizes="(max-width: 1024px) 35vw
                                  (max-width: 768px) 25vw,
                                  90vw"
                            className="rounded-lg"
                          />
                        </Link>
                      </div>
                    )}

                    {/* The post's title */}

                    <h3 className="text-2xl text-center md:text-start font-semibold">
                      <Link href={`/blog/${post.slug}`}>{post.name}</Link>
                    </h3>

                    {/* The post's excerpt */}
                    <p className=" text-gray-600 dark:text-slate-400 text-center md:text-start text-lg">
                      {post.content.excerpt.split('.')[0]}.
                    </p>
                  </div>

                  <Link
                    className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                    href={`/blog/${post.slug}`}>
                    <p className="mr-1">Read the article</p>
                    <i className="fa-solid fa-arrow-right mr-2 text-xl" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get author from params.
  const authorSlug = params?.slug as string;

  // Console log on the server-side for easy maintenance.
  if (process.env.NODE_ENV === 'production') {
    console.log(
      `[${GetCurrentTimestamp()}] getStaticProps() executing for /blog/authors/${authorSlug} (/blog/authors/[slug])...`
    );
  }

  const storyblokApi = getStoryblokApi();

  // Get the author from Storyblok.
  try {
    const { data: author }: ISbStory = await storyblokApi.get(
      `cdn/stories/authors/${authorSlug}`,
      {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      }
    );

    // Get the author's latest blog posts.
    const { data: posts }: ISbStories = await storyblokApi.get(`cdn/stories`, {
      starts_with: 'blog/',
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      filter_query: {
        author: {
          in: author.story.uuid,
        },
      },
    });

    return {
      props: {
        author: author.story ? author.story : false,
        posts: posts.stories ? posts.stories : [],
      },
      revalidate: 30 * 60, // Revalidate every 30 minutes.
    };
  } catch (error) {
    // Console log on the server-side for easy maintenance.
    if (process.env.NODE_ENV === 'production') {
      console.log(
        `[${GetCurrentTimestamp()}] getStaticProps() resulted in 404 for /blog/authors/${authorSlug} (/blog/authors/[slug])...`
      );
    }

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
      `[${GetCurrentTimestamp()}] getStaticPaths() executing for /blog/authors/[slug]...`
    );
  }

  // Get all authors from Storyblok.
  const { data: authors }: ISbStories = await storyblokApi.get(`cdn/stories`, {
    starts_with: 'authors/',
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    page: 1,
    per_page: 50,
  });

  // Create an array of paths for each author.
  const paths = authors.stories.map((author) => ({
    params: { slug: author.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default AuthorPage;
