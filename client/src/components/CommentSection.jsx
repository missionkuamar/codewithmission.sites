import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const CommentSection = ({ comments, postId, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    await onAddComment(postId, newComment);
    setNewComment('');
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-4">Comments ({comments.length})</h3>
      
      {user && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex space-x-3">
            <img
              src={user.profilePicture || 'https://via.placeholder.com/40'}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="2"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Post Comment
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex space-x-3">
            <Link to={`/profile/${comment.user._id}`}>
              <img
                src={comment.user.profilePicture || 'https://via.placeholder.com/40'}
                alt={comment.user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-3">
                <Link to={`/profile/${comment.user._id}`} className="font-semibold text-sm hover:text-purple-600">
                  {comment.user.username}
                </Link>
                <p className="text-gray-700 mt-1">{comment.text}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;