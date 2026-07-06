// components/blog/BlogCardList.jsx
import React from 'react';
import { Clock, Calendar, Heart, Eye, MessageCircle, Bookmark } from 'lucide-react';

const BlogCardList = ({ post, onViewDetails, isBookmarked, onBookmark, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-4 hover:scale-102 transition-all duration-300 cursor-pointer`} onClick={onViewDetails}>
      <div className="flex flex-col md:flex-row gap-4">
        <img src={post.image} alt={post.title} className="w-full md:w-48 h-32 object-cover rounded-lg" />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20">{post.category}</span>
                <span className="flex items-center gap-1 text-xs opacity-75"><Clock size={12} /> {post.readTime}</span>
                {post.featured && <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-500">Featured</span>}
              </div>
              <h3 className="text-xl font-bold mb-1">{post.title}</h3>
              <p className="opacity-75 mb-2 line-clamp-2">{post.excerpt}</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onBookmark(); }} className={`p-2 rounded-lg transition-all ${isBookmarked ? 'text-yellow-500' : 'opacity-50 hover:opacity-100'}`}>
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
              <span className="text-sm">{post.author.name}</span>
              <span className="text-xs opacity-75 flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm"><Heart size={14} className="text-red-500" /> {post.likes}</span>
              <span className="flex items-center gap-1 text-sm"><Eye size={14} /> {post.views}</span>
              <span className="flex items-center gap-1 text-sm"><MessageCircle size={14} /> {post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardList;