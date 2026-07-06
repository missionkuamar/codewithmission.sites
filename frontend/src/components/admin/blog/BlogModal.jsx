// components/admin/blog/BlogModal.jsx
import React, { useState } from 'react';
import { X, Save, Loader, CloudUpload, Tag, Calendar, Clock, User, Mail, Globe, Settings } from 'lucide-react';

const BlogModal = ({ post, onClose, onSave, currentTheme }) => {
  const [formData, setFormData] = useState(post || {
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    image: '',
    featured: false,
    published: true,
    readTime: '5 min read',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = ['Web Development', 'React', 'JavaScript', 'TypeScript', 'Node.js', 'UI/UX Design', 'Database', 'DevOps', 'Security'];

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
      <div className={`${currentTheme.card} rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit">
          <h2 className="text-2xl font-bold">{post ? 'Edit Post' : 'Write New Post'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Post Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter catchy title..."
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Excerpt / Short Description</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Brief summary of your post..."
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="10"
                  placeholder="Write your post content here... (HTML supported)"
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none font-mono text-sm`}
                  required
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
                    placeholder="React, JavaScript, Tutorial"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
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
                <label className="block text-sm font-semibold mb-2">Read Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="5 min read"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Featured Image</label>
                <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed cursor-pointer hover:border-purple-500 transition-colors`}>
                  <CloudUpload size={20} />
                  <span>Upload Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                {formData.image && (
                  <div className="mt-3 relative group">
                    <img src={formData.image} alt="Featured" className="w-full h-32 object-cover rounded-lg" />
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: '' }))} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100">
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* SEO Section */}
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
                  <Settings size={16} /> SEO Settings
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">SEO Title</label>
                    <input
                      type="text"
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleChange}
                      placeholder="Leave blank to use post title"
                      className={`w-full px-3 py-1 text-sm rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">SEO Description</label>
                    <textarea
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Meta description for SEO"
                      className={`w-full px-3 py-1 text-sm rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">SEO Keywords</label>
                    <input
                      type="text"
                      name="seoKeywords"
                      value={formData.seoKeywords}
                      onChange={handleChange}
                      placeholder="keyword1, keyword2, keyword3"
                      className={`w-full px-3 py-1 text-sm rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                  <span>Feature this post</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
                  <span>Publish immediately</span>
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
              {post ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;