import { SbBlokData } from '@storyblok/react';
import { Tag } from '../../types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Data for Blog Tag Filter Block Type from Storyblok.
 */
interface TagFilter extends SbBlokData {
  title: string;
  additionalStyles: string;
}

const TagFilter = ({
  tags,
  currentTopic,
}: {
  tags: Tag[];
  currentTopic: string;
}) => {
  // Filter out the current topic.
  tags = tags.filter((tag) => tag.name !== currentTopic);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest('[data-dropdown-toggle="tagFilterDropdown"]')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="container mx-auto px-10 py-10 w-full dark:bg-slate-800 bg-slate-100 rounded">
      {/* Title */}
      <h2 className="text-gray-800 dark:text-slate-100 text-3xl font-semibold text-center sm:text-left mx-4 sm:mx-0">
        Topics
      </h2>

      <h3 className="text-gray-800 dark:text-slate-200 text-lg mt-3 text-center sm:text-left mx-4 sm:mx-0">
        Browse a specific topic.
      </h3>

      {/* Tags */}
      <div className="relative inline-block w-full">
        <button
          className="text-slate-700 dark:text-slate-100 dark:hover:bg-slate-500 text-lg w-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 font-medium rounded-lg px-4 py-2.5 mt-7
                    text-center inline-flex justify-between items-center transition duration-200 ease-in-out"
          type="button"
          data-dropdown-toggle="tagFilterDropdown"
          onClick={(e) => {
            setDropdownOpen(!dropdownOpen);
          }}>
          {currentTopic === '' ? 'All topics' : currentTopic}
          {/* Font Awesome arrow down */}
          {dropdownOpen ? (
            <i className="fas fa-chevron-up ml-2"></i>
          ) : (
            <i className="fas fa-chevron-down ml-2"></i>
          )}
        </button>

        <div
          className={`${
            !dropdownOpen && 'hidden'
          } absolute origin-top-right right-0 z-10 bg-white dark:bg-slate-600 w-full text-base list-none divide-y divide-gray-100 rounded shadow my-2
            max-h-64 overflow-auto`}
          id="tagFilterDropdown"
          aria-hidden={!dropdownOpen}>
          <ul className="py-1" aria-labelledby="tagFilterDropdown">
            {currentTopic !== '' && (
              <li>
                <Link
                  href="/blog/posts"
                  className="text-xl hover:bg-slate-200 dark:hover:bg-slate-500 text-gray-700 dark:text-slate-100 block px-4 py-2"
                  onClick={(e) => setDropdownOpen(false)}>
                  <span className="font-medium">All topics</span>
                </Link>
              </li>
            )}

            {tags.map((tag, index) => (
              <li key={index}>
                <Link
                  href={`/blog/tags/${tag.name}`}
                  className="text-xl hover:bg-slate-200 dark:hover:bg-slate-500 text-gray-700 dark:text-slate-100 px-4 py-2 inline-flex items-center w-full justify-between"
                  onClick={(e) => setDropdownOpen(false)}>
                  <p className="font-medium">{tag.name}</p>
                  <p className="bg-slate-500 dark:bg-slate-700 dark:text-slate-100 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                    {tag.taggings_count}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TagFilter;
