import {
  storyblokEditable,
  SbBlokData,
  ISbRichtext,
  renderRichText,
  ISbStoryData,
} from '@storyblok/react';
import hljs from 'highlight.js';
import { useEffect } from 'react';

/**
 * Data for the Post Content Type from Storyblok.
 */
interface PostBlock extends SbBlokData {
  _uid: string;
  date: string;
  title: string;
  author: string;
  content: ISbRichtext;
  excerpt: string;
  component: string;
  _editable: string;
}

const Post = ({ blok, story }: { blok: PostBlock; story: ISbStoryData }) => {
  useEffect(() => {
    // Initialize Highlight.js.
    hljs.highlightAll();
  }, []);

  return (
    <main
      id="storyblok-post"
      className="page-or-post-css"
      {...storyblokEditable(blok)}>
      {/* Content */}
      <div className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
        <h1 className="text-5xl font-semibold">{story.name}</h1>
        <div
          className="text-xl leading-10 text-center sm:text-left"
          dangerouslySetInnerHTML={{
            // Render the markdown content as HTML.
            __html: renderRichText(blok.content),
          }}
        />
      </div>
    </main>
  );
};

export default Post;
