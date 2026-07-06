import React from 'react';
import {
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Loader,
  FileText
} from 'lucide-react';

const BlogTable = ({
  posts,
  loading,
  currentTheme,
  onTogglePublish,
  onToggleFeatured,
  onDelete,
  onEdit
}) => {

  if (loading) {
    return (
      <div className={`${currentTheme.card} p-12 text-center`}>
        <Loader size={40} className="animate-spin mx-auto" />
      </div>
    );
  }

  if (posts?.length === 0) {
    return (
      <div className={`${currentTheme.card} p-12 text-center`}>
        <FileText size={48} className="mx-auto opacity-30 mb-3" />
        <p className="opacity-75">No blog posts found</p>
      </div>
    );
  }

  return (
    <div className={`${currentTheme.card} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full">

          {/* HEADER */}
          <thead className="border-b border-gray-700">
            <tr className="text-left">
              <th className="p-4">Post</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Views</th>
              <th className="p-4">Likes</th>
              <th className="p-4">Comments</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {posts?.map((post) => (
              <tr
                key={post?.id}
                className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">

                    {post?.image && (
                      <img
                        src={post?.image}
                        alt={post?.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}

                    <div>
                      <p className="font-semibold">{post?.title}</p>

                      <p className="text-xs opacity-75">
                        {post?.excerpt?.substring(0, 60)}...
                      </p>

                      <div className="flex items-center gap-2 mt-1 text-xs opacity-60">
                        <Calendar size={10} />
                        {new Date(post?.createdAt).toLocaleDateString()}

                        <Clock size={10} />
                        {post?.readTime}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20">
                    {post?.category}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => onTogglePublish(post?.id)}
                    className={`px-2 py-1 rounded-lg text-xs ${
                      post?.published
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}
                  >
                    {post?.published ? 'Published' : 'Draft'}
                  </button>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => onToggleFeatured(post?.id)}
                    className={`px-2 py-1 rounded-lg text-xs ${
                      post?.featured
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-gray-500/20'
                    }`}
                  >
                    {post?.featured ? 'Featured' : 'Standard'}
                  </button>
                </td>

                <td className="p-4">
                  {(post?.views ?? 0).toLocaleString()}
                </td>

                <td className="p-4">
                  {(post?.likes ?? 0).toLocaleString()}
                </td>

                <td className="p-4">
                  {post?.comments ?? 0}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => onEdit(post)}
                      className="p-1 hover:text-blue-500 transition-colors"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(post.id)}
                      className="p-1 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>

                    <button className="p-1 hover:text-green-500 transition-colors">
                      <Eye size={18} />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default BlogTable;