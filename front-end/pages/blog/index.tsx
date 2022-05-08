import GhostContentAPI, { PostOrPage } from "@tryghost/content-api";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { env } from "process";
import { useEffect, useState } from "react";
import PageAdapter from "../../adapters/page-adapter";
import WebsiteAdapter from "../../adapters/website-adapter";
import StaticsData from "../../types/statics";
import { BlogTemplate } from "../../types/templates";
import { renderComponent } from "../../utils/dynamic-component";

const BlogPostCardFull = ({ post, index }: { post: PostOrPage, index: number }) => {
  return(
    <Link href={ '/blog/' + post.slug }>
      <div className={`p-4 bg-white dark:bg-slate-800 cursor-pointer rounded-lg border border-gray-200 dark:border-slate-600
      shadow-md hover:bg-gray-50 hover:scale-[1.03] transition-all overflow-hidden col-span-2 flex flex-row justify-between`}>
        <div className="w-7/12 flex flex-col justify-center align-middle">
          <img
            className="rounded-lg mb-5"
            src={ String(post.feature_image) }
            alt={ String(post.feature_image_alt) }
          />
        </div>
        <div className="w-5/12 px-8">
          <h1 className="font-semibold my-5 text-3xl">{ post.title }</h1>
          <div className="flex items-center my-5">
            <img
              className="w-12 h-12 -translate-y-0.5 mr-2 rounded-full"
              src={ String(post.primary_author?.profile_image) }
              alt={ post.primary_author?.name + '\'s profile picture' }
            />
            <div>
              <h3 className="text-lg font-medium leading-3">{ post.primary_author?.name }</h3>
              <p className="text-gray-600 text-md dark:text-slate-400">{ new Date(post.published_at).toLocaleString('en-US', { dateStyle: "long" }) }</p>
            </div>
          </div>
          <div
            id="ghost-excerpt"
            dangerouslySetInnerHTML={{ __html: String(post.excerpt) }}
          />
        </div>
      </div>
    </Link>
  );
}

const BlogPostCardSmall = ({ post, index }: { post: PostOrPage, index: number }) => {
  return(
    <Link href={ '/blog/' + post.slug }>
      <div className={`p-4 bg-white dark:bg-slate-800 cursor-pointer rounded-lg border border-gray-200 dark:border-slate-600
      shadow-md hover:bg-gray-50 hover:scale-[1.03] transition-all overflow-hidden`}>
        <h1 className="font-semibold my-5 text-2xl">{ post.title }</h1>
        <img
          className="rounded-lg mb-5"
          src={ String(post.feature_image) }
          alt={ String(post.feature_image_alt) }
        />
        <div
          id="ghost-post"
          dangerouslySetInnerHTML={{ __html: String(post.excerpt) }}
        />
        <div className="flex items-center my-5">
          <img
            className="w-12 h-12 -translate-y-0.5 mr-2 rounded-full"
            src={ String(post.primary_author?.profile_image) }
            alt={ post.primary_author?.name + '\'s profile picture' }
          />
          <div>
            <h3 className="text-lg font-medium leading-3">{ post.primary_author?.name }</h3>
            <p className="text-gray-600 text-md dark:text-slate-400">{ new Date(post.published_at).toLocaleString('en-US', { dateStyle: "long" }) }</p>
          </div>
        </div>
      </div>
    </Link>
  );
}


const BlogPosts = ({ posts }: { posts: PostOrPage[] }) => {
  return (
    <div className="container mt-32 mx-auto">
      <h1 className="text-5xl my-10 font-medium">Blog</h1>
      <div className="grid sm:grid-cols-2 mx-4 sm:mx-0 gap-4 pb-20">
        {posts.map((post: PostOrPage, index: number) => (
          index === 0
          ? <BlogPostCardFull key={ index } index={ index } post={ post } />
          : <BlogPostCardSmall key={ index } index={ index } post={ post } />
        ))}
      </div>
    </div>
  );
}

interface BlogProps {
  posts: PostOrPage[],
  template: BlogTemplate,
  statics: StaticsData,
}

const Blog = ({ posts, template, statics }: BlogProps) => {
  const [contentComponents, setContentComponents] = useState<any>([]);

  useEffect(() => {
    setContentComponents(template.content);
  }, []);

  return (
    <>
      <Head>
        <title>Blog | { statics.website.name }</title>
      </Head>
      {
        contentComponents.map((component: any, index: number) => (
            component['__component'] === 'adapters.ghost-posts' ? <BlogPosts key={ index } posts={ posts } /> : renderComponent(component, index, statics)
        ))
      }

    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    GHOST_URL,
    GHOST_CONTENT_API_KEY,
    STRAPI_URL,
    STRAPI_ACCESS_TOKEN,
  } = env;

  // Get website metadata from Strapi.
  const websiteAdapter = new WebsiteAdapter(STRAPI_URL, STRAPI_ACCESS_TOKEN);
  const websiteMetaData = await websiteAdapter.getWebsiteMetaData();

  // Get the template for the blog page from Strapi.
  const pageAdapter = new PageAdapter(STRAPI_URL, STRAPI_ACCESS_TOKEN);
  const blogTemplate = await pageAdapter.getBlogTemplate();

  // Initialize GhostContentAPI.
  const ghost = new GhostContentAPI({
    url: String(GHOST_URL),
    key: String(GHOST_CONTENT_API_KEY),
    version: 'v3',
  });

  // Get list of all posts from Ghost.
  // TODO: Don't get full post, only list of slugs is necessary.
  const posts = await ghost.posts.browse({
    include: 'authors',
  });

  const statics: StaticsData = {
    STRAPI_URL: String(STRAPI_URL),
    website: websiteMetaData,
  }

  return {
    props: {
      posts,
      template: blogTemplate,
      statics,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // seconds
  }
}

export default Blog;