import { ISbStoryData, SbBlokData, storyblokEditable } from '@storyblok/react';
import { BlogPostStoryData } from '../../types';
import BlogPost from './BlogPost';

interface BlogPostsBlock extends SbBlokData {
  title: string;
}

/**
 * Props for the collection component.
 */
interface BlogPostsProps {
  blok: BlogPostsBlock;
  // Payload passed from page contains stories for all blog posts without their content field.
  payload: {
    blogPosts: BlogPostStoryData[];
    blogPostsRelations: ISbStoryData[];
  };
}

/**
 * Renders collection of blog posts (no content, only basic info and link).
 */
const BlogPosts = ({ blok, payload }: BlogPostsProps) => {
  return (
    <div
      className="container pt-20 pb-10 max-w-5-xl mx-auto px-10 text-black dark:text-white"
      {...storyblokEditable(blok)}>
      <h1 className="text-5xl my-10 font-semibold">{blok.title}</h1>
      {/* Card for each blog post */}
      {payload.blogPosts.map((blogPost: BlogPostStoryData, index) => (
        <BlogPost
          key={index}
          story={blogPost}
          relations={payload.blogPostsRelations}
        />
      ))}
    </div>
  );
};

export default BlogPosts;
