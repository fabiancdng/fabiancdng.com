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
      shadow-md hover:bg-gray-50 hover:scale-[1.03] transition-all overflow-hidden mb-5 col-span-2 flex flex-row justify-between`}>
        <div className="w-7/12 flex flex-col justify-center align-middle">
          <img
            className="rounded-lg max-w-3xl"
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
              <p className="text-gray-600 text-md dark:text-slate-400">{ new Date(String(post.published_at)).toLocaleString('en-US', { dateStyle: "long" }) }</p>
            </div>
          </div>
          <div
            className="ghost-css"
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
      <div className={`py-4 px-9 bg-white dark:bg-slate-800 cursor-pointer rounded-lg border border-gray-200 dark:border-slate-600
      shadow-md hover:bg-gray-50 hover:scale-[1.03] transition-all overflow-hidden`}>
        <h1 className="font-semibold my-5 text-2xl">{ post.title }</h1>
        <div className="mx-auto max-w-2xl">
          <img
            className="rounded-lg mb-5s"
            src={ String(post.feature_image) }
            alt={ String(post.feature_image_alt) }
          />
        </div>
        <div
          className="ghost-css mt-3"
          id="ghost-excerpt"
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
            <p className="text-gray-600 text-md dark:text-slate-400">{ new Date(String(post.published_at)).toLocaleString('en-US', { dateStyle: "long" }) }</p>
          </div>
        </div>
      </div>
    </Link>
  );
}


const BlogPosts = ({ posts }: { posts: PostOrPage[] }) => {
  const [mobileView, setMobileView] = useState<boolean|null>(null);

  useEffect(() => {
    /**
     * Breakpoint (in px) for mobile view.
     */
    const mobileBreakpoint = 1024;

    const handleResize = () => {
        // Update screenWidth state on resize.
        const screenWidth = window.innerWidth;
        // Auto-toggle mobile view.
        if (screenWidth !== null && screenWidth < mobileBreakpoint) setMobileView(true);
        else setMobileView(false);
    };

    // Event listener for keeping screenWidth up-to-date.
    window.addEventListener('resize', handleResize);
    handleResize();
  }, []);

  // Render component only when state was initialized.
  if (mobileView === null) return null;

  return (
    <div className="container mt-32 mx-auto px-7">
      <h1 className="text-5xl my-10 font-semibold">Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 sm:mx-0 gap-4 pb-20">
        { posts.map((post: PostOrPage, index: number) => (
          index === 0
          ? mobileView ? <BlogPostCardSmall key={ index } index={ index } post={ post } /> : <BlogPostCardFull key={ index } index={ index } post={ post } />
          : <BlogPostCardSmall key={ index } index={ index } post={ post } />
        )) }
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
        <link
          rel="icon"
          href={ statics.STRAPI_URL + statics.website.favicon.data.attributes.url }
          type={ statics.website.favicon.data.attributes.mime }
        />
        <meta name="description" content={ statics.website.metaDescription } />
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
    version: 'v4',
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
    revalidate: 1800, // seconds
  }
}

export default Blog;