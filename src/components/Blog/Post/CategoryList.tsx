import { WP_Embedded_Term } from '@/types';
import Link from 'next/link';
import React from 'react';

const CategoryList = ({ categories }: { categories: WP_Embedded_Term[] }) => {
  return (
    <ul className="post-tags inline-flex">
      {categories.map((category, index) => (
        <li key={index} className="post-tag">
          <Link className="text-blue-800 font-semibold text-lg dark:text-slate-400 uppercase" href={`/blog/categories/${category.slug}`}>
            {category.name}
          </Link>
          {/* '/' in between the tags */}
          {index !== categories.length - 1 && <span className="text-gray-500 font-semibold mx-2 dark:text-gray-300">/</span>}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
