import { WP_Embedded_Term } from '@/types';
import Link from 'next/link';
import React from 'react';

const TagList = ({ tags }: { tags: WP_Embedded_Term[] }) => {
  return (
    <ul className="post-tags inline-flex">
      {tags.map((tag, index) => (
        <li key={index} className="post-tag">
          <Link className="text-blue-800 font-semibold text-lg dark:text-slate-400 uppercase" href={`/blog/tags/${tag.slug}`}>
            {tag.name}
          </Link>
          {/* '/' in between the tags */}
          {index !== tags.length - 1 && <span className="text-gray-500 font-semibold mx-2 dark:text-gray-300">/</span>}
        </li>
      ))}
    </ul>
  );
};

export default TagList;
