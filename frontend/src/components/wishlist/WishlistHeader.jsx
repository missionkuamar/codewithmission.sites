// components/wishlist/WishlistHeader.jsx
import React from 'react';
import { Heart, Trash2, ShoppingCart, Share2 } from 'lucide-react';

const WishlistHeader = ({ itemCount, onClearAll, onMoveAllToCart, onShare, currentTheme }) => {
  return (
    <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
      <div>
        <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
          <Heart size={32} className="text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          My{' '}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Wishlist
          </span>
        </h1>
        <p className="text-xl opacity-75 max-w-2xl mt-2">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} saved for later
        </p>
      </div>
      <div className="flex gap-3">
        {itemCount > 0 && (
          <>
            <button
              onClick={onMoveAllToCart}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={18} /> Move All to Cart
            </button>
            <button
              onClick={onClearAll}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 size={18} /> Clear All
            </button>
            <button
              onClick={onShare}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Share2 size={18} /> Share
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistHeader;