// admin/dashboard/blog/components/BlogPagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BlogPagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  setItemsPerPage,
  totalItems,
  indexOfFirstItem,
  indexOfLastItem,
  paginate,
  nextPage,
  prevPage,
  currentTheme
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxPageButtons = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700 flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm opacity-75">Show:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className={`px-2 py-1 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} text-sm focus:outline-none`}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="text-sm opacity-75">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} posts
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-all ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed'
              : `${currentTheme.card} hover:scale-105`
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => paginate(1)}
              className={`px-3 py-1 rounded-lg transition-all ${currentTheme.card} hover:scale-105`}
            >
              1
            </button>
            {startPage > 2 && <span className="px-1">...</span>}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-3 py-1 rounded-lg transition-all ${
              currentPage === number
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : `${currentTheme.card} hover:scale-105`
            }`}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-1">...</span>}
            <button
              onClick={() => paginate(totalPages)}
              className={`px-3 py-1 rounded-lg transition-all ${currentTheme.card} hover:scale-105`}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-all ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : `${currentTheme.card} hover:scale-105`
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default BlogPagination;