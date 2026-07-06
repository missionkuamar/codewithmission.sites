// components/admin/blog/BlogSearchFilters.jsx
import React from 'react';
import { Search, Filter } from 'lucide-react';

const BlogSearchFilters = ({ 
  searchTerm, setSearchTerm, 
  categoryFilter, setCategoryFilter, 
  statusFilter, setStatusFilter, 
  currentTheme 
}) => {
  const categories = ['all', 'Web Development', 'React', 'JavaScript', 'TypeScript', 'Node.js', 'UI/UX Design', 'Database', 'DevOps', 'Security'];
  const statuses = ['all', 'published', 'draft'];

  return (
    <div className={`${currentTheme.card} p-4 mb-6`}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="text"
            placeholder="Search posts by title, excerpt, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BlogSearchFilters;