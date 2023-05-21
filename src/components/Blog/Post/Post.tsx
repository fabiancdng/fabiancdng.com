import { Post } from '@/types';
import Markdown from './Markdown';
import Thumbnail from './Thumbnail';
import Header from './Header';

import './Post.css';

const Post = ({ slug, post }: { slug: string; post: Post }) => {
  return (
    <article id="blog-post" className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
      {/* @ts-expect-error Server Component */}
      <Header post={post} metadata={post.metadata} excerpt={post.excerpt} />
      <Thumbnail title={post.metadata.title} slug={slug} />
      <div className="post-body max-w-3xl mx-auto">
        <Markdown slug={slug} content={post.content} />
      </div>
    </article>
  );
};

export default Post;
