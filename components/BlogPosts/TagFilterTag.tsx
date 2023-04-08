import Link from 'next/link';

const TagFilterTag = ({
  tagName,
  postCount,
}: {
  tagName: string;
  postCount: number;
}) => {
  return (
    <div
      className={`flex flex-row items-center w-fit cursor-pointer hover:bg-slate-300 bg-slate-200 dark:hover:bg-slate-600 dark:bg-slate-700
            rounded-full px-4 py-2 mr-3 my-3 transition-all duration-300 ease-in-out`}>
      <div className="flex flex-row items-center justify-center">
        <Link
          href={`/blog/tags/${tagName}`}
          className="text-gray-800 dark:text-slate-100 font-semibold">
          {tagName} ({postCount})
        </Link>
      </div>
    </div>
  );
};

export default TagFilterTag;
