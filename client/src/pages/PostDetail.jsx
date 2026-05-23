import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { IoHeart, IoHeartOutline, IoChatbubbleOutline, IoShareSocial, IoTrash, IoArrowBack } from 'react-icons/io5';
import usePostStore from '../store/postStore';
import useAuthStore from '../store/authStore';
import CommentSection from '../components/CommentSection';
import toast from 'react-hot-toast';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPost, fetchPost, toggleLike, addComment, deletePost, loading } = usePostStore();
  const { user } = useAuthStore();
  const [showFullContent, setShowFullContent] = useState(true);

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }
    await toggleLike(id);
    await fetchPost(id); // Refresh to get updated likes
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const success = await deletePost(id);
      if (success) {
        toast.success('Post deleted successfully');
        navigate('/');
      }
    }
  };

  const handleAddComment = async (postId, text) => {
    const success = await addComment(postId, text);
    if (success) {
      await fetchPost(id); // Refresh to get updated comments
      toast.success('Comment added successfully');
    }
  };

  if (loading || !currentPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="mt-2 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  const isLiked = currentPost.likes?.some(like => like._id === user?._id);
  const isAuthor = currentPost.user?._id === user?._id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition"
      >
        <IoArrowBack size={20} />
        <span>Back</span>
      </button>

      {/* Post Container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Post Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={currentPost.user?.profilePicture || 'https://via.placeholder.com/50'}
                alt={currentPost.user?.username}
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                onClick={() => navigate(`/profile/${currentPost.user?._id}`)}
              />
              <div>
                <h3 
                  className="font-semibold hover:text-purple-600 cursor-pointer"
                  onClick={() => navigate(`/profile/${currentPost.user?._id}`)}
                >
                  {currentPost.user?.username}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(currentPost.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                {currentPost.category}
              </span>
              {isAuthor && (
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <IoTrash size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Post Title */}
        <div className="px-6 pt-4">
          <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>
        </div>

        {/* Post Content */}
        <div className="px-6 py-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {showFullContent ? currentPost.content : currentPost.content.substring(0, 300)}
            {currentPost.content.length > 300 && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-purple-600 ml-2 hover:underline"
              >
                {showFullContent ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>
        </div>

        {/* Post Images */}
        {currentPost.images && currentPost.images.length > 0 && (
          <div className={`grid gap-2 p-6 pt-0 ${
            currentPost.images.length === 1 ? 'grid-cols-1' : 
            currentPost.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            {currentPost.images.map((image, idx) => (
              <img
                key={idx}
                src={image.url}
                alt={`Post image ${idx + 1}`}
                className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                onClick={() => window.open(image.url, '_blank')}
              />
            ))}
          </div>
        )}

        {/* Tags */}
        {currentPost.tags && currentPost.tags.length > 0 && (
          <div className="px-6 py-4 flex flex-wrap gap-2 border-t border-gray-100">
            {currentPost.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full cursor-pointer hover:bg-purple-100"
                onClick={() => navigate(`/?search=${tag}`)}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Post Stats and Actions */}
        <div className="px-6 py-4 border-t border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition group"
              >
                {isLiked ? (
                  <IoHeart size={28} className="text-red-600 animate-pulse" />
                ) : (
                  <IoHeartOutline size={28} className="group-hover:scale-110 transition" />
                )}
                <span className="font-semibold">{currentPost.likes?.length || 0}</span>
              </button>

              <div className="flex items-center space-x-2 text-gray-600">
                <IoChatbubbleOutline size={28} />
                <span className="font-semibold">{currentPost.comments?.length || 0}</span>
              </div>

              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition">
                <IoShareSocial size={28} />
                <span>Share</span>
              </button>
            </div>

            <div className="text-sm text-gray-500">
              <span>{currentPost.views || 0} views</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-6">
          <CommentSection
            comments={currentPost.comments || []}
            postId={currentPost._id}
            onAddComment={handleAddComment}
          />
        </div>
      </div>

      {/* Related Posts Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">More from {currentPost.user?.username}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* You can add related posts here */}
          <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
            More posts from this user will appear here
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;