// components/orders/OrdersHeader.jsx
import React from 'react';
import { Package, Download, RefreshCw } from 'lucide-react';

const OrdersHeader = ({ currentTheme }) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
        <Package size={32} className="text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        My{' '}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Orders
        </span>
      </h1>
      <p className="text-xl opacity-75 max-w-2xl mx-auto">
        Track and manage all your orders in one place
      </p>
    </div>
  );
};

export default OrdersHeader;