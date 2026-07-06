// components/blog/BlogHeader.jsx
import React from 'react';

const BlogHeader = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        My{' '}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Blog
        </span>
      </h1>
      <p className="text-xl opacity-75 max-w-2xl mx-auto">
        Insights, tutorials, and thoughts on web development
      </p>
    </div>
  );
};

export default BlogHeader;