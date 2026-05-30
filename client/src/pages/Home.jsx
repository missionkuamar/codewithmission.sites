import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, clearError } from '../redux/slices/productSlice';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import SearchBar from '../components/SearchBar';
import AdvancedSearch from '../components/AdvancedSearch';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error, filters } = useSelector((state) => state.products);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Search Section */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <SearchBar />
          </div>
          <AdvancedSearch />
        </div>

        {/* Product List */}
        <ProductList products={products} loading={loading} />

        {/* Pagination */}
        <Pagination />

        {/* Add Product Modal */}
        {showAddModal && (
          <ProductForm
            onClose={() => setShowAddModal(false)}
            isEditing={false}
          />
        )}
      </div>
    </div>
  );
};

export default Home;