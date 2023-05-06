import { ISbStoryData, SbBlokData, storyblokEditable } from '@storyblok/react';
import { BlogPostStoryData } from '../../types';
import BlogPost from './BlogPost';

/**
 * Props for the collection component.
 */
interface BlogPostsProps {
  blogPosts: BlogPostStoryData[];
  blogPostsRelations: ISbStoryData[];
}

/**
 * Data for the Blog Posts block type from Storyblok.
 */
interface BlogPostsBlock extends SbBlokData {}

/**
 * Renders collection of blog posts as a Storyblok block type.
 */
export const SbBlogPosts = ({
  blok,
  payload,
}: {
  blok: BlogPostsBlock;
  payload: any;
}) => {
  return (
    <div
      className="container pt-20 max-w-5-xl mx-auto px-10 md:px-24 lg:px-10"
      {...storyblokEditable(blok)}>
      {/* Card for each blog post */}
      {payload.blogPosts.map((blogPost: BlogPostStoryData, index: number) => (
        <BlogPost
          key={index}
          story={blogPost}
          relations={payload.blogPostsRelations}
        />
      ))}
    </div>
  );
};

/**
 * Renders collection of blog posts (no content, only basic info and link).
 */
const BlogPosts = ({ blogPosts, blogPostsRelations }: BlogPostsProps) => {
  return (
    <div className="container pt-20 max-w-5-xl mx-auto px-10 md:px-24 lg:px-10">
      {/* Card for each blog post */}
      {blogPosts.map((blogPost: BlogPostStoryData, index) => (
        <BlogPost key={index} story={blogPost} relations={blogPostsRelations} />
      ))}
    </div>
  );
};

export default BlogPosts;
