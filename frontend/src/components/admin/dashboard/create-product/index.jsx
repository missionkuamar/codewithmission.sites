// index.jsx (Main ProductModal)
import React from 'react';
import { X } from 'lucide-react';
import ProductForm from './components/ProductForm';

const ProductModal = ({ product, onClose, currentTheme, onSave }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className={`${currentTheme.card} rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit z-10">
          <h2 className="text-2xl font-bold">
            {product ? 'Edit Product' : 'Create New Product'}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        <ProductForm 
          product={product} 
          onClose={onClose} 
          currentTheme={currentTheme}
          onSave={onSave} // ✅ Pass onSave to ProductForm
        />
      </div>
    </div>
  );
};

export default ProductModal;