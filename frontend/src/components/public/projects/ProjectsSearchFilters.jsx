// components/projects/ProjectsSearchFilters.jsx
import React from 'react';
import { Search, Filter, Grid, List, ChevronDown, X } from 'lucide-react';

const ProjectsSearchFilters = ({
  searchTerm, 
  setSearchTerm,
  viewMode, 
  setViewMode,
  sortBy, 
  setSortBy,
  itemsPerPage, 
  setItemsPerPage,
  showFilters, 
  setShowFilters,
  selectedTags, 
  toggleTag,
  allTags, 
  clearFilters,
  currentTheme,
  setCurrentPage
}) => {
  return (
    <div className={`${currentTheme.card} ${currentTheme.secondary} p-4 mb-8 rounded-xl`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={20} />
          <input
            type="text"
            placeholder="Search by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage?.(1);
            }}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : currentTheme.secondary
            }`}
          >
            <Grid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : currentTheme.secondary
            }`}
          >
            <List size={20} />
          </button>
        </div>

        {/* Sort Dropdown */}
        <select 
          value={sortBy} 
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage?.(1);
          }} 
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
          <option value="views">Most Viewed</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>

        {/* Items Per Page */}
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-75">Show:</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => { 
              setItemsPerPage(Number(e.target.value)); 
              setCurrentPage?.(1); 
            }} 
            className={`px-2 py-1 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
          >
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>

        {/* Filter Toggle Button */}
        <button 
          onClick={() => setShowFilters(!showFilters)} 
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            showFilters 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
              : currentTheme.secondary
          }`}
        >
          <Filter size={20} /> 
          Filters 
          <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Tags */}
      {showFilters && allTags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button 
                key={tag} 
                onClick={() => toggleTag(tag)} 
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedTags.includes(tag) 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : currentTheme.secondary
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
          {(searchTerm || selectedTags.length > 0) && (
            <button 
              onClick={clearFilters} 
              className="mt-3 text-sm text-purple-500 hover:text-purple-400 flex items-center gap-1"
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsSearchFilters;