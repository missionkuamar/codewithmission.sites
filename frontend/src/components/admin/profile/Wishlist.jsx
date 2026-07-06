// components/profile/Wishlist.jsx
import React from 'react';
import { Trash2, ShoppingCart, Star, Heart } from 'lucide-react';

const Wishlist = ({ wishlist, setWishlist, currentTheme, showNotification }) => {
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
    showNotification('Removed from wishlist');
  };

  const moveToCart = (item) => {
    showNotification(`Added ${item.name} to cart`);
    removeFromWishlist(item.id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">My Wishlist ({wishlist.length} items)</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={48} className="mx-auto opacity-30 mb-3" />
          <p className="opacity-75">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className={`${currentTheme.secondary} rounded-lg overflow-hidden hover:scale-105 transition-all`}>
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm opacity-75">{item.category}</p>
                  </div>
                  <button onClick={() => removeFromWishlist(item.id)} className="p-1 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-2">
                  <span className="text-xl font-bold text-purple-500">${item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm opacity-50 line-through ml-2">${item.originalPrice}</span>
                  )}
                </div>
                <button
                  onClick={() => moveToCart(item)}
                  className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;