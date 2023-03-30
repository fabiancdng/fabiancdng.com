import { SbBlokData } from '@storyblok/react';
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
  relations: any;
  subStories: BlogPostStoryData[]; // Stores all stories but the currently rendered one in the same folder.
}

/**
 * Renders collection of blog posts (no content, only basic info and link).
 */
const BlogPosts = ({ blok, relations, subStories }: BlogPostsProps) => {
  return (
    <div className="container pt-20 pb-10 max-w-5-xl mx-auto px-10 text-black dark:text-white">
      <h1 className="text-5xl my-10 font-semibold">{blok.title}</h1>
      {/* Card for each blog post */}
      {subStories.map((subStory, index) => (
        <BlogPost
          key={index}
          story={subStory} // subStory = The blog post to render (without the content).
          relations={relations}
        />
      ))}
    </div>
  );
};

export default BlogPosts;
