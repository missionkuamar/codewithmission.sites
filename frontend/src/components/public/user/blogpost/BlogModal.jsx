// components/blog/BlogModal.jsx
import React, { useState, useEffect } from 'react';
import { 
  X, Heart, Share2, Bookmark, Calendar, User, Clock, Eye, 
  MessageCircle, Link2, Check, Tag, ArrowLeft, ArrowRight 
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { likeBlog } from '../../../../redux/slices/blogSlice';
import toast from 'react-hot-toast';

const BlogModal = ({ post, postId, onClose, onLike, currentTheme, currentMood }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get images from post
  const getImages = () => {
    if (!post) return [];
    const images = [];
    if (post.image?.url) images.push(post.image.url);
    if (post.images && post.images.length > 0) {
      post.images.forEach(img => {
        if (img.url) images.push(img.url);
      });
    }
    return images.length > 0 ? images : ['https://via.placeholder.com/800x400?text=No+Image'];
  };

  const images = getImages();

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(postId || post._id)).unwrap();
      setLiked(true);
      if (onLike) onLike(postId || post._id);
      toast.success('Liked! ❤️');
    } catch (error) {
      toast.error(error.message || 'Failed to like post');
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks ❤️');
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/blog/${post?.slug || post?._id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Link copied! 📋');
  };

  const handleShare = (platform) => {
    const url = `${window.location.origin}/blog/${post?.slug || post?._id}`;
    const text = post?.title || 'Check out this article';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!post) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className={`${currentTheme.card} ${currentMood} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit">
          <div className="flex items-center gap-2 flex-wrap">
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
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          {/* Author Info */}
          <div className="flex flex-wrap items-center justify-between mb-6 pb-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={post.author?.avatar || 'https://via.placeholder.com/50'}
                alt={post.author?.name || 'Author'}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{post.author?.name || 'Admin'}</p>
                <p className="text-sm opacity-75">{post.author?.bio || ''}</p>
                <div className="flex items-center gap-3 mt-1 text-xs opacity-75">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime || '5 min read'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleLike}
                className={`p-2 rounded-lg transition-all ${liked ? 'text-red-500' : 'hover:bg-gray-700'}`}
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-lg transition-all ${bookmarked ? 'text-yellow-500' : 'hover:bg-gray-700'}`}
              >
                <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="relative mb-6">
              <div className="relative overflow-hidden rounded-xl bg-gray-900">
                <img
                  src={images[currentImageIndex]}
                  alt={post.title}
                  className="w-full h-96 object-contain"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition"
                    >
                      <ArrowLeft size={20} className="text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition"
                    >
                      <ArrowRight size={20} className="text-white" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/70 rounded-full text-xs text-white">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                        currentImageIndex === index 
                          ? 'ring-2 ring-purple-500' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Blog Content */}
          <div 
            className="prose prose-lg prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Tag size={18} /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-700 text-sm hover:bg-gray-600 transition cursor-pointer"
                    onClick={() => window.location.href = `/blog?tag=${tag}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-gray-800/50">
            <div className="text-center">
              <Heart className="inline text-red-500 mb-1" size={24} />
              <p className="text-2xl font-bold">{post.likes + (liked ? 1 : 0)}</p>
              <p className="text-sm opacity-75">Likes</p>
            </div>
            <div className="text-center">
              <Eye className="inline mb-1" size={24} />
              <p className="text-2xl font-bold">{post.views || 0}</p>
              <p className="text-sm opacity-75">Views</p>
            </div>
            <div className="text-center">
              <MessageCircle className="inline mb-1" size={24} />
              <p className="text-2xl font-bold">{post.comments || 0}</p>
              <p className="text-sm opacity-75">Comments</p>
            </div>
          </div>

          {/* Share Section */}
          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm font-semibold mb-3">Share this article:</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 rounded-lg bg-blue-600 hover:scale-110 transition-transform"
              >
                <FaFacebook size={18} />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 rounded-lg bg-sky-500 hover:scale-110 transition-transform"
              >
                <FaTwitter size={18} />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 rounded-lg bg-blue-700 hover:scale-110 transition-transform"
              >
                <FaLinkedin size={18} />
              </button>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-gray-700 hover:scale-110 transition-transform flex items-center gap-2"
              >
                {copied ? <Check size={18} /> : <Link2 size={18} />}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;