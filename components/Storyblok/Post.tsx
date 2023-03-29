import {
  storyblokEditable,
  SbBlokData,
  ISbRichtext,
  renderRichText,
  ISbStoryData,
} from '@storyblok/react';
import hljs from 'highlight.js';
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
  author: PageOrPostAuthor;
}

const Post = ({ blok, story, author }: PostProps) => {
  useEffect(() => {
    // Initialize Highlight.js.
    hljs.highlightAll();
  }, []);

  return (
    <main {...storyblokEditable(blok)}>
      {/* Content */}
      <div className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
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
          <img
            className="w-12 h-12 -translate-y-0.5 mr-2 rounded-full"
            src={author.content.avatar?.filename}
            alt={author.name + "'s profile picture"}
          />
          <div>
            <h3 className="text-lg font-medium leading-3 mb-1">
              {author.name}
            </h3>
            <p className="text-gray-600 text-md dark:text-slate-400">
              {story.published_at &&
                new Date(story.published_at).toLocaleString('en-US', {
                  dateStyle: 'long',
                })}
            </p>
          </div>
        </div>

        {/* Post thumbnail */}
        {blok.thumbnail && (
          <img
            className="w-full my-5 rounded-lg"
            src={blok.thumbnail.filename}
            alt={blok.thumbnail.alt}
          />
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
