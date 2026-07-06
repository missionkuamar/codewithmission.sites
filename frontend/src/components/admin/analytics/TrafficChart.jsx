// components/admin/analytics/TrafficChart.jsx
import React from 'react';
import { Users, TrendingUp } from 'lucide-react';

const TrafficChart = ({ data, currentTheme, currentMood }) => {
  const maxVisitors = Math.max(...data.visitors);
  
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users size={20} className="text-blue-500" />
          Traffic Overview
        </h3>
        <span className="text-sm text-green-500 flex items-center gap-1">
          <TrendingUp size={14} /> +15.2%
        </span>
      </div>
      <div className="flex items-end justify-between h-48 gap-2">
        {data.visitors.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center group">
            <div className="relative w-full">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                style={{ height: `${(value / maxVisitors) * 100}%`, minHeight: '4px' }}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {value.toLocaleString()} visitors
              </div>
            </div>
            <span className="text-xs mt-2 opacity-60">{data.labels[index]}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm">
        <span className="opacity-60">Daily Visitors</span>
        <span className="font-semibold">{data.visitors.reduce((a, b) => a + b, 0).toLocaleString()} total</span>
      </div>
    </div>
  );
};

export default TrafficChart;