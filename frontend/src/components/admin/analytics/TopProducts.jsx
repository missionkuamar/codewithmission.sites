// components/admin/analytics/TopProducts.jsx
import React from 'react';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';

const TopProducts = ({ products, currentTheme, currentMood }) => {
  const maxSales = Math.max(...products.map(p => p.sales));
  
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Package size={20} /> Top Selling Products
      </h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-8 h-8 rounded-lg object-cover" />
                )}
                <span className="font-medium text-sm">{product.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-purple-500">${product.revenue.toLocaleString()}</span>
                <span className={`text-xs flex items-center gap-1 ${product.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {product.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(product.growth)}%
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs opacity-60">
              <span>{product.sales} sales</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${(product.sales / maxSales) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;