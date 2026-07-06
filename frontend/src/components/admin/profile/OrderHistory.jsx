// components/profile/OrderHistory.jsx
import React, { useState } from 'react';
import { Eye, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

const OrderHistory = ({ orders, currentTheme }) => {
  const [filter, setFilter] = useState('all');

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'shipped': return <Truck size={16} className="text-blue-500" />;
      case 'processing': return <Clock size={16} className="text-yellow-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return <Package size={16} />;
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

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const statuses = ['all', 'delivered', 'shipped', 'processing', 'cancelled'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-xl font-bold">Order History</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <div key={order.id} className={`${currentTheme.secondary} p-4 rounded-lg hover:scale-102 transition-all`}>
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <p className="font-mono text-sm">Order #{order.id}</p>
                <p className="text-sm opacity-75">{order.date}</p>
                <p className="text-sm mt-1">{order.items} items</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-purple-500">${order.total.toFixed(2)}</p>
                <p className="text-sm">{order.paymentMethod}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)} {order.status}
                </span>
                <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Eye size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto opacity-30 mb-3" />
          <p className="opacity-75">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;