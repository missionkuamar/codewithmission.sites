// components/admin/settings/SeoSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Globe, Search, Code, FileText } from 'lucide-react';

const SeoSettings = ({ settings, onSave, loading, currentTheme }) => {
  const [formData, setFormData] = useState(settings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('seo', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Meta Title</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
          <p className="text-xs opacity-60 mt-1">Recommended length: 50-60 characters</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Meta Description</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 opacity-50" size={18} />
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows="3"
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
          <p className="text-xs opacity-60 mt-1">Recommended length: 150-160 characters</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Meta Keywords</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              name="metaKeywords"
              value={formData.metaKeywords}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Google Analytics ID</label>
          <div className="relative">
            <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              name="googleAnalytics"
              value={formData.googleAnalytics}
              onChange={handleChange}
              placeholder="UA-XXXXX-X"
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Google Tag Manager ID</label>
          <input
            type="text"
            name="googleTagManager"
            value={formData.googleTagManager}
            onChange={handleChange}
            placeholder="GTM-XXXXX"
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
          />
        </div>
      </div>
      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input type="checkbox" name="enableSitemap" checked={formData.enableSitemap} onChange={handleChange} />
          <span>Enable XML Sitemap</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="enableRobots" checked={formData.enableRobots} onChange={handleChange} />
          <span>Enable robots.txt</span>
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default SeoSettings;