// components/admin/analytics/TrafficSources.jsx
import React from 'react';
import { Globe, TrendingUp, TrendingDown } from 'lucide-react';

const TrafficSources = ({ sources, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Globe size={20} /> Traffic Sources
      </h3>
      <div className="space-y-3">
        {sources.map((source, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">{source.source}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{source.percentage}%</span>
                <span className={`text-xs flex items-center gap-1 ${source.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {source.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(source.change)}%
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${source.color} rounded-full`}
                style={{ width: `${source.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSources;