// components/wishlist/WishlistGrid.jsx
import React from 'react';
import { Heart, ShoppingCart, Star, TrendingDown, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistGrid = ({ items, viewMode, currentTheme, currentMood, onRemove, onMoveToCart, onAddToCart }) => {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className={`${currentTheme.card} ${currentMood} overflow-hidden transform hover:scale-105 transition-all duration-300 group`}>
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
              {item.discount > 0 && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full flex items-center gap-1">
                  <TrendingDown size={12} /> {item.discount}% OFF
                </div>
              )}
              <button
                onClick={() => onRemove(item.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-red-500 transition-colors"
              >
                <Heart size={16} className="fill-red-500 text-red-500" />
              </button>
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Out of Stock</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                  <p className="text-xs opacity-75">{item.category}</p>
                </div>
                <div className="flex items-center">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                  <span className="text-sm ml-1">{item.rating}</span>
                  <span className="text-xs opacity-50 ml-1">({item.reviews})</span>
                </div>
              </div>
              <p className="text-sm opacity-75 mb-3 line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-purple-500">${item.price}</span>
                {item.originalPrice > item.price && (
                  <span className="text-sm opacity-50 line-through">${item.originalPrice}</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onMoveToCart(item)}
                  disabled={!item.inStock}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={16} /> Move to Cart
                </button>
                <Link to={`/product/${item.id}`} className="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Eye size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className={`${currentTheme.card} ${currentMood} p-4 hover:scale-102 transition-all`}>
          <div className="flex flex-col md:flex-row gap-4">
            <img src={item.image} alt={item.name} className="w-full md:w-40 h-32 object-cover rounded-lg" />
            <div className="flex-1">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm opacity-75">{item.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <Star size={14} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-sm ml-1">{item.rating}</span>
                    </div>
                    <span className="text-xs opacity-50">{item.reviews} reviews</span>
                    {item.discount > 0 && (
                      <span className="text-xs text-green-500">{item.discount}% off</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-500">${item.price}</div>
                  {item.originalPrice > item.price && (
                    <div className="text-sm opacity-50 line-through">${item.originalPrice}</div>
                  )}
                </div>
              </div>
              <p className="text-sm opacity-75 mt-2 line-clamp-2">{item.description}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onMoveToCart(item)}
                  disabled={!item.inStock}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50"
                >
                  <ShoppingCart size={14} /> Move to Cart
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="px-4 py-1.5 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  Remove
                </button>
                <Link to={`/product/${item.id}`} className="px-4 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistGrid;