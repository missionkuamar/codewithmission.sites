// frontend/src/components/admin/ProjectForm.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const ProjectForm = ({ project, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    tags: project?.tags?.join(', ') || '',
    image: project?.image || '',
    liveLink: project?.liveLink || '',
    videoLink: project?.videoLink || '',
    githubLink: project?.githubLink || '',
    price: project?.price || 0,
    category: project?.category || '',
    featured: project?.featured || false,
    trending: project?.trending || false,
    technologies: project?.technologies?.join(', ') || '',
    isPublic: project?.isPublic || false,
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      
      // Append all fields as strings (they will be parsed on the backend)
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('longDescription', formData.longDescription || formData.description);
      form.append('tags', formData.tags); // Send as comma-separated string
      form.append('image', formData.image || '');
      form.append('liveLink', formData.liveLink || '');
      form.append('videoLink', formData.videoLink || '');
      form.append('githubLink', formData.githubLink || '');
      form.append('price', formData.price.toString());
      form.append('category', formData.category);
      form.append('featured', formData.featured ? 'true' : 'false');
      form.append('trending', formData.trending ? 'true' : 'false');
      form.append('technologies', formData.technologies); // Send as comma-separated string
      form.append('isPublic', formData.isPublic ? 'true' : 'false');
      
      if (file) {
        form.append('file', file);
      }

    //  console.log('Sending form data...');
      for (let [key, value] of form.entries()) {
       // console.log(key, value);
      }

      const url = project 
        ? `/projects/${project._id}` 
        : '/projects';
      
      const method = project ? 'put' : 'post';
      
      const { data } = await api[method](url, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(project ? 'Project updated!' : 'Project created!');
      onSuccess();
    } catch (error) {
     // console.error('Form submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {project ? 'Edit Project' : 'Create New Project'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Long Description
          </label>
          <textarea
            value={formData.longDescription}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Detailed description of the project"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Live Link
            </label>
            <input
              type="url"
              value={formData.liveLink}
              onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video Link
            </label>
            <input
              type="url"
              value={formData.videoLink}
              onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Link
          </label>
          <input
            type="url"
            value={formData.githubLink}
            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="React, Node.js, MongoDB"
          />
          <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="React 18, Node.js, MongoDB"
          />
          <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP File {!project && '*'}
          </label>
          <input
            type="file"
            accept=".zip"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-lg"
            required={!project}
          />
          {project && (
            <p className="text-sm text-gray-500 mt-1">
              Current file: {project.zipFileName}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.trending}
              onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="text-sm">Trending</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="text-sm">Free/Public</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;