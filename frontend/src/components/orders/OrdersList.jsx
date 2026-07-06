// components/orders/OrdersList.jsx
import React from 'react';
import { Eye, Package, Truck, CheckCircle, Clock, XCircle, ShoppingBag, RefreshCw } from 'lucide-react';

const OrdersList = ({ orders, currentTheme, currentMood, onViewDetails, onCancelOrder, onReorder }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <CheckCircle size={18} className="text-green-500" />;
      case 'shipped': return <Truck size={18} className="text-blue-500" />;
      case 'processing': return <Clock size={18} className="text-yellow-500" />;
      case 'cancelled': return <XCircle size={18} className="text-red-500" />;
      default: return <Package size={18} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-500/20 text-green-500';
      case 'shipped': return 'bg-blue-500/20 text-blue-500';
      case 'processing': return 'bg-yellow-500/20 text-yellow-500';
      case 'cancelled': return 'bg-red-500/20 text-red-500';
      default: return 'bg-gray-500/20';
    }
  };

  if (orders.length === 0) {
    return (
      <div className={`${currentTheme.card} ${currentMood} p-12 text-center`}>
        <ShoppingBag size={64} className="mx-auto opacity-30 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No orders found</h3>
        <p className="opacity-75 mb-4">You haven't placed any orders yet</p>
        <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className={`${currentTheme.card} ${currentMood} overflow-hidden hover:scale-102 transition-all`}>
          {/* Order Header */}
          <div className={`p-4 border-b ${currentTheme.border} flex flex-wrap justify-between items-center gap-4`}>
            <div>
              <p className="font-mono text-sm">Order #{order.id}</p>
              <p className="text-sm opacity-75">{order.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <span className="text-sm">{order.paymentMethod}</span>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-purple-500">${order.total.toFixed(2)}</p>
              <p className="text-xs opacity-75">{order.items.length} items</p>
            </div>
          </div>

          {/* Order Items Preview */}
          <div className="p-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {order.items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2 min-w-[180px]">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs opacity-75">${item.price} x {item.quantity}</p>
                  </div>
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="flex items-center justify-center bg-gray-800/50 rounded-lg p-2 min-w-[80px]">
                  <span className="text-sm">+{order.items.length - 3} more</span>
                </div>
              )}
            </div>

            {/* Order Actions */}
            <div className="flex gap-3 mt-4 pt-3 border-t border-gray-700">
              <button
                onClick={() => onViewDetails(order)}
                className="flex-1 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <Eye size={16} /> View Details
              </button>
              {order.status !== 'cancelled' && order.status !== 'delivered' && (
                <button
                  onClick={() => onCancelOrder(order.id)}
                  className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  Cancel
                </button>
              )}
              {order.status === 'delivered' && (
                <button
                  onClick={() => onReorder(order)}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <RefreshCw size={16} /> Reorder
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;