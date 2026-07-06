// components/admin/analytics/AnalyticsHeader.jsx
import React from 'react';
import { Download, RefreshCw, Calendar } from 'lucide-react';

const AnalyticsHeader = ({ dateRange, setDateRange, onExport, onRefresh, loading, currentTheme }) => {
  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '12m', label: 'Last 12 months' }
  ];

  return (
    <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Analytics{' '}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="text-sm opacity-75 mt-1">Track your performance, traffic, and engagement metrics</p>
      </div>
      <div className="flex gap-3">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none flex items-center gap-2`}
        >
          {dateRanges.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
        
        <button
          onClick={onExport}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Download size={18} />
          Export
        </button>
        
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;