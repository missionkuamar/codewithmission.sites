// components/admin/DashboardTabs.jsx
import React from 'react';
import { FaBlog } from "react-icons/fa";
const DashboardTabs = ({ activeTab, setActiveTab, currentTheme }) => {
  const tabs = [
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    {
  id: "blog",
  label: "Blog",
  icon: <FaBlog />
}
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 rounded-t-lg capitalize transition-all flex items-center gap-2 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : `${currentTheme.card} hover:bg-gray-700`
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default DashboardTabs;