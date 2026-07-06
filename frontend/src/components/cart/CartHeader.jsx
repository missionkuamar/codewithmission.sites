// components/cart/CartHeader.jsx
import React from 'react';

const CartHeader = ({ itemCount }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Your{' '}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Shopping Cart
        </span>
      </h1>
      <p className="text-xl opacity-75">{itemCount} items in your cart</p>
    </div>
  );
};

export default CartHeader;