import {
  storyblokEditable,
  SbBlokData,
  ISbRichtext,
  renderRichText,
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

const Post = ({ blok }: { blok: PostBlock }) => {
  useEffect(() => {
    // Initialize Highlight.js.
    hljs.highlightAll();
  }, []);

  return (
    <main className="text-center mt-4" {...storyblokEditable(blok)}>
      {/* Content */}
      <div className="mx-auto mt-5 sm:w-full w-4/5">
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
