// components/product/ProductInfo.jsx
import React from 'react';
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RefreshCw, Headphones, Minus, Plus } from 'lucide-react';

const ProductInfo = ({ 
  product, quantity, setQuantity, wishlist, 
  onAddToCart, onBuyNow, onToggleWishlist, onShare,
  currentTheme, currentMood 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-500">
            {product.category}
          </span>
          {product.featured && (
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-500">
              Featured
            </span>
          )}
          {product.inStock ? (
            <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">
              In Stock
            </span>
          ) : (
            <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-500">
              Out of Stock
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.title}</h1>
        
        {/* Rating */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-500'} />
            ))}
          </div>
          <span className="text-sm">{product.rating} out of 5</span>
          <span className="text-sm opacity-75">({product.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          {product.discount > 0 ? (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold text-purple-500">${product.price}</span>
              <span className="text-lg opacity-50 line-through">${product.originalPrice}</span>
              <span className="px-2 py-1 text-sm rounded-full bg-green-500/20 text-green-500">
                Save {product.discount}%
              </span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-purple-500">${product.price}</span>
          )}
        </div>

        {/* Description */}
        <p className="opacity-75 leading-relaxed mb-6">{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-semibold">Quantity:</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Minus size={18} />
            </button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={onAddToCart}
            disabled={!product.inStock}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
          <button
            onClick={onBuyNow}
            disabled={!product.inStock}
            className="flex-1 py-3 rounded-lg border-2 border-purple-500 text-purple-500 font-semibold hover:bg-purple-500 hover:text-white transition-colors disabled:opacity-50"
          >
            Buy Now
          </button>
          <button
            onClick={onToggleWishlist}
            className="p-3 rounded-lg border-2 border-gray-700 hover:border-red-500 transition-colors"
          >
            <Heart size={20} className={wishlist ? 'fill-red-500 text-red-500' : ''} />
          </button>
          <button
            onClick={onShare}
            className="p-3 rounded-lg border-2 border-gray-700 hover:border-blue-500 transition-colors"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Shipping Info */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-gray-800/50">
          <div className="flex items-center gap-2">
            <Truck size={18} className="text-purple-500" />
            <span className="text-sm">Free Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw size={18} className="text-purple-500" />
            <span className="text-sm">30-Day Returns</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-purple-500" />
            <span className="text-sm">Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones size={18} className="text-purple-500" />
            <span className="text-sm">24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;