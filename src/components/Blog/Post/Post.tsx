import { Post } from '@/types';
import Markdown from '../../Markdown/Markdown';
import Thumbnail from './Thumbnail';
import Header from './Header';
import PostShare from './PostShare';

const Post = ({ post }: { post: Post }) => {
  return (
    <>
      <article id="blog-post" className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
        {/* @ts-expect-error Server Component */}
        <Header post={post} metadata={post.metadata} excerpt={post.excerpt} />
        <Thumbnail title={post.metadata.title} slug={post.slug} priority={true} />
        <div className="post-body max-w-3xl mx-auto">
          <Markdown slug={post.slug} content={post.content} />
        </div>
      </article>

      <PostShare text={post.metadata.title} link={`${process.env.NEXT_PUBLIC_DOMAIN}/blog/${post.slug}`} />
    </>
  );
};

export default Post;
