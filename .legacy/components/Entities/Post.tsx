import {
  storyblokEditable,
  SbBlokData,
  ISbRichtext,
  ISbStoryData,
} from '@storyblok/react';
import hljs from 'highlight.js';
import Image from 'next/image';
import { useEffect } from 'react';
import { ImageAsset, PostOrPageAuthor } from '../../types';
import Head from 'next/head';
import PostShare from '../Blog/Post/PostShare';
import PostContent from '../Blog/Post/PostContent';
import PostHeader from '../Blog/Post/PostHeader';

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
  const author: PostOrPageAuthor = relations.find(
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
          {/* Header for tags, headline, excerpt, author)*/}
          <PostHeader story={story} excerpt={blok.excerpt} author={author} />

          {/* Post thumbnail */}
          {blok.thumbnail && (
            <div className="w-full px-0 sm:px-7 h-full">
              <Image
                className="lg:w-11/12 w-full mx-auto my-16 rounded-lg"
                width={871}
                height={489}
                priority
                src={blok.thumbnail.filename}
                alt={blok.thumbnail.alt}
              />
            </div>
          )}

          {/* Post content */}
          {blok.content && <PostContent content={blok.content} />}

          {/* Share section */}
          <PostShare
            link={`${process.env.NEXT_PUBLIC_DOMAIN}/${story.full_slug}`}
            text={story.name}
          />
        </article>
      </main>
    </>
  );
};

export default Post;
