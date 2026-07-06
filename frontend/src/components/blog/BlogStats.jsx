// components/blog/BlogStats.jsx
import React from 'react';

const BlogStats = ({ posts, currentTheme, currentMood }) => {
  const stats = {
    total: posts.length,
    totalLikes: posts.reduce((sum, p) => sum + p.likes, 0).toLocaleString(),
    totalViews: posts.reduce((sum, p) => sum + p.views, 0).toLocaleString(),
    totalComments: posts.reduce((sum, p) => sum + p.comments, 0)
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className={`${currentTheme.card} ${currentMood} p-4 text-center`}>
        <p className="text-2xl font-bold">{stats.total}</p>
        <p className="text-sm opacity-75">Total Articles</p>
      </div>
      <div className={`${currentTheme.card} ${currentMood} p-4 text-center`}>
        <p className="text-2xl font-bold">{stats.totalLikes}</p>
        <p className="text-sm opacity-75">Total Likes</p>
      </div>
      <div className={`${currentTheme.card} ${currentMood} p-4 text-center`}>
        <p className="text-2xl font-bold">{stats.totalViews}</p>
        <p className="text-sm opacity-75">Total Views</p>
      </div>
      <div className={`${currentTheme.card} ${currentMood} p-4 text-center`}>
        <p className="text-2xl font-bold">{stats.totalComments}</p>
        <p className="text-sm opacity-75">Comments</p>
      </div>
    </div>
  );
};

export default BlogStats;