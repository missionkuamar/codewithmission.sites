// components/projects/ProjectsPagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectsPagination = ({ currentPage, totalPages, paginate, nextPage, prevPage, currentTheme }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button 
        onClick={prevPage} 
        disabled={currentPage === 1} 
        className={`p-2 rounded-lg transition-all ${
          currentPage === 1 
            ? 'opacity-50 cursor-not-allowed' 
            : `${currentTheme.card} hover:scale-105`
        }`}
      >
        <ChevronLeft size={20} />
      </button>
      
      {startPage > 1 && (
        <>
          <button onClick={() => paginate(1)} className={`px-4 py-2 rounded-lg ${currentTheme.card} hover:scale-105`}>
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}
      
      {pageNumbers.map(number => (
        <button 
          key={number} 
          onClick={() => paginate(number)} 
          className={`px-4 py-2 rounded-lg transition-all ${
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
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button onClick={() => paginate(totalPages)} className={`px-4 py-2 rounded-lg ${currentTheme.card} hover:scale-105`}>
            {totalPages}
          </button>
        </>
      )}
      
      <button 
        onClick={nextPage} 
        disabled={currentPage === totalPages} 
        className={`p-2 rounded-lg ${
          currentPage === totalPages 
            ? 'opacity-50 cursor-not-allowed' 
            : `${currentTheme.card} hover:scale-105`
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default ProjectsPagination;