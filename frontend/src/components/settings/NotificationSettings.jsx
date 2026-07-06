// components/settings/NotificationSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Bell, Mail, Tag, Shield, Newspaper, Package } from 'lucide-react';

const NotificationSettings = ({ preferences, onUpdate, currentTheme }) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(preferences);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onUpdate(settings);
      setLoading(false);
    }, 1000);
  };

  const notificationCategories = [
    { key: 'emailNotifications', label: 'Email Notifications', icon: <Mail size={18} />, description: 'Receive notifications via email' },
    { key: 'pushNotifications', label: 'Push Notifications', icon: <Bell size={18} />, description: 'Get push notifications on your device' },
    { key: 'orderUpdates', label: 'Order Updates', icon: <Package size={18} />, description: 'Order confirmation, shipping, and delivery updates' },
    { key: 'promotions', label: 'Promotions & Offers', icon: <Tag size={18} />, description: 'Special offers and discounts' },
    { key: 'newsletter', label: 'Newsletter', icon: <Newspaper size={18} />, description: 'Weekly newsletter with updates' },
    { key: 'securityAlerts', label: 'Security Alerts', icon: <Shield size={18} />, description: 'Important security notifications' },
    { key: 'productUpdates', label: 'Product Updates', icon: <Package size={18} />, description: 'New features and product announcements' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">Notification Preferences</h2>
      
      <div className="space-y-4">
        {notificationCategories.map((category) => (
          <div key={category.key} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-500">
                {category.icon}
              </div>
              <div>
                <p className="font-semibold">{category.label}</p>
                <p className="text-sm opacity-75">{category.description}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[category.key]}
                onChange={() => handleToggle(category.key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
          Save Preferences
        </button>
      </div>
    </form>
  );
};

export default NotificationSettings;