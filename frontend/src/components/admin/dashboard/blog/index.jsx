// admin/dashboard/blog/index.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { getBlogs, getBlogStats, deleteBlog, toggleFeatured, togglePublish } from '../../../../redux/slices/blogSlice';
import BlogStats from './components/BlogStats';
import BlogSearchFilters from './components/BlogSearchFilters';
import BlogTable from './components/BlogTable';
import BlogPagination from './components/BlogPagination';
import BlogModal from './components/BlogModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const BlogTab = ({ currentTheme }) => {
  const dispatch = useDispatch();
  const { blogs, pagination, stats, loading } = useSelector((state) => state.blogs || {});
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    fetchBlogs();
    dispatch(getBlogStats());
  }, [currentPage, itemsPerPage, searchTerm, categoryFilter, statusFilter]);

  const fetchBlogs = () => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      search: searchTerm,
      category: categoryFilter,
      status: statusFilter
    };
    dispatch(getBlogs(params));
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const blog = blogs.find(b => b._id === id);
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      await dispatch(deleteBlog(blogToDelete._id));
      setShowDeleteModal(false);
      setBlogToDelete(null);
      fetchBlogs();
    }
  };

  const handleTogglePublish = async (id) => {
    await dispatch(togglePublish(id));
    fetchBlogs();
  };

  const handleToggleFeatured = async (id) => {
    await dispatch(toggleFeatured(id));
    fetchBlogs();
  };

  const handleSaveBlog = () => {
    setShowModal(false);
    setEditingBlog(null);
    fetchBlogs();
    dispatch(getBlogStats());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Blog Management</h2>
        <button
          onClick={() => {
            setEditingBlog(null);
            setShowModal(true);
          }}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={18} /> Create Post
        </button>
      </div>

      <BlogStats stats={stats} currentTheme={currentTheme} />

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

      {showModal && (
        <BlogModal
          blog={editingBlog}
          onClose={() => {
            setShowModal(false);
            setEditingBlog(null);
          }}
          onSave={handleSaveBlog}
          currentTheme={currentTheme}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          blog={blogToDelete}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setBlogToDelete(null);
          }}
          currentTheme={currentTheme}
        />
      )}
    </div>
  );
};

export default BlogTab;