// components/product/RelatedProducts.jsx
import React from 'react';
import { Star } from 'lucide-react';

const RelatedProducts = ({ products, navigate, currentTheme, currentMood }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((related) => (
          <div
            key={related.id}
            onClick={() => navigate(`/projects/${related.id}`)}
            className={`${currentTheme.card} ${currentMood} rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300`}
          >
            <img src={related.image} alt={related.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold line-clamp-1">{related.title}</h3>
              <p className="text-sm opacity-75 mb-2">{related.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-purple-500">${related.price}</span>
                <div className="flex items-center">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                  <span className="text-sm ml-1">{related.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;