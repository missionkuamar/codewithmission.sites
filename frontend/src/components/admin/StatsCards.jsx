// components/admin/StatsCards.jsx
import React from 'react';
import { ShoppingBag, Users, DollarSign, TrendingUp, ShoppingCart, Star } from 'lucide-react';

const iconMap = {
  ShoppingBag: ShoppingBag,
  Users: Users,
  DollarSign: DollarSign,
  TrendingUp: TrendingUp,
  ShoppingCart: ShoppingCart,
  Star: Star
};

const StatsCards = ({ stats, currentTheme, currentMood }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon];
        return (
          <div key={index} className={`${currentTheme.card} ${currentMood} p-4 transform hover:scale-105 transition-all duration-300`}>
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-2`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-75">{stat.label}</p>
            <p className="text-xs text-green-500 mt-1">{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;