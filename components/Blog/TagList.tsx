import Link from 'next/link';

const TagList = ({
  tagList,
  addCSSClasses,
}: {
  tagList: string[];
  addCSSClasses?: string;
}) => {
  return (
    <ul
      className={`post-tags inline-flex${
        addCSSClasses ? ' ' + addCSSClasses : ''
      }`}>
      {tagList.map((tag, index) => (
        <li className="post-tag" key={index}>
          <Link
            key={index}
            href={`/blog/tags/${tag}`}
            className="text-blue-800 font-semibold text-lg dark:text-slate-400">
            {tag.toUpperCase()}
          </Link>
          {index !== tagList.length - 1 && (
            <span className="text-gray-500 mx-3 dark:text-slate-400">/</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TagList;
