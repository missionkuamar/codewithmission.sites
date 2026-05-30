import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchProducts, resetFilters } from '../redux/slices/productSlice';

const AdvancedSearch = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  const categories = ['', 'Electronics', 'Clothing', 'Books', 'Food', 'Other'];
  const sortOptions = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'price', label: 'Price' },
    { value: 'name', label: 'Name' },
    { value: 'stock', label: 'Stock' },
  ];

  const handleApplyFilters = () => {
    dispatch(setFilters({ ...localFilters, page: 1 }));
    dispatch(fetchProducts({ ...filters, ...localFilters, page: 1 }));
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetValues = {
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    setLocalFilters(resetValues);
    dispatch(resetFilters());
    dispatch(fetchProducts({ ...resetFilters, page: 1 }));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Advanced Search
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 p-4">
          <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={localFilters.category}
              onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value })}
              className="input-field"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat || 'All Categories'}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={localFilters.minPrice}
                onChange={(e) => setLocalFilters({ ...localFilters, minPrice: e.target.value })}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Max"
                value={localFilters.maxPrice}
                onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={localFilters.sortBy}
              onChange={(e) => setLocalFilters({ ...localFilters, sortBy: e.target.value })}
              className="input-field"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <div className="flex gap-2">
              <button
                onClick={() => setLocalFilters({ ...localFilters, sortOrder: 'asc' })}
                className={`flex-1 px-3 py-2 rounded-lg ${
                  localFilters.sortOrder === 'asc'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Ascending
              </button>
              <button
                onClick={() => setLocalFilters({ ...localFilters, sortOrder: 'desc' })}
                className={`flex-1 px-3 py-2 rounded-lg ${
                  localFilters.sortOrder === 'desc'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Descending
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={handleApplyFilters} className="btn-primary flex-1">
              Apply Filters
            </button>
            <button onClick={handleReset} className="btn-secondary">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;