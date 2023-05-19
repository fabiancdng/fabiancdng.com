import { PostMetadata } from '@/types';
import Markdown from './Markdown';
import Header from './Header';

import './Post.css';

const Post = ({ metadata, content }: { metadata: PostMetadata; content: string }) => {
  return (
    <article id="blog-post" className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
      <Header />
      <div className="post-body max-w-3xl mx-auto">
        <Markdown content={content} />
      </div>
    </article>
  );
};

export default Post;
