// components/product/ProductSkeleton.jsx
import React from 'react';

const ProductSkeleton = ({ currentTheme }) => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Breadcrumb Skeleton */}
          <div className="h-4 bg-gray-700 rounded w-64 mb-6"></div>
          
          {/* Main Content Skeleton */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-xl h-96"></div>
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-700 rounded-lg w-20 h-20"></div>
                ))}
              </div>
            </div>
            
            {/* Product Info Skeleton */}
            <div className="space-y-4">
              <div className="h-8 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              <div className="h-6 bg-gray-700 rounded w-1/3"></div>
              <div className="h-24 bg-gray-700 rounded"></div>
              <div className="h-10 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
          
          {/* Tabs Skeleton */}
          <div className="bg-gray-800 rounded-xl">
            <div className="flex gap-4 p-4 border-b border-gray-700">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-gray-700 rounded w-24"></div>
              ))}
            </div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-700 rounded w-48"></div>
              <div className="h-20 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;