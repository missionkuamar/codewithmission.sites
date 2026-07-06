// components/product/ProductNotFound.jsx
import React from 'react';
import { Package } from 'lucide-react';

const ProductNotFound = ({ navigate, currentTheme }) => {
  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <div className="text-center">
        <Package size={64} className="mx-auto opacity-30 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="opacity-75 mb-6">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/projects')}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          Back to Projects
        </button>
      </div>
    </div>
  );
};

export default ProductNotFound;