interface PaginationProps {
  currentPage: number; // Page the user is currently on.
  totalPages: number; // Total number of pages.
  onPageChange: (page: number) => void; // Function to change the page.
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  console.log(currentPage, totalPages, pageNumbers);

  return (
    <nav className="flex justify-center">
      <ul className="inline-flex space-x-3 mt-4">
        {currentPage > 1 && (
          <li>
            <button
              className={`px-3 py-2 rounded-r-md hover:bg-slate-200 bg-slate-100 flex flex-col justify-center items-center rounded cursor-pointer
                        text-xl transition-all duration-500 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white
                        border border-slate-300 hover:border-slate-600 dark:border-slate-500 dark:hover:border-slate-200`}
              onClick={() => onPageChange(currentPage - 1)}>
              Prev
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`${
                currentPage === number
                  ? 'font-bold'
                  : 'hover:border-slate-600 dark:hover:bg-slate-500 dark:hover:border-slate-200 hover:bg-slate-200'
              } px-3 py-2 rounded-r-md bg-slate-100 flex flex-col justify-center items-center rounded cursor-pointer
              text-xl transition-all duration-500 dark:bg-slate-600 dark:text-white
              border border-slate-300 dark:border-slate-500`}
              onClick={() => onPageChange(number)}
              disabled={currentPage === number}>
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              className={`px-3 py-2 rounded-r-md hover:bg-slate-200 bg-slate-100 flex flex-col justify-center items-center rounded cursor-pointer
                        text-xl transition-all duration-500 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white
                        border border-slate-300 hover:border-slate-600 dark:border-slate-500 dark:hover:border-slate-200`}
              onClick={() => onPageChange(currentPage + 1)}>
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
