// components/blog/BlogCard.jsx
import React, { useState } from 'react';
import { Clock, Calendar, Heart, Eye, MessageCircle, Bookmark, TrendingUp } from 'lucide-react';

const BlogCard = ({ 
  post, 
  onViewDetails, 
  onLike,
  isBookmarked, 
  onBookmark, 
  currentTheme, 
  currentMood 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    if (onLike) onLike();
  };

  const getImageUrl = () => {
    if (post.image?.url) return post.image.url;
    if (post.images && post.images.length > 0) return post.images[0].url;
    return 'https://via.placeholder.com/400x250?text=No+Image';
  };

  return (
    <div
      className={`${currentTheme.card} ${currentMood} overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={getImageUrl()} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        {post.featured && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full">
            Featured
          </div>
        )}
        {post.trending && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center gap-1">
            <TrendingUp size={12} /> Trending
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs opacity-75">
            <Clock size={12} /> {post.readTime || '5 min read'}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
        <p className="opacity-75 mb-3 line-clamp-2 text-sm">{post.excerpt}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <img 
              src={post.author?.avatar || 'https://via.placeholder.com/32'} 
              alt={post.author?.name || 'Author'} 
              className="w-8 h-8 rounded-full object-cover" 
            />
            <div className="text-sm">
              <p className="font-semibold">{post.author?.name || 'Admin'}</p>
              <p className="text-xs opacity-75 flex items-center gap-1">
                <Calendar size={10} /> {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onBookmark(); }} 
            className={`p-2 rounded-lg transition-all ${isBookmarked ? 'text-yellow-500' : 'opacity-50 hover:opacity-100'}`}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-700">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 text-sm hover:text-red-500 transition"
          >
            <Heart size={14} className={liked ? 'text-red-500 fill-red-500' : 'text-red-500'} /> 
            {post.likes + (liked ? 1 : 0)}
          </button>
          <span className="flex items-center gap-1 text-sm">
            <Eye size={14} /> {post.views || 0}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <MessageCircle size={14} /> {post.comments || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;