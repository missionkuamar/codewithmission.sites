// components/admin/AnalyticsTab.jsx
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Eye, Heart, Star } from 'lucide-react';

const AnalyticsTab = ({ currentTheme }) => {
  const [dateRange, setDateRange] = useState('7d');

  const analyticsData = {
    overview: {
      totalRevenue: 45678,
      revenueGrowth: 23.5,
      totalOrders: 345,
      ordersGrowth: 12.8,
      totalUsers: 1234,
      usersGrowth: 15.2,
      conversionRate: 3.2
    },
    dailyData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [1250, 1890, 1560, 2340, 2890, 3450, 1980],
      orders: [12, 18, 15, 22, 28, 32, 19],
      visitors: [320, 450, 380, 520, 590, 680, 420]
    },
    topProducts: [
      { name: "AI Analytics Dashboard", sales: 89, revenue: 4361, growth: 15 },
      { name: "E-Commerce Platform", sales: 45, revenue: 3555, growth: 22 },
      { name: "Social Media App", sales: 67, revenue: 6633, growth: 8 },
      { name: "Blockchain Wallet", sales: 34, revenue: 6766, growth: 45 }
    ],
    topCategories: [
      { name: "Web Development", percentage: 35, growth: 12 },
      { name: "AI/ML", percentage: 28, growth: 25 },
      { name: "Mobile App", percentage: 22, growth: 8 },
      { name: "Blockchain", percentage: 15, growth: 40 }
    ]
  };

  const maxRevenue = Math.max(...analyticsData.dailyData.revenue);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Analytics Dashboard</h2>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`${currentTheme.secondary} p-4 rounded-lg`}>
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={20} className="text-green-500" />
            <span className="text-xs text-green-500 flex items-center gap-1"><TrendingUp size={12} /> +{analyticsData.overview.revenueGrowth}%</span>
          </div>
          <p className="text-2xl font-bold">${(analyticsData.overview.totalRevenue / 1000).toFixed(1)}K</p>
          <p className="text-xs opacity-75">Total Revenue</p>
        </div>
        <div className={`${currentTheme.secondary} p-4 rounded-lg`}>
          <div className="flex items-center justify-between mb-2">
            <ShoppingBag size={20} className="text-blue-500" />
            <span className="text-xs text-green-500 flex items-center gap-1"><TrendingUp size={12} /> +{analyticsData.overview.ordersGrowth}%</span>
          </div>
          <p className="text-2xl font-bold">{analyticsData.overview.totalOrders}</p>
          <p className="text-xs opacity-75">Total Orders</p>
        </div>
        <div className={`${currentTheme.secondary} p-4 rounded-lg`}>
          <div className="flex items-center justify-between mb-2">
            <Users size={20} className="text-purple-500" />
            <span className="text-xs text-green-500 flex items-center gap-1"><TrendingUp size={12} /> +{analyticsData.overview.usersGrowth}%</span>
          </div>
          <p className="text-2xl font-bold">{analyticsData.overview.totalUsers}</p>
          <p className="text-xs opacity-75">Total Users</p>
        </div>
        <div className={`${currentTheme.secondary} p-4 rounded-lg`}>
          <div className="flex items-center justify-between mb-2">
            <Star size={20} className="text-yellow-500" />
            <span className="text-xs text-green-500">Conversion</span>
          </div>
          <p className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</p>
          <p className="text-xs opacity-75">Conversion Rate</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className={`${currentTheme.secondary} p-6 rounded-lg mb-8`}>
        <h3 className="font-semibold mb-4">Revenue Overview</h3>
        <div className="flex items-end justify-between h-48 gap-2">
          {analyticsData.dailyData.revenue.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-500 hover:opacity-80"
                style={{ height: `${(value / maxRevenue) * 100}%`, minHeight: '4px' }}
              />
              <span className="text-xs mt-2 opacity-60">{analyticsData.dailyData.labels[index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products and Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`${currentTheme.secondary} p-6 rounded-lg`}>
          <h3 className="font-semibold mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {analyticsData.topProducts.map((product, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{product.name}</span>
                  <span className="text-purple-500">${product.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs opacity-60 mb-1">
                  <span>{product.sales} sales</span>
                  <span className="text-green-500">+{product.growth}%</span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${(product.sales / 89) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${currentTheme.secondary} p-6 rounded-lg`}>
          <h3 className="font-semibold mb-4">Top Categories</h3>
          <div className="space-y-3">
            {analyticsData.topCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{category.name}</span>
                  <span>{category.percentage}%</span>
                </div>
                <div className="flex justify-between text-xs opacity-60 mb-1">
                  <span>Total sales</span>
                  <span className="text-green-500">+{category.growth}%</span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${category.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;