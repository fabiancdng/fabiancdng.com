import { Post } from '@/types';
import Markdown from '../../Markdown/Markdown';
import Thumbnail from './Thumbnail';
import Header from './Header';

const Post = ({ post }: { post: Post }) => {
  return (
    <article id="blog-post" className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
      {/* @ts-expect-error Server Component */}
      <Header post={post} metadata={post.metadata} excerpt={post.excerpt} />
      <Thumbnail title={post.metadata.title} slug={post.slug} />
      <div className="post-body max-w-3xl mx-auto">
        <Markdown slug={post.slug} content={post.content} />
      </div>
    </article>
  );
};

export default Post;
