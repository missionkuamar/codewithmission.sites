// components/blog/BlogResultsInfo.jsx
import React from 'react';

const BlogResultsInfo = ({ startIndex, endIndex, totalItems, bookmarkedCount }) => {
  if (totalItems === 0) return null;
  
  return (
    <div className="mb-6 flex justify-between items-center flex-wrap gap-2">
      <p className="opacity-75">
        Showing <span className="font-bold text-purple-500">{startIndex}</span> -{' '}
        <span className="font-bold text-purple-500">{endIndex}</span> of{' '}
        <span className="font-bold">{totalItems}</span> articles
      </p>
      {bookmarkedCount > 0 && (
        <p className="text-sm">📚 {bookmarkedCount} bookmarked</p>
      )}
    </div>
  );
};

export default BlogResultsInfo;