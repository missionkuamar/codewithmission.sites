// components/blog/BlogStats.jsx
import React from 'react';
import { FileText, Heart, Eye, MessageCircle } from 'lucide-react';

const BlogStats = ({ posts, currentTheme, currentMood, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`${currentTheme.card} p-4 text-center animate-pulse`}>
            <div className="h-8 w-16 mx-auto bg-gray-700 rounded mb-1"></div>
            <div className="h-4 w-20 mx-auto bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const stats = {
    total: posts?.length || 0,
    totalLikes: (posts?.reduce((sum, p) => sum + (p.likes || 0), 0) || 0).toLocaleString(),
    totalViews: (posts?.reduce((sum, p) => sum + (p.views || 0), 0) || 0).toLocaleString(),
    totalComments: (posts?.reduce((sum, p) => sum + (p.comments || 0), 0) || 0)
  };

  const statCards = [
    { icon: <FileText size={20} />, value: stats.total, label: "Total Articles", color: "from-blue-500 to-cyan-500" },
    { icon: <Heart size={20} />, value: stats.totalLikes, label: "Total Likes", color: "from-red-500 to-rose-500" },
    { icon: <Eye size={20} />, value: stats.totalViews, label: "Total Views", color: "from-green-500 to-emerald-500" },
    { icon: <MessageCircle size={20} />, value: stats.totalComments, label: "Comments", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className={`${currentTheme.card} ${currentMood} p-4 text-center transform hover:scale-105 transition-all duration-300`}>
          <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-1`}>
            {stat.icon}
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm opacity-75">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogStats;