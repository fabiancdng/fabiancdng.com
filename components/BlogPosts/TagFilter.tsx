import { SbBlokData } from '@storyblok/react';
import TagFilterTag from './TagFilterTag';
import { Tag } from '../../types';

/**
 * Data for Blog Tag Filter Block Type from Storyblok.
 */
interface TagFilter extends SbBlokData {
  title: string;
  additionalStyles: string;
}

const TagFilter = ({ tags }: { tags: Tag[] }) => {
  // Shorten tags to 10.
  tags = tags.slice(0, 10);

  return (
    <div className="container mx-auto px-10 py-10 w-full dark:bg-slate-800 bg-slate-100 rounded">
      {/* Title */}
      <h2 className="text-gray-800 dark:text-slate-100 text-4xl font-semibold pt-5 text-center sm:text-left mx-4 sm:mx-0">
        Topics
      </h2>

      <h3 className="text-gray-800 dark:text-slate-200 text-xl mt-3 text-center sm:text-left mx-4 sm:mx-0">
        Browse a specific topic.
      </h3>

      {/* Tags */}
      <div className="mx-auto sm:w-full w-4/5 mt-4">
        <div className="flex sm:justify-start justify-center flex-wrap">
          {tags.map((tag, index) => (
            <TagFilterTag
              key={index}
              tagName={tag.name}
              postCount={tag.taggings_count}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagFilter;
