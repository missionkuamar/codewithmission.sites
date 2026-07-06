// components/cart/OrderSummary.jsx
import React from 'react';
import { Shield, CreditCard, Loader, Tag, Truck, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSummary = ({ 
  subtotal, savings, discount, shipping, tax, total, 
  couponApplied, couponCode, onCouponChange, onApplyCoupon,
  loading, onCheckout
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      {/* Coupon */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Coupon code"
            value={couponCode}
            onChange={onCouponChange}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={onApplyCoupon}
            className="px-4 py-2 bg-purple-600 rounded-lg text-sm hover:bg-purple-700"
          >
            Apply
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Try: SAVE10, SAVE20, WELCOME15</p>
      </div>
      
      {/* Price Breakdown */}
      <div className="space-y-2 border-b border-gray-700 pb-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-green-500">
          <span>Savings</span>
          <span>-${savings.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <span>Coupon Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Total */}
      <div className="flex justify-between mt-4 pb-4 border-b border-gray-700">
        <span className="text-lg font-bold">Total</span>
        <span className="text-2xl font-bold text-purple-500">
          ${total.toFixed(2)}
        </span>
      </div>
      
      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={loading}
        className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <Loader size={20} className="animate-spin" /> : <CreditCard size={20} />}
        {loading ? 'Processing...' : 'Proceed to Checkout'}
      </button>
      
      {/* Guarantee */}
      <div className="mt-4 text-center text-xs text-gray-500">
        <Shield size={16} className="inline mr-1" />
        Secure checkout · 30-day money-back guarantee
      </div>
    </div>
  );
};

export default OrderSummary;