// components/admin/blog/BlogStats.jsx
import React from 'react';
import { FileText, Check, Clock, Star, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';

const BlogStats = ({ stats, currentTheme, currentMood }) => {
  const statCards = [
    { icon: <FileText size={20} />, value: stats.total, label: "Total Posts", color: "from-blue-500 to-cyan-500" },
    { icon: <Check size={20} />, value: stats.published, label: "Published", color: "from-green-500 to-emerald-500", valueColor: "text-green-500" },
    { icon: <Clock size={20} />, value: stats.draft, label: "Draft", color: "from-yellow-500 to-orange-500", valueColor: "text-yellow-500" },
    { icon: <Star size={20} />, value: stats.featured, label: "Featured", color: "from-purple-500 to-pink-500" },
    { icon: <Eye size={20} />, value: stats.totalViews.toLocaleString(), label: "Views", color: "from-blue-500 to-cyan-500" },
    { icon: <Heart size={20} />, value: stats.totalLikes.toLocaleString(), label: "Likes", color: "from-red-500 to-rose-500" },
    { icon: <MessageCircle size={20} />, value: stats.totalComments.toLocaleString(), label: "Comments", color: "from-green-500 to-emerald-500" },
    { icon: <Share2 size={20} />, value: stats.totalShares.toLocaleString(), label: "Shares", color: "from-indigo-500 to-purple-500" }
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