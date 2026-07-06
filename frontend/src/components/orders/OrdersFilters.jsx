// components/orders/OrdersFilters.jsx
import React from 'react';
import { Search, Filter } from 'lucide-react';

const OrdersFilters = ({ filter, setFilter, searchTerm, setSearchTerm, currentTheme }) => {
  const filters = [
    { value: 'all', label: 'All Orders' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'processing', label: 'Processing' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
        <input
          type="text"
          placeholder="Search by order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              filter === f.value
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : `${currentTheme.secondary} hover:bg-gray-700`
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdersFilters;