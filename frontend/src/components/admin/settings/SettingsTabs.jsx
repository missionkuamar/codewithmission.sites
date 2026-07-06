// components/admin/settings/SettingsTabs.jsx
import React from 'react';
import { Globe, Palette, Mail, CreditCard, Shield, Share2, Search, Bell } from 'lucide-react';

const SettingsTabs = ({ activeTab, setActiveTab, currentTheme }) => {
  const tabs = [
    { id: 'general', label: 'General', icon: <Globe size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'email', label: 'Email', icon: <Mail size={18} /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'social', label: 'Social Media', icon: <Share2 size={18} /> },
    { id: 'seo', label: 'SEO', icon: <Search size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 rounded-t-lg capitalize transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : `${currentTheme.card} hover:bg-gray-700`
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SettingsTabs;