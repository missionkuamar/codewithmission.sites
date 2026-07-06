// pages/AdminProjects.jsx - Main Projects Page
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { projectsApi } from '../services/projectsApi';
import ProjectStats from '../components/admin/projects/ProjectStats';
import ProjectSearchFilters from '../components/admin/projects/ProjectSearchFilters';
import ProjectsTable from '../components/admin/projects/ProjectsTable';
import ProjectPagination from '../components/admin/projects/ProjectPagination';
import ProjectModal from '../components/public/projects/ProjectModal';
import { AlertCircle, Plus } from 'lucide-react';


const AdminProjects = () => {
  const { currentTheme, currentMood } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setTimeout(() => {
      setProjects(projectsApi.getAll());
      setLoading(false);
    }, 500);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'published' && project.published) ||
      (statusFilter === 'draft' && !project.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, statusFilter]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const togglePublish = (id) => {
    setProjects(prev => prev.map(p =>
      p.id === id ? { ...p, published: !p.published } : p
    ));
    showNotification('Project status updated');
  };

  const toggleFeatured = (id) => {
    setProjects(prev => prev.map(p =>
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
    showNotification('Featured status updated');
  };

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
      showNotification('Project deleted successfully');
    }
  };

  const saveProject = (projectData) => {
    if (editingProject) {
      setProjects(prev => prev.map(p =>
        p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p
      ));
      showNotification('Project updated successfully');
    } else {
      const newProject = {
        ...projectData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
        sales: 0,
        revenue: 0
      };
      setProjects(prev => [newProject, ...prev]);
      showNotification('Project added successfully');
    }
    setShowProjectModal(false);
    setEditingProject(null);
  };

  const stats = {
    total: projects.length,
    published: projects.filter(p => p.published).length,
    draft: projects.filter(p => !p.published).length,
    featured: projects.filter(p => p.featured).length,
    totalRevenue: projects.reduce((sum, p) => sum + p.revenue, 0),
    totalSales: projects.reduce((sum, p) => sum + p.sales, 0),
    totalViews: projects.reduce((sum, p) => sum + p.views, 0),
    totalLikes: projects.reduce((sum, p) => sum + p.likes, 0)
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Project{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-sm opacity-75 mt-1">Manage your projects, products, and portfolio items</p>
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setShowProjectModal(true);
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Project
          </button>
        </div>

        <ProjectStats stats={stats} currentTheme={currentTheme} currentMood={currentMood} />

        <ProjectSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          currentTheme={currentTheme}
        />

        <ProjectsTable
          projects={currentProjects}
          loading={loading}
          currentTheme={currentTheme}
          onTogglePublish={togglePublish}
          onToggleFeatured={toggleFeatured}
          onDelete={deleteProject}
          onEdit={(project) => {
            setEditingProject(project);
            setShowProjectModal(true);
          }}
        />

        <ProjectPagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={filteredProjects.length}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          currentTheme={currentTheme}
        />

        {showProjectModal && (
          <ProjectModal
            project={editingProject}
            onClose={() => {
              setShowProjectModal(false);
              setEditingProject(null);
            }}
            onSave={saveProject}
            currentTheme={currentTheme}
          />
        )}

        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
            <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
              {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
              <span>{notification.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;