import {
  storyblokEditable,
  SbBlokData,
  ISbRichtext,
  renderRichText,
  ISbStoryData,
} from '@storyblok/react';
import hljs from 'highlight.js';
import Image from 'next/image';
import { useEffect } from 'react';
import { ImageAsset, PageOrPostAuthor } from '../../types';
import Head from 'next/head';

/**
 * Data for the Post Content Type from Storyblok.
 */
interface PostBlock extends SbBlokData {
  _uid: string;
  title: string;
  author: string;
  thumbnail?: ImageAsset;
  content: ISbRichtext;
  excerpt: string;
  component: string;
  _editable: string;
}

interface PostProps {
  blok: PostBlock;
  story: ISbStoryData;
  relations: any;
}

const Post = ({ blok, story, relations }: PostProps) => {
  useEffect(() => {
    // Initialize Highlight.js.
    hljs.highlightAll();
  }, []);

  // Filter through the array of relations to find the author object with the matching UUID.
  const author: PageOrPostAuthor = relations.find(
    (relation: any) => relation.uuid === story.content.author
  );

  return (
    <>
      <Head>
        {/* Add article: meta tags */}
        <meta property="og:type" content="article" />

        {/* article:published_time */}
        {story.first_published_at && (
          <meta
            property="article:published_time"
            content={story.first_published_at}
          />
        )}

        {/* article:modified_time */}
        {story.published_at && (
          <meta property="article:modified_time" content={story.published_at} />
        )}

        {/* article:tag */}
        {story.tag_list &&
          story.tag_list.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
      </Head>
      <main {...storyblokEditable(blok)}>
        {/* Content */}
        <article className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
          {/* Header containing headline, excerpt and other introductory metadata */}
          <header>
            {/* Post tags */}
            {story.tag_list && (
              <div className="mb-5">
                {story.tag_list.map((tag, index) => (
                  <div key={index} className="mb-5">
                    <p className="text-blue-800 pl-1 font-semibold text-lg dark:text-slate-400">
                      {tag.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Post title */}
            {story.name && (
              <h1 className="text-5xl font-semibold">{story.name}</h1>
            )}

            {/* Post excerpt */}
            {blok.excerpt && (
              <p className="my-7 text-xl text-gray-500 dark:text-gray-300">
                {blok.excerpt}
              </p>
            )}

            {/* Post author */}
            <div className="flex items-center my-8">
              <Image
                className="w-12 h-12 -translate-y-0.5 mr-2 rounded-full"
                width={50}
                height={50}
                priority
                src={author.content.avatar?.filename || ''}
                alt={author.name + "'s profile picture"}
              />
              <div>
                <h3 className="text-lg font-medium leading-3 mb-1">
                  {author.name}
                </h3>
                <p className="text-gray-600 text-md dark:text-slate-400">
                  {story.first_published_at &&
                    new Date(story.first_published_at).toLocaleString('en-US', {
                      dateStyle: 'long',
                    })}
                </p>
              </div>
            </div>
          </header>

          {/* Post thumbnail */}
          {blok.thumbnail && (
            <div className="w-full h-full relative">
              <Image
                className="w-full my-16 rounded-lg"
                width={871}
                height={489}
                priority
                src={blok.thumbnail.filename}
                alt={blok.thumbnail.alt}
              />
            </div>
          )}

          {/* Post content */}
          {blok.content && (
            <div
              id="storyblok-post"
              className="page-or-post-css max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{
                // Render the markdown content as HTML.
                __html: renderRichText(blok.content),
              }}
            />
          )}
        </article>
      </main>
    </>
  );
};

export default Post;
