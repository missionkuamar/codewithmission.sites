// components/admin/projects/ProjectModal.jsx
import React, { useState } from 'react';
import { X, Save, Loader, CloudUpload, Tag, DollarSign, Link, Github, Youtube } from 'lucide-react';

const ProjectModal = ({ project, onClose, onSave, currentTheme }) => {
  const [formData, setFormData] = useState(project || {
    title: '',
    description: '',
    price: '',
    category: '',
    tags: [],
    images: [],
    liveLink: '',
    githubLink: '',
    videoLink: '',
    featured: false,
    published: true,
    discount: 0,
    technologies: []
  });
  const [loading, setLoading] = useState(false);

  const categories = ['Web Development', 'Mobile App', 'E-commerce', 'AI/ML', 'Blockchain', 'IoT', 'Cloud Services'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleTechnologiesChange = (e) => {
    const techs = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setFormData(prev => ({ ...prev, technologies: techs }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [reader.result, ...prev.images]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave(formData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className={`${currentTheme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit">
          <h2 className="text-2xl font-bold">{project ? 'Edit Project' : 'Add New Project'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Project Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Price *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tags (comma separated)</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
                  <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={handleTagsChange}
                    placeholder="React, Node.js, MongoDB"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies.join(', ')}
                  onChange={handleTechnologiesChange}
                  placeholder="React, Node.js, MongoDB"
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Live Demo Link</label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
                  <input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">GitHub Link</label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Image Upload</label>
                <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed cursor-pointer hover:border-purple-500 transition-colors`}>
                  <CloudUpload size={20} />
                  <span>Upload Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt="Preview" className="w-full h-20 object-cover rounded-lg" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                  <span>Featured Project</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
                  <span>Publish Now</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 flex items-center gap-2">
              {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
              {project ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;