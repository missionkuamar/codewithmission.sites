import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { IoHeart, IoHeartOutline, IoChatbubbleOutline, IoShareSocial } from 'react-icons/io5';
import usePostStore from '../store/postStore';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const PostCard = ({ post }) => {
  const { toggleLike } = usePostStore();
  const { user } = useAuthStore();
  const [showFullContent, setShowFullContent] = useState(false);

  const isLiked = post.likes.some(like => like._id === user?._id);

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }
    await toggleLike(post._id);
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength || showFullContent) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transform transition hover:shadow-xl">
      {/* Post Header */}
      <div className="p-4 flex items-center space-x-3">
        <Link to={`/profile/${post.user._id}`}>
          <img
            src={post.user.profilePicture || 'https://via.placeholder.com/40'}
            alt={post.user.username}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>
        <div>
          <Link to={`/profile/${post.user._id}`} className="font-semibold hover:text-purple-600">
            {post.user.username}
          </Link>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
        <div className="ml-auto">
          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
            {post.category}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <h3 className="font-bold text-xl mb-2">{post.title}</h3>
        <p className="text-gray-700">
          {truncateContent(post.content)}
          {post.content.length > 150 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-purple-600 ml-2"
            >
              {showFullContent ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className={`grid gap-1 p-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {post.images.map((image, idx) => (
            <img
              key={idx}
              src={image.url}
              alt={`Post image ${idx + 1}`}
              className="w-full h-64 object-cover rounded"
            />
          ))}
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="px-4 py-2 flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Post Stats and Actions */}
      <div className="px-4 py-3 border-t border-gray-100 flex justify-between">
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition"
        >
          {isLiked ? <IoHeart size={24} className="text-red-600" /> : <IoHeartOutline size={24} />}
          <span>{post.likes.length}</span>
        </button>

        <Link to={`/post/${post._id}`} className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
          <IoChatbubbleOutline size={24} />
          <span>{post.comments.length}</span>
        </Link>

        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
          <IoShareSocial size={24} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;