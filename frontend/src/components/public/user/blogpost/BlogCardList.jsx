// components/blog/BlogCardList.jsx
import React, { useState } from 'react';
import { Clock, Calendar, Heart, Eye, MessageCircle, Bookmark } from 'lucide-react';

const BlogCardList = ({ 
  post, 
  onViewDetails, 
  onLike,
  isBookmarked, 
  onBookmark, 
  currentTheme, 
  currentMood 
}) => {
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
      className={`${currentTheme.card} ${currentMood} p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-xl`} 
      onClick={onViewDetails}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <img 
          src={getImageUrl()} 
          alt={post.title} 
          className="w-full md:w-48 h-32 object-cover rounded-lg" 
        />
        <div className="flex-1">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs opacity-75">
                  <Clock size={12} /> {post.readTime || '5 min read'}
                </span>
                {post.featured && (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-500">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-1">{post.title}</h3>
              <p className="opacity-75 mb-2 line-clamp-2">{post.excerpt}</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onBookmark(); }} 
              className={`p-2 rounded-lg transition-all ${isBookmarked ? 'text-yellow-500' : 'opacity-50 hover:opacity-100'}`}
            >
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="flex flex-wrap justify-between items-center mt-3 gap-2">
            <div className="flex items-center gap-2">
              <img 
                src={post.author?.avatar || 'https://via.placeholder.com/24'} 
                alt={post.author?.name || 'Author'} 
                className="w-6 h-6 rounded-full object-cover" 
              />
              <span className="text-sm">{post.author?.name || 'Admin'}</span>
              <span className="text-xs opacity-75 flex items-center gap-1">
                <Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
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
      </div>
    </div>
  );
};

export default BlogCardList;