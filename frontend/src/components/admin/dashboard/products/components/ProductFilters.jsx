// admin/dashboard/products/components/ProductFilters.jsx
import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'e-commerce', label: 'E-Commerce' },
  { value: 'ai-ml', label: 'AI/ML' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'iot', label: 'IoT' },
  { value: 'cloud-services', label: 'Cloud Services' },
  { value: 'design', label: 'Design' },
];

const TYPES = [
  { value: '', label: 'All Types' },
  { value: 'single', label: 'Single Image' },
  { value: 'gallery', label: 'Gallery' },
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'price', label: 'Price' },
  { value: 'title', label: 'Title' },
  { value: 'views', label: 'Views' },
  { value: 'likes', label: 'Likes' },
];

export const ProductFilters = ({ filters, onFilterChange, theme, loading }) => {
  const handleSearch = (e) => {
    onFilterChange({ search: e.target.value });
  };

  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      category: '',
      type: '',
      featured: '',
      inStock: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    v => v !== '' && v !== null && v !== 'createdAt' && v !== 'desc'
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="text"
            placeholder="Search by title, description, tags..."
            value={filters.search}
            onChange={handleSearch}
            disabled={loading}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50`}
          />
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition flex items-center gap-2"
          >
            <X size={16} /> Clear Filters
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          disabled={loading}
          className={`px-3 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50`}
        >
          {CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          disabled={loading}
          className={`px-3 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50`}
        >
          {TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        <select
          value={filters.featured}
          onChange={(e) => handleFilterChange('featured', e.target.value)}
          disabled={loading}
          className={`px-3 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50`}
        >
          <option value="">Featured Status</option>
          <option value="true">Featured</option>
          <option value="false">Not Featured</option>
        </select>

        <select
          value={filters.inStock}
          onChange={(e) => handleFilterChange('inStock', e.target.value)}
          disabled={loading}
          className={`px-3 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50`}
        >
          <option value="">Stock Status</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          disabled={loading}
          className={`px-3 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50`}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={filters.sortOrder}
          onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
          disabled={loading}
          className={`px-3 py-2 rounded-lg ${theme.secondary} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50`}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
};