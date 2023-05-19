import { PostMetadata } from '@/types';
import './BlogPost.css';
import Markdown from './Markdown';

const BlogPost = ({ metadata, content }: { metadata: PostMetadata; content: string }) => {
  return (
    <article id="blog-post" className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
      <Markdown content={content} />
    </article>
  );
};

export default BlogPost;
