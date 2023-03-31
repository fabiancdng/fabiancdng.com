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

/**
 * Data for the Post Content Type from Storyblok.
 */
interface PostBlock extends SbBlokData {
  _uid: string;
  date: string;
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
    <main {...storyblokEditable(blok)}>
      {/* Content */}
      <div className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
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
        {story.name && <h1 className="text-5xl font-semibold">{story.name}</h1>}

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
              {story.content.date &&
                new Date(story.content.date).toLocaleString('en-US', {
                  dateStyle: 'long',
                })}
            </p>
          </div>
        </div>

        {/* Post thumbnail */}
        {blok.thumbnail && (
          <div className="w-full h-full relative">
            <Image
              className="w-full my-5 rounded-lg"
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
            className="page-or-post-css"
            dangerouslySetInnerHTML={{
              // Render the markdown content as HTML.
              __html: renderRichText(blok.content),
            }}
          />
        )}
      </div>
    </main>
  );
};

export default Post;
