// components/wishlist/WishlistStats.jsx
import React from 'react';
import { Heart, TrendingUp, DollarSign, Star } from 'lucide-react';

const WishlistStats = ({ wishlist, currentTheme, currentMood }) => {
  const stats = {
    totalItems: wishlist.length,
    totalValue: wishlist.reduce((sum, item) => sum + item.price, 0),
    totalSavings: wishlist.reduce((sum, item) => sum + (item.originalPrice - item.price), 0),
    avgRating: (wishlist.reduce((sum, item) => sum + item.rating, 0) / wishlist.length || 0).toFixed(1)
  };

  const statCards = [
    { icon: <Heart size={22} />, value: stats.totalItems, label: "Total Items", color: "from-red-500 to-rose-500" },
    { icon: <DollarSign size={22} />, value: `$${stats.totalValue.toLocaleString()}`, label: "Total Value", color: "from-green-500 to-emerald-500" },
    { icon: <TrendingUp size={22} />, value: `$${stats.totalSavings.toLocaleString()}`, label: "Total Savings", color: "from-blue-500 to-cyan-500" },
    { icon: <Star size={22} />, value: stats.avgRating, label: "Avg Rating", color: "from-yellow-500 to-orange-500" }
  ];

  if (wishlist.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

export default WishlistStats;