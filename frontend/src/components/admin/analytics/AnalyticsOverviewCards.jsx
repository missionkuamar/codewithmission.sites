// components/admin/analytics/AnalyticsOverviewCards.jsx
import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, Target, Clock, Eye, Star } from 'lucide-react';

const AnalyticsOverviewCards = ({ overview, currentTheme, currentMood }) => {
  const cards = [
    { 
      icon: <DollarSign size={22} />, 
      title: "Total Revenue", 
      value: `$${(overview.totalRevenue / 1000).toFixed(1)}K`,
      change: overview.revenueGrowth,
      color: "from-green-500 to-emerald-500",
      prefix: "$"
    },
    { 
      icon: <ShoppingBag size={22} />, 
      title: "Total Orders", 
      value: overview.totalOrders,
      change: overview.ordersGrowth,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <Users size={22} />, 
      title: "Total Users", 
      value: overview.totalUsers,
      change: overview.usersGrowth,
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: <Target size={22} />, 
      title: "Conversion Rate", 
      value: `${overview.conversionRate}%`,
      change: overview.conversionGrowth,
      color: "from-yellow-500 to-orange-500",
      suffix: "%"
    },
    { 
      icon: <TrendingUp size={22} />, 
      title: "Avg. Order Value", 
      value: `$${overview.avgOrderValue}`,
      change: overview.avgOrderGrowth,
      color: "from-indigo-500 to-purple-500"
    },
    { 
      icon: <Eye size={22} />, 
      title: "Bounce Rate", 
      value: `${overview.bounceRate}%`,
      change: overview.bounceRateChange,
      color: "from-red-500 to-rose-500",
      negativeGood: true
    },
    { 
      icon: <Clock size={22} />, 
      title: "Session Duration", 
      value: `${overview.sessionDuration}s`,
      change: overview.sessionGrowth,
      color: "from-teal-500 to-cyan-500"
    },
    { 
      icon: <Star size={22} />, 
      title: "Customer Rating", 
      value: "4.8",
      change: 0.3,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
      {cards.map((card, index) => (
        <div key={index} className={`${currentTheme.card} ${currentMood} p-3 transform hover:scale-105 transition-all duration-300`}>
          <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${card.color} mb-2`}>
            {card.icon}
          </div>
          <p className="text-xl font-bold">{card.value}</p>
          <p className="text-xs opacity-75">{card.title}</p>
          <p className={`text-xs ${card.change >= 0 ? 'text-green-500' : 'text-red-500'} mt-1`}>
            {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change)}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsOverviewCards;