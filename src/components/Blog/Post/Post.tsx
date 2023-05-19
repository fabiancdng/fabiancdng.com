import { Post, PostMetadata } from '@/types';
import Markdown from './Markdown';
import Header from './Header';

import './Post.css';
import Thumbnail from './Thumbnail';

const Post = ({ slug, post }: { slug: string; post: Post }) => {
  return (
    <article id="blog-post" className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
      <Header metadata={post.metadata} excerpt={post.excerpt} />
      <Thumbnail slug={slug} />
      <div className="post-body max-w-3xl mx-auto">
        <Markdown content={post.content} />
      </div>
    </article>
  );
};

export default Post;
