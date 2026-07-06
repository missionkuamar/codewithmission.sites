// components/admin/analytics/TopCategories.jsx
import React from 'react';
import { FolderOpen, TrendingUp } from 'lucide-react';

const TopCategories = ({ categories, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FolderOpen size={20} /> Top Categories
      </h3>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-medium">{category.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">${(category.revenue / 1000).toFixed(1)}K</span>
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <TrendingUp size={12} /> +{category.growth}%
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs opacity-60">
              <span>{category.percentage}% of sales</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;