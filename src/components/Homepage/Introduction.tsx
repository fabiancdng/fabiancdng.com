import { getIntroduction } from '@/adapters/ContentAdapter';
import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const Introduction = async () => {
  const introduction = await getIntroduction();
  return (
    <div className="introduction container max-w-7xl mx-auto mb-40 px-10 rounded">
      <ReactMarkdown
        children={introduction || ''}
        components={{
          h2: ({ node, ...props }) => (
            <h2
              className="text-gray-800 dark:text-slate-100 text-5xl my-5 font-semibold pt-5 text-center sm:text-left mx-4 sm:mx-0"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="text-gray-800 dark:text-slate-100 text-center sm:text-left text-xl leading-9 my-4" {...props} />
          ),
          strong: ({ node, ...props }) => <b className="underline" {...props} />,
          a: ({ node, ...props }) => <a className="underline" {...props} />,
        }}
      />

      <div className="mt-7 flex flex-row sm:justify-start justify-center">
        <Link
          href={'/about'}
          className={`hover:bg-slate-300 bg-slate-200 rounded cursor-pointer px-10 py-3
                    text-md transition-all duration-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white flex items-center space-x-2`}>
          <i className="fa-regular fa-lightbulb text-lg dark:text-white" />
          <b className="font-medium">More about me</b>
        </Link>
      </div>
    </div>
  );
};

export default Introduction;
