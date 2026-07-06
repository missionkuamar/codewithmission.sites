// components/blog/BlogPagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BlogPagination = ({ currentPage, totalPages, paginate, nextPage, prevPage, currentTheme }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button onClick={prevPage} disabled={currentPage === 1} className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : `${currentTheme.card} hover:scale-105`}`}>
        <ChevronLeft size={20} />
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button key={i} onClick={() => paginate(i + 1)} className={`px-4 py-2 rounded-lg transition-all ${currentPage === i + 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : `${currentTheme.card} hover:scale-105`}`}>
          {i + 1}
        </button>
      ))}
      <button onClick={nextPage} disabled={currentPage === totalPages} className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : `${currentTheme.card} hover:scale-105`}`}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default BlogPagination;