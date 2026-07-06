// components/settings/PrivacySettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Eye, Mail, Phone, MessageCircle, Lock, BarChart3, Activity } from 'lucide-react';

const PrivacySettings = ({ settings, onUpdate, currentTheme }) => {
  const [loading, setLoading] = useState(false);
  const [privacy, setPrivacy] = useState(settings);

  const handleToggle = (key) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrivacy(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onUpdate(privacy);
      setLoading(false);
    }, 1000);
  };

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible to everyone' },
    { value: 'private', label: 'Private', description: 'Only visible to you' },
    { value: 'contacts', label: 'Contacts Only', description: 'Visible to your contacts' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">Privacy Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Profile Visibility</label>
          <div className="relative">
            <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="profileVisibility"
              value={privacy.profileVisibility}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            >
              {visibilityOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label} - {opt.description}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-purple-500" />
              <div>
                <p className="font-semibold">Show Email</p>
                <p className="text-sm opacity-75">Display email on your profile</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={privacy.showEmail} onChange={() => handleToggle('showEmail')} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-purple-500" />
              <div>
                <p className="font-semibold">Show Phone Number</p>
                <p className="text-sm opacity-75">Display phone number on your profile</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={privacy.showPhone} onChange={() => handleToggle('showPhone')} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3">
              <Activity size={18} className="text-purple-500" />
              <div>
                <p className="font-semibold">Show Activity</p>
                <p className="text-sm opacity-75">Display your recent activity</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={privacy.showActivity} onChange={() => handleToggle('showActivity')} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3">
              <MessageCircle size={18} className="text-purple-500" />
              <div>
                <p className="font-semibold">Allow Messages</p>
                <p className="text-sm opacity-75">Allow others to send you messages</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={privacy.allowMessages} onChange={() => handleToggle('allowMessages')} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3">
              <BarChart3 size={18} className="text-purple-500" />
              <div>
                <p className="font-semibold">Analytics Consent</p>
                <p className="text-sm opacity-75">Allow us to collect anonymous usage data</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={privacy.analyticsConsent} onChange={() => handleToggle('analyticsConsent')} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
          Save Privacy Settings
        </button>
      </div>
    </form>
  );
};

export default PrivacySettings;