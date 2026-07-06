// components/settings/AccountSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Mail, Phone, Globe, Clock, Languages, DollarSign } from 'lucide-react';

const AccountSettings = ({ user, onUpdate, currentTheme, showNotification }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onUpdate(formData);
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">Account Settings</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Timezone</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            >
              <option>America/Los_Angeles</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
              <option>Asia/Tokyo</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Language</label>
          <div className="relative">
            <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Date Format</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="dateFormat"
              value={formData.dateFormat}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            >
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Currency</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            >
              <option>USD - US Dollar</option>
              <option>EUR - Euro</option>
              <option>GBP - British Pound</option>
              <option>JPY - Japanese Yen</option>
            </select>
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default AccountSettings;