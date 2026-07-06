// components/orders/OrdersStats.jsx
import React from 'react';
import { ShoppingBag, CheckCircle, Truck, Clock, XCircle, DollarSign } from 'lucide-react';

const OrdersStats = ({ stats, currentTheme, currentMood }) => {
  const statCards = [
    { icon: <ShoppingBag size={22} />, value: stats.total, label: "Total Orders", color: "from-blue-500 to-cyan-500" },
    { icon: <CheckCircle size={22} />, value: stats.delivered, label: "Delivered", color: "from-green-500 to-emerald-500" },
    { icon: <Truck size={22} />, value: stats.shipped, label: "Shipped", color: "from-purple-500 to-pink-500" },
    { icon: <Clock size={22} />, value: stats.processing, label: "Processing", color: "from-yellow-500 to-orange-500" },
    { icon: <XCircle size={22} />, value: stats.cancelled, label: "Cancelled", color: "from-red-500 to-rose-500" },
    { icon: <DollarSign size={22} />, value: `$${stats.totalRevenue.toLocaleString()}`, label: "Total Spent", color: "from-green-500 to-emerald-500" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className={`${currentTheme.card} ${currentMood} p-4 text-center transform hover:scale-105 transition-all`}>
          <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-2`}>
            {stat.icon}
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-xs opacity-75">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default OrdersStats;