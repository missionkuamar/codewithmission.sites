// components/product/ProductTabs.jsx
import React from 'react';
import { Check, Star } from 'lucide-react';

const ProductTabs = ({ product, activeTab, setActiveTab, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} rounded-xl mb-12`}>
      <div className="flex flex-wrap gap-2 border-b border-gray-700 px-6">
        <button
          onClick={() => setActiveTab('description')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'description'
              ? 'text-purple-500 border-b-2 border-purple-500'
              : 'opacity-75 hover:text-purple-500'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('technologies')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'technologies'
              ? 'text-purple-500 border-b-2 border-purple-500'
              : 'opacity-75 hover:text-purple-500'
          }`}
        >
          Technologies
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'reviews'
              ? 'text-purple-500 border-b-2 border-purple-500'
              : 'opacity-75 hover:text-purple-500'
          }`}
        >
          Reviews ({product.reviews})
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About This Product</h3>
            <p className="opacity-80 leading-relaxed">{product.longDescription || product.description}</p>
            
            {product.features && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={16} className="text-green-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'technologies' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {product.technologies?.map((tech, index) => (
                <span key={index} className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className={i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-500'} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold">{product.rating}</span>
                </div>
                <p className="text-sm opacity-75">Based on {product.reviews} reviews</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:scale-105 transition-transform">
                Write a Review
              </button>
            </div>

            {product.sampleReviews?.map((review, index) => (
              <div key={index} className="border-b border-gray-700 pb-4">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-500'} />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm opacity-50">{review.date}</span>
                </div>
                <p className="text-sm opacity-80">{review.comment}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button className="text-xs opacity-60 hover:text-green-500 transition-colors">
                    Helpful ({review.helpful})
                  </button>
                  <button className="text-xs opacity-60 hover:text-red-500 transition-colors">
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;