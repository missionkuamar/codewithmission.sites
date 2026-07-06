// components/wishlist/WishlistEmpty.jsx
import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistEmpty = ({ currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-12 text-center`}>
      <Heart size={80} className="mx-auto opacity-30 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
      <p className="opacity-75 mb-6">Save your favorite items here for later purchase</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform"
        >
          Browse Products <ArrowRight size={18} />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-transform"
        >
          Continue Shopping <ShoppingBag size={18} />
        </Link>
      </div>
    </div>
  );
};

export default WishlistEmpty;