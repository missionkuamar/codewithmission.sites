// admin/dashboard/products/components/ProductStats.jsx
import React from 'react';
import { Package, TrendingUp, DollarSign, Star } from 'lucide-react';

export const ProductStats = ({ products, theme }) => {
  const totalProducts = products.length;
  const inStock = products.filter(p => p.inStock).length;
  const featured = products.filter(p => p.featured).length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * (p.sales || 0)), 0);

  const stats = [
    {
      icon: Package,
      label: 'Total Products',
      value: totalProducts,
      color: 'text-blue-500',
      bg: 'bg-blue-500/20',
    },
    {
      icon: TrendingUp,
      label: 'In Stock',
      value: inStock,
      color: 'text-green-500',
      bg: 'bg-green-500/20',
    },
    {
      icon: Star,
      label: 'Featured',
      value: featured,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/20',
    },
    {
      icon: DollarSign,
      label: 'Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      color: 'text-purple-500',
      bg: 'bg-purple-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${theme.card} p-4 rounded-xl transition-all hover:scale-105`}
        >
          <div className="flex items-center gap-3">
            <div className={`${stat.bg} p-2 rounded-lg`}>
              <stat.icon className={stat.color} size={20} />
            </div>
            <div>
              <p className="text-xs opacity-75">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};