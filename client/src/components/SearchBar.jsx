import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchProducts } from '../redux/slices/productSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setFilters({ search: value, page: 1 }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(fetchProducts({ ...filters, search: filters.search }));
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products by name or description..."
        value={filters.search}
        onChange={handleSearch}
        onKeyPress={handleKeyPress}
        className="input-field pl-10"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;