// components/product/ProductBreadcrumb.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';

const ProductBreadcrumb = ({ productTitle, navigate, currentTheme }) => {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <button onClick={() => navigate('/')} className="hover:text-purple-500 transition-colors">
        Home
      </button>
      <ChevronRight size={14} className="opacity-50" />
      <button onClick={() => navigate('/projects')} className="hover:text-purple-500 transition-colors">
        Projects
      </button>
      <ChevronRight size={14} className="opacity-50" />
      <span className="text-purple-500">{productTitle}</span>
    </div>
  );
};

export default ProductBreadcrumb;