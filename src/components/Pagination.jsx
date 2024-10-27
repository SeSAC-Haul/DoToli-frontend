import React from 'react';

const Pagination = ({
                      currentPage,
                      totalPages,
                      onPageChange,
                      onFirstPage,
                      onLastPage,
                      onNextPage,
                      onPreviousPage
                    }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
      <div className="flex justify-center items-center mt-4 space-x-2">
        {/* First Page Button */}
        <button
            onClick={onFirstPage}
            disabled={currentPage === 1}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          {'<'}
        </button>
        {/* Previous Page Button */}
        <button
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          {'<<'}
        </button>
        {/* Page Number Buttons */}
        {pageNumbers.map((number) => (
            <button
                key={number}
                onClick={() => onPageChange(number)}
                className={`px-3 py-1 border border-gray-300 rounded hover:bg-blue-500 hover:text-white ${
                    currentPage === number ? 'bg-blue-500 text-white' : ''
                }`}
            >
              {number}
            </button>
        ))}
        {/* Next Page Button */}
        <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          {'>>'}
        </button>
        {/* Last Page Button */}
        <button
            onClick={onLastPage}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          {'>'}
        </button>
      </div>
  );
};

export default Pagination;
