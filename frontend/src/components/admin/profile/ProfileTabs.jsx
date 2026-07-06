// components/profile/ProfileTabs.jsx
import React from 'react';
import { User, Package, MapPin, Heart, Activity, Shield } from 'lucide-react';

const ProfileTabs = ({ activeTab, setActiveTab, currentTheme }) => {
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User size={18} /> },
    { id: 'orders', label: 'Order History', icon: <Package size={18} /> },
    { id: 'addresses', label: 'Address Book', icon: <MapPin size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'activity', label: 'Activity Log', icon: <Activity size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> }
  ];

  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-700 overflow-x-auto">
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

export default ProfileTabs;