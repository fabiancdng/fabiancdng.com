import GhostContentAPI, { PostOrPage } from "@tryghost/content-api";
import { GetStaticProps } from "next";
import Head from "next/head";
import { env } from "process";
import WebsiteAdapter from "../../adapters/website-adapter";
import StaticsData from "../../types/statics";

interface BlogProps {
  posts: PostOrPage[],
  statics: StaticsData,
}

const BlogPostCard = ({ post }: { post: PostOrPage }) => {
  return(
    <div className="p-4 bg-white dark:bg-slate-800 cursor-pointer rounded-lg border border-gray-200 dark:border-slate-600 shadow-md hover:bg-gray-50 hover:scale-[1.03] transition-all overflow-hidden">
      <h1 className="font-semibold text-2xl">{ post.title }</h1>
      <h2 className="font-medium my-4 text-lg">{ post.primary_author?.name }</h2>
      <img className="rounded-lg mb-5" src={ String(post.feature_image) } alt={ String(post.feature_image_alt) } />
      <div
        id="ghost-post"
        dangerouslySetInnerHTML={{ __html: String(post.excerpt) }}
      />
    </div>
  );
}

const Blog = ({ posts, statics }: BlogProps) => {
  return (
    <>
      <Head>
        <title>Blog | { statics.website.name }</title>
      </Head>
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 mx-4 sm:mx-0 gap-4 pb-20">
          {posts.map((post: PostOrPage, index: number) => (
            <BlogPostCard key={ index } post={ post } />
          ))}
        </div>
      </div>
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
      statics,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // seconds
  }
}

export default Blog;