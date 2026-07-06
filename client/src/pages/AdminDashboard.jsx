import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../services/api';
import ProjectForm from '../components/admin/ProjectForm';
import BlogForm from '../components/admin/BlogForm';
import PersonalInfoForm from '../components/admin/PersonalInfoForm';
import OrderList from '../components/admin/OrderList';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const tabs = [
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'blogs', label: 'Blogs', icon: '📝' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'personal', label: 'Personal Info', icon: '👤' },
  ];

  useEffect(() => {
    if (activeTab === 'projects') fetchProjects();
    if (activeTab === 'blogs') fetchBlogs();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/projects/admin/all');
      setProjects(data.projects);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/blogs/admin/all');
      setBlogs(data.blogs);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/orders/all');
      setOrders(data.orders);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    
    try {
      await api.delete(`/${type}/${id}`);
      toast.success('Deleted successfully');
      if (type === 'projects') fetchProjects();
      if (type === 'blogs') fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-600">Admin privileges required</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Welcome, {user.name}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setShowForm(false);
              setEditingItem(null);
            }}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(!showForm);
                }}
                className="btn-primary px-4 py-2 rounded-lg"
              >
                {showForm ? 'Cancel' : '+ Add Project'}
              </button>
            </div>

            {showForm && (
              <ProjectForm
                project={editingItem}
                onSuccess={() => {
                  setShowForm(false);
                  fetchProjects();
                }}
                onCancel={() => setShowForm(false)}
              />
            )}

            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project._id} className="card p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        {project.featured && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            Featured
                          </span>
                        )}
                        {project.isPublic && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Free
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {project.tags?.slice(0, 3).map((tag, i) => (
                          <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-3 text-sm text-gray-500">
                        <span>💰 ${project.price}</span>
                        <span>📥 {project.downloads} downloads</span>
                        <span>👁️ {project.views} views</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete('projects', project._id)}
                        className="text-red-600 hover:text-red-800 px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === 'blogs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Blogs ({blogs.length})</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(!showForm);
                }}
                className="btn-primary px-4 py-2 rounded-lg"
              >
                {showForm ? 'Cancel' : '+ Add Blog'}
              </button>
            </div>

            {showForm && (
              <BlogForm
                blog={editingItem}
                onSuccess={() => {
                  setShowForm(false);
                  fetchBlogs();
                }}
                onCancel={() => setShowForm(false)}
              />
            )}

            <div className="grid gap-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="card p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                        {blog.featured && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            Featured
                          </span>
                        )}
                        {blog.trending && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                            Trending
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{blog.excerpt}</p>
                      <div className="flex gap-4 mt-3 text-sm text-gray-500">
                        <span>📂 {blog.category}</span>
                        <span>📖 {blog.readTime}</span>
                        <span>❤️ {blog.likes} likes</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete('blogs', blog._id)}
                        className="text-red-600 hover:text-red-800 px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <OrderList orders={orders} onRefresh={fetchOrders} />
        )}

        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <PersonalInfoForm />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;