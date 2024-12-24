import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination m-5 mb-32">
      <ul className="inline-flex -space-x-px font-medium">
        <li className="px-3 py-2 bg-white border hover:text-zinc-700 dark:text-zinc-400 dark:bg-zinc-800 hover:cursor-pointer hover:bg-zinc-50 border-zinc-200 dark:hover:bg-zinc-700 dark:border-zinc-700 rounded-l-lg">
          <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
        <li className="px-3 py-2 bg-white border hover:text-zinc-700 dark:text-zinc-400 dark:bg-zinc-800 hover:cursor-pointer hover:bg-zinc-50 border-zinc-200 dark:hover:bg-zinc-700 dark:border-zinc-700 ">
          <span>Page {currentPage} of {totalPages}</span>
        </li>
        <li className="px-3 py-2 bg-white border hover:text-zinc-700 dark:text-zinc-400 dark:bg-zinc-800 hover:cursor-pointer hover:bg-zinc-50 border-gray-200 dark:hover:bg-zinc-700 dark:border-zinc-700  rounded-r-lg">
          <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
