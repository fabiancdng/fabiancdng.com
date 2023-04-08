import { ISbStoryData } from '@storyblok/react';
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
 * Renders collection of blog posts (no content, only basic info and link).
 */
const BlogPosts = ({ blogPosts, blogPostsRelations }: BlogPostsProps) => {
  return (
    <div className="container pt-14 pb-10 max-w-5-xl mx-auto px-10">
      {/* Card for each blog post */}
      {blogPosts.map((blogPost: BlogPostStoryData, index) => (
        <BlogPost key={index} story={blogPost} relations={blogPostsRelations} />
      ))}
    </div>
  );
};

export default BlogPosts;
