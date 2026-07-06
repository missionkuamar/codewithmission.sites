// components/FormFields.jsx
import React from 'react';

const CATEGORIES = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'e-commerce', label: 'E-Commerce' },
  { value: 'ai-ml', label: 'AI/ML' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'iot', label: 'IoT' },
  { value: 'cloud-services', label: 'Cloud Services' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' }
];

export const FormFields = ({ formData, handleChange, theme }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          placeholder="Enter product title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Price ($) *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          placeholder="0.00"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Category *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
        >
          {CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Gallery Type *</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
        >
          <option value="single">Single Image</option>
          <option value="gallery">Multiple Images Gallery</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Tags (comma separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          placeholder="react, javascript, web-dev"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold mb-2">Live Demo URL</label>
          <input
            type="url"
            name="liveDemoUrl"
            value={formData.liveDemoUrl}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="https://demo.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={`w-full px-4 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          placeholder="Detailed description of your product"
          required
        />
      </div>
    </div>
  );
};