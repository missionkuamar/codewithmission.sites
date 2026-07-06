// components/admin/settings/GeneralSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Globe, Mail, Phone, MapPin, Clock, Languages } from 'lucide-react';

const GeneralSettings = ({ settings, onSave, loading, currentTheme }) => {
  const [formData, setFormData] = useState(settings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('general', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">General Settings</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Site Name</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Site Tagline</label>
          <input
            type="text"
            name="siteTagline"
            value={formData.siteTagline}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Site Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="email"
              name="siteEmail"
              value={formData.siteEmail}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Site Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="tel"
              name="sitePhone"
              value={formData.sitePhone}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Site Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 opacity-50" size={18} />
            <textarea
              name="siteAddress"
              value={formData.siteAddress}
              onChange={handleChange}
              rows="2"
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
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
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
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

export default GeneralSettings;