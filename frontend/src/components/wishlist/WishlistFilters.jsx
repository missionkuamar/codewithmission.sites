// components/wishlist/WishlistFilters.jsx
import React from 'react';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';

const WishlistFilters = ({ 
  filter, setFilter, 
  searchTerm, setSearchTerm,
  sortBy, setSortBy,
  viewMode, setViewMode,
  categories, 
  currentTheme 
}) => {
  return (
    <div className={`${currentTheme.card} p-4 mb-6`}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="text"
            placeholder="Search wishlist items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
        >
          <option value="date">Recently Added</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : currentTheme.secondary}`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : currentTheme.secondary}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistFilters;