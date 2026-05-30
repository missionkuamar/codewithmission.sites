// frontend/src/components/Pagination.jsx - Complete updated version

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchProducts } from '../redux/slices/productSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { pagination, filters, loading } = useSelector((state) => state.products);
  const { currentPage, totalPages, totalItems, itemsPerPage } = pagination;

  // Don't render pagination if there's no data or only one page
  if (!totalItems || totalItems === 0 || totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    if (page < 1 || page > totalPages) return;
    
    // Update filters and fetch new data
    dispatch(setFilters({ page }));
    dispatch(fetchProducts({ ...filters, page }));
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // Middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Calculate showing range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (loading) return null;

  return (
    <div className="mt-8 space-y-4">
      {/* Items info */}
      <div className="text-center text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} products
      </div>
      
      {/* Pagination controls */}
      <div className="flex justify-center items-center space-x-2">
        {/* First Page Button */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          aria-label="First page"
        >
          «
        </button>
        
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              className={`px-3 py-2 rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-blue-500 text-white shadow-md'
                  : page === '...'
                  ? 'bg-transparent cursor-default text-gray-500'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          Next
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          aria-label="Last page"
        >
          »
        </button>
      </div>

      {/* Page size selector (optional) */}
      <div className="flex justify-center items-center space-x-2">
        <label className="text-sm text-gray-600">Items per page:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            const newLimit = parseInt(e.target.value);
            dispatch(setFilters({ limit: newLimit, page: 1 }));
            dispatch(fetchProducts({ ...filters, limit: newLimit, page: 1 }));
          }}
          className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;