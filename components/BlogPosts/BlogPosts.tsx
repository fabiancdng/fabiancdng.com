import { SbBlokData } from '@storyblok/react';
import { BlogPostStoryData } from '../../types';

/**
 * Data for Blog Posts Block Type from Storyblok.
 */
interface HeroSectionBlock extends SbBlokData {
  title: string;
  subtitle: string;
}

interface BlogPostProps {
  blok: HeroSectionBlock;
  subStories: BlogPostStoryData[]; // Stores all stories but the currently rendered one in the same folder.
}

/**
 * Renders a single blog post in the collection (no content, only basic info and link).
 */
const BlogPost = ({ story }: { story: BlogPostStoryData }) => {
  return (
    <div>
      <h2 className="text-3xl my-5 font-semibold">{story.name}</h2>
      <p className="text-lg my-5">{story.content.excerpt}</p>
    </div>
  );
};

/**
 * Renders collection of blog posts (no content, only basic info and link).
 */
const BlogPosts = ({ blok, subStories }: BlogPostProps) => {
  return (
    <div>
      <h1 className="text-5xl my-10 font-semibold">{blok.title}</h1>
      {/* Card for each blog post */}
      {subStories.map((subStory, index) => (
        <BlogPost
          key={index}
          story={subStory} // subStory = The blog post to render (without the content).
        />
      ))}
    </div>
  );
};

export default BlogPosts;
