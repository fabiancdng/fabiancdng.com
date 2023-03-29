import GhostContentAPI, { PostOrPage, Tag } from '@tryghost/content-api';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { env } from 'process';
import Layout from '../../../components/Misc/Layout';

const BlogPostCard = ({ post, index }: { post: PostOrPage; index: number }) => {
  return (
    <Link href={'/blog/' + post.slug}>
      <div
        className={`py-4 px-9 bg-white dark:bg-slate-800 cursor-pointer rounded-lg border border-gray-200 dark:border-slate-600
      shadow-md hover:bg-gray-50 hover:scale-[1.03] transition-all overflow-hidden`}>
        <h1 className="font-semibold my-5 text-2xl">{post.title}</h1>
        <div className="mx-auto max-w-2xl">
          <img
            className="rounded-lg mb-5s"
            src={String(post.feature_image)}
            alt={String(post.feature_image_alt)}
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
            src={String(post.primary_author?.profile_image)}
            alt={post.primary_author?.name + "'s profile picture"}
          />
          <div>
            <h3 className="text-lg font-medium leading-3">
              {post.primary_author?.name}
            </h3>
            <p className="text-gray-600 text-md dark:text-slate-400">
              {new Date(String(post.published_at)).toLocaleString('en-US', {
                dateStyle: 'long',
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const BlogPosts = ({ posts, tag }: { posts: PostOrPage[]; tag: Tag }) => {
  return (
    <div className="container mt-32 mx-auto px-7">
      <h1 className="text-5xl my-10 font-semibold">{tag.name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 sm:mx-0 gap-4 pb-20">
        {posts.map((post: PostOrPage, index: number) => (
          <BlogPostCard key={index} index={index} post={post} />
        ))}
      </div>
    </div>
  );
};

interface blogProps {
  posts: PostOrPage[];
  tag: Tag;
}

const BlogTag = ({ posts, tag }: blogProps) => {
  return (
    <>
      <Head>
        <title>{`${tag.name} | Blog | fabiancdng.com`}</title>
      </Head>

      <Layout>
        <BlogPosts posts={posts} tag={tag} />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  /**
   * The list of available paths to return.
   */
  const paths: string[] = [];

  const { GHOST_URL, GHOST_CONTENT_API_KEY } = env;

  // Initialize GhostContentAPI.
  const ghost = new GhostContentAPI({
    url: String(GHOST_URL),
    key: String(GHOST_CONTENT_API_KEY),
    version: 'v5.0',
  });

  // Get list of all posts from Ghost.
  const tags = await ghost.tags.browse({ limit: 'all' });

  // Go through each post and add its slug to the list of available paths.
  tags.forEach((tag: Tag) => {
    const tagSlug = '/blog/tag/' + tag.slug;
    paths.push(tagSlug);
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  /**
   * The slug of this tag.
   */
  const tagSlug = String(context.params?.slug);

  const { GHOST_URL, GHOST_CONTENT_API_KEY } = env;

  // Initialize GhostContentAPI.
  const ghost = new GhostContentAPI({
    url: String(GHOST_URL),
    key: String(GHOST_CONTENT_API_KEY),
    version: 'v5.0',
  });

  const tag = await ghost.tags.read({ slug: tagSlug });

  // Get list of all posts from Ghost matching the tag.
  const posts = await ghost.posts.browse({
    filter: 'tag:' + tagSlug,
    include: ['authors', 'tags'],
  });

  return {
    props: {
      posts,
      tag: tag,
    },
    revalidate: 1800, // seconds
  };
};

export default BlogTag;
