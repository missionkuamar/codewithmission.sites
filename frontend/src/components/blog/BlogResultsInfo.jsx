// components/blog/BlogResultsInfo.jsx
import React from 'react';

const BlogResultsInfo = ({ indexOfFirstItem, indexOfLastItem, totalItems, bookmarkedCount }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <p className="opacity-75">
        Showing <span className="font-bold text-purple-500">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)}</span> of{' '}
        <span className="font-bold">{totalItems}</span> articles
      </p>
      {bookmarkedCount > 0 && (
        <p className="text-sm">📚 {bookmarkedCount} bookmarked</p>
      )}
    </div>
  );
};

export default BlogResultsInfo;