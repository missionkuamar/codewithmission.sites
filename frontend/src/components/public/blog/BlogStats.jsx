// components/admin/blog/BlogStats.jsx
import React from 'react';
import { FileText, Check, Clock, Star, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';

const BlogStats = ({ stats, currentTheme, currentMood }) => {
  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`${currentTheme.card} p-3 text-center animate-pulse`}>
            <div className="h-8 bg-gray-700 rounded mb-1"></div>
            <div className="h-4 bg-gray-700 rounded w-12 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    { icon: <FileText size={20} />, value: stats.total || 0, label: "Total Posts", color: "from-blue-500 to-cyan-500" },
    { icon: <Check size={20} />, value: stats.published || 0, label: "Published", color: "from-green-500 to-emerald-500", valueColor: "text-green-500" },
    { icon: <Clock size={20} />, value: stats.draft || 0, label: "Draft", color: "from-yellow-500 to-orange-500", valueColor: "text-yellow-500" },
    { icon: <Star size={20} />, value: stats.featured || 0, label: "Featured", color: "from-purple-500 to-pink-500" },
    { icon: <Eye size={20} />, value: (stats.totalViews || 0).toLocaleString(), label: "Views", color: "from-blue-500 to-cyan-500" },
    { icon: <Heart size={20} />, value: (stats.totalLikes || 0).toLocaleString(), label: "Likes", color: "from-red-500 to-rose-500" },
    { icon: <MessageCircle size={20} />, value: (stats.totalComments || 0).toLocaleString(), label: "Comments", color: "from-green-500 to-emerald-500" },
    { icon: <Share2 size={20} />, value: (stats.totalShares || 0).toLocaleString(), label: "Shares", color: "from-indigo-500 to-purple-500" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className={`${currentTheme.card} ${currentMood} p-3 text-center transform hover:scale-105 transition-all duration-300`}>
          <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-1`}>
            {stat.icon}
          </div>
          <p className={`text-xl font-bold ${stat.valueColor || ''}`}>{stat.value}</p>
          <p className="text-xs opacity-75">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogStats;