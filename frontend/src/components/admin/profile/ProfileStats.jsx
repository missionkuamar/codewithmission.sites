// components/profile/ProfileStats.jsx
import React from 'react';
import { ShoppingBag, DollarSign, Heart, Calendar } from 'lucide-react';

const ProfileStats = ({ stats, currentTheme, currentMood }) => {
  const statCards = [
    { icon: <ShoppingBag size={22} />, value: stats.totalOrders, label: "Total Orders", color: "from-blue-500 to-cyan-500" },
    { icon: <DollarSign size={22} />, value: `$${stats.totalSpent.toLocaleString()}`, label: "Total Spent", color: "from-green-500 to-emerald-500" },
    { icon: <Heart size={22} />, value: stats.wishlistItems, label: "Wishlist Items", color: "from-red-500 to-rose-500" },
    { icon: <Calendar size={22} />, value: stats.memberSince?.split(',')[0], label: "Member Since", color: "from-purple-500 to-pink-500" }
  ];

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

export default ProfileStats;