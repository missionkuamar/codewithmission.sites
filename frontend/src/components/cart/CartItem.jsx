// components/cart/CartItem.jsx
import React from 'react';
import { Minus, Plus, Heart, Trash2, Star } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove, onMoveToSaved }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-800 rounded-lg">
      {/* Product Image */}
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg mx-auto sm:mx-0" />
        {item.badge && (
          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded-full">
            {item.badge}
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-400">{item.category}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center">
            <Star size={14} className="fill-yellow-500 text-yellow-500" />
            <span className="text-sm ml-1">{item.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({item.reviews} reviews)</span>
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          <button onClick={() => onMoveToSaved(item)} className="text-sm text-purple-500 hover:text-purple-400">
            Save for later
          </button>
          <button onClick={() => onRemove(item.id)} className="text-sm text-red-500 hover:text-red-400">
            Remove
          </button>
        </div>
      </div>
      
      {/* Price */}
      <div className="text-center sm:text-right">
        <div className="text-xl font-bold text-purple-500">${item.price}</div>
        {item.originalPrice > item.price && (
          <div className="text-sm line-through text-gray-500">${item.originalPrice}</div>
        )}
      </div>
      
      {/* Quantity */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded-lg hover:bg-gray-700"
        >
          <Minus size={16} />
        </button>
        <span className="w-10 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-lg hover:bg-gray-700"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;