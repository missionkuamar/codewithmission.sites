// components/cart/CartProgress.jsx
import React from 'react';

const CartProgress = () => {
  return (
    <div className="max-w-md mx-auto mt-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 text-center">
          <div className="w-8 h-8 mx-auto rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">1</div>
          <p className="text-xs mt-1">Cart</p>
        </div>
        <div className="flex-1 h-0.5 bg-gray-700"></div>
        <div className="flex-1 text-center opacity-50">
          <div className="w-8 h-8 mx-auto rounded-full bg-gray-700 flex items-center justify-center text-sm">2</div>
          <p className="text-xs mt-1">Checkout</p>
        </div>
        <div className="flex-1 h-0.5 bg-gray-700"></div>
        <div className="flex-1 text-center opacity-50">
          <div className="w-8 h-8 mx-auto rounded-full bg-gray-700 flex items-center justify-center text-sm">3</div>
          <p className="text-xs mt-1">Payment</p>
        </div>
      </div>
    </div>
  );
};

export default CartProgress;