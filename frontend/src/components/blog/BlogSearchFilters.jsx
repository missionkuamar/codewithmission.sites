// components/blog/BlogSearchFilters.jsx
import React from 'react';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';

const BlogSearchFilters = ({
  searchTerm, setSearchTerm,
  viewMode, setViewMode,
  sortBy, setSortBy,
  itemsPerPage, setItemsPerPage,
  showFilters, setShowFilters,
  selectedCategory, setSelectedCategory,
  categories, currentTheme
}) => {
  return (
    <div className={`${currentTheme.card} ${currentTheme.secondary} p-4 mb-8 sticky top-20 z-40`}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={20} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>

        <div className="flex gap-2">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-800'}`}>
            <Grid size={20} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-800'}`}>
            <List size={20} />
          </button>
        </div>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
          <option value="trending">Most Viewed</option>
          <option value="comments">Most Comments</option>
        </select>

        <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage?.(1); }} className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
          <option value={6}>Show 6</option>
          <option value={9}>Show 9</option>
          <option value={12}>Show 12</option>
        </select>

        <button onClick={() => setShowFilters(!showFilters)} className={`px-4 py-2 rounded-lg flex items-center gap-2 ${showFilters ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-800'}`}>
          <Filter size={20} /> Categories <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1 rounded-full text-sm capitalize transition-all ${selectedCategory === cat ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSearchFilters;