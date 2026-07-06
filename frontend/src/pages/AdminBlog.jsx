// pages/AdminBlog.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { Plus, AlertCircle, Check } from 'lucide-react';
import { 
  getBlogs, 
  getBlogStats, 
  deleteBlog, 
  toggleFeatured, 
  togglePublish,
  clearError 
} from '../redux/slices/blogSlice';
import BlogStats from '../components/public/blog/BlogStats';
import BlogSearchFilters from '../components/admin/blog/BlogSearchFilters';
import BlogTable from '../components/admin/blog/BlogTable';
import BlogPagination from '../components/admin/blog/BlogPagination';
import BlogModal from '../components/public/blog/BlogModal';
import DeleteConfirmModal from '../components/public/blog/DeleteConfirmModal';
import toast from 'react-hot-toast';

const AdminBlog = () => {
  const dispatch = useDispatch();
  const { currentTheme, currentMood } = useTheme();
  const { blogs, pagination, stats, loading, error } = useSelector((state) => state.blogs || {});
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // Fetch blogs when filters change
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      search: searchTerm,
      category: categoryFilter,
      status: statusFilter
    };
    dispatch(getBlogs(params));
  }, [dispatch, currentPage, itemsPerPage, searchTerm, categoryFilter, statusFilter]);

  // Fetch stats
  useEffect(() => {
    dispatch(getBlogStats());
  }, [dispatch]);

  // Clear error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, statusFilter]);

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowPostModal(true);
  };

  const handleDelete = (id) => {
    const post = blogs.find(p => p._id === id);
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        await dispatch(deleteBlog(postToDelete._id)).unwrap();
        toast.success('Blog post deleted successfully');
        setShowDeleteModal(false);
        setPostToDelete(null);
        // Refresh data
        refreshData();
      } catch (error) {
        toast.error(error.message || 'Failed to delete blog post');
      }
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await dispatch(togglePublish(id)).unwrap();
      toast.success('Publish status updated');
      refreshData();
    } catch (error) {
      toast.error(error.message || 'Failed to update publish status');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await dispatch(toggleFeatured(id)).unwrap();
      toast.success('Featured status updated');
      refreshData();
    } catch (error) {
      toast.error(error.message || 'Failed to update featured status');
    }
  };

  const handleSavePost = () => {
    setShowPostModal(false);
    setEditingPost(null);
    refreshData();
  };

  const refreshData = () => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      search: searchTerm,
      category: categoryFilter,
      status: statusFilter
    };
    dispatch(getBlogs(params));
    dispatch(getBlogStats());
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Blog{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-sm opacity-75 mt-1">Manage your blog posts, categories, and content</p>
          </div>
          <button
            onClick={() => {
              setEditingPost(null);
              setShowPostModal(true);
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Plus size={18} />
            Write New Post
          </button>
        </div>

        <BlogStats stats={stats} currentTheme={currentTheme} currentMood={currentMood} />

        <BlogSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          currentTheme={currentTheme}
        />

        <BlogTable
          posts={blogs}
          loading={loading}
          currentTheme={currentTheme}
          onTogglePublish={handleTogglePublish}
          onToggleFeatured={handleToggleFeatured}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        <BlogPagination
          currentPage={currentPage}
          totalPages={pagination?.pages || 1}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={pagination?.total || 0}
          indexOfFirstItem={(currentPage - 1) * itemsPerPage}
          indexOfLastItem={currentPage * itemsPerPage}
          paginate={setCurrentPage}
          nextPage={() => setCurrentPage(prev => Math.min(prev + 1, pagination?.pages || 1))}
          prevPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          currentTheme={currentTheme}
        />

        {showPostModal && (
          <BlogModal
            post={editingPost}
            onClose={() => {
              setShowPostModal(false);
              setEditingPost(null);
            }}
            onSave={handleSavePost}
            currentTheme={currentTheme}
          />
        )}

        {showDeleteModal && (
          <DeleteConfirmModal
            post={postToDelete}
            onConfirm={confirmDelete}
            onCancel={() => {
              setShowDeleteModal(false);
              setPostToDelete(null);
            }}
            currentTheme={currentTheme}
          />
        )}
      </div>
    </div>
  );
};

export default AdminBlog;