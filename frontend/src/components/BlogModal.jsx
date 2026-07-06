// components/BlogModal.jsx - Blog Post Modal
import React, { useState } from 'react';
import { X, Heart, Share2, Bookmark, Calendar, User, Clock, Eye, MessageCircle,   Link2, Copy, Check, Tag } from 'lucide-react';
import { FaChevronCircleDown, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const BlogModal = ({ post, onClose, currentTheme }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    twitter: `https://twitter.com/intent/tweet?text=${post.title}&url=${window.location.href}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className={`${currentTheme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs opacity-75">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          {/* Author Info */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm opacity-75">{post.author.bio}</p>
                <div className="flex items-center gap-3 mt-1 text-xs opacity-75">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime} read
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

          {/* Featured Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl mb-6"
          />

          {/* Blog Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Tag size={18} /> Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gray-700 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-gray-800/50">
            <div className="text-center">
              <Heart className="inline text-red-500 mb-1" size={24} />
              <p className="text-2xl font-bold">{post.likes + (liked ? 1 : 0)}</p>
              <p className="text-sm opacity-75">Likes</p>
            </div>
            <div className="text-center">
              <Eye className="inline mb-1" size={24} />
              <p className="text-2xl font-bold">{post.views}</p>
              <p className="text-sm opacity-75">Views</p>
            </div>
            <div className="text-center">
              <MessageCircle className="inline mb-1" size={24} />
              <p className="text-2xl font-bold">{post.comments}</p>
              <p className="text-sm opacity-75">Comments</p>
            </div>
          </div>

          {/* Share Section */}
          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm font-semibold mb-3">Share this article:</p>
            <div className="flex gap-3">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-blue-600 hover:scale-110 transition-transform"
              >
                <FaChevronCircleDown size={18} />
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-sky-500 hover:scale-110 transition-transform"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-blue-700 hover:scale-110 transition-transform"
              >
                <FaLinkedin size={18} />
              </a>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-gray-700 hover:scale-110 transition-transform"
              >
                {copied ? <Check size={18} /> : <Link2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;