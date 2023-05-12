import Link from 'next/link';

interface PaginationProps {
  currentPage: number; // Page the user is currently on.
  totalPages: number; // Total number of pages.
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav id="blog-posts-pagination" className="pagination flex justify-center">
      <ul className="inline-flex space-x-3 mt-4">
        {/* The "Prev" button, if needed. */}
        {currentPage > 1 && (
          <li>
            <Link
              href={
                currentPage - 1 <= 1
                  ? '/blog'
                  : `/blog/posts/${currentPage - 1}`
              }
              className={`px-3 py-2 rounded-r-md hover:bg-slate-200 bg-slate-100 flex flex-col justify-center items-center rounded cursor-pointer
                        text-xl transition-all duration-500 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white
                        border border-slate-300 hover:border-slate-600 dark:border-slate-500 dark:hover:border-slate-200`}>
              Prev
            </Link>
          </li>
        )}

        {/* The individual pages. */}
        {pageNumbers.map((number) => (
          <li key={number}>
            {/* Current page: Page not clickable. */}
            {currentPage === number && (
              <button
                className={`${
                  currentPage === number
                    ? 'font-bold'
                    : 'hover:border-slate-600 dark:hover:bg-slate-500 dark:hover:border-slate-200 hover:bg-slate-200'
                } px-3 py-2 rounded-r-md bg-slate-100 flex flex-col justify-center items-center rounded cursor-pointer
                          text-xl transition-all duration-500 dark:bg-slate-600 dark:text-white
                          border border-slate-300 dark:border-slate-500`}
                disabled>
                {number}
              </button>
            )}

            {/* Other pages: Page is clickable. */}
            {currentPage !== number && (
              <Link
                className={`${
                  currentPage === number
                    ? 'font-bold'
                    : 'hover:border-slate-600 dark:hover:bg-slate-500 dark:hover:border-slate-200 hover:bg-slate-200'
                } px-3 py-2 rounded-r-md bg-slate-100 flex flex-col justify-center items-center rounded cursor-pointer
            text-xl transition-all duration-500 dark:bg-slate-600 dark:text-white
            border border-slate-300 dark:border-slate-500`}
                href={number === 1 ? '/blog' : `/blog/posts/${number}`}>
                {number}
              </Link>
            )}
          </li>
        ))}

        {/* The "Next" button, if needed. */}
        {currentPage < totalPages && (
          <li>
            <Link
              href={`/blog/posts/${currentPage + 1}`}
              className={`px-3 py-2 rounded-r-md hover:bg-slate-200 bg-slate-100 flex flex-col justify-center items-center rounded cursor-pointer
                        text-xl transition-all duration-500 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white
                        border border-slate-300 hover:border-slate-600 dark:border-slate-500 dark:hover:border-slate-200`}>
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
