// components/admin/SettingsTab.jsx
import React, { useState } from 'react';
import { Save, Globe, Mail, Bell, Shield, CreditCard, Palette, Database, Smartphone, Languages, Clock, DollarSign, Percent, Truck } from 'lucide-react';

const SettingsTab = ({ currentTheme }) => {
  const [settings, setSettings] = useState({
    siteName: 'Portfolio Pro',
    siteEmail: 'admin@portfoliopro.com',
    currency: 'USD',
    taxRate: 10,
    shippingCost: 9.99,
    freeShippingThreshold: 100,
    timezone: 'America/Los_Angeles',
    language: 'en',
    enableNotifications: true,
    autoBackup: true
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">System Settings</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className={`${currentTheme.secondary} p-5 rounded-lg`}>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Globe size={18} /> General Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Site Email</label>
              <input
                type="email"
                name="siteEmail"
                value={settings.siteEmail}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Timezone</label>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
              >
                <option>America/Los_Angeles</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
                <option>Asia/Tokyo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Language</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className={`${currentTheme.secondary} p-5 rounded-lg`}>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><CreditCard size={18} /> Payment Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Tax Rate (%)</label>
              <input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Shipping Cost ($)</label>
              <input
                type="number"
                name="shippingCost"
                value={settings.shippingCost}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Free Shipping Threshold ($)</label>
              <input
                type="number"
                name="freeShippingThreshold"
                value={settings.freeShippingThreshold}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
              />
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className={`${currentTheme.secondary} p-5 rounded-lg`}>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Bell size={18} /> Notification Settings</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="enableNotifications" checked={settings.enableNotifications} onChange={handleChange} />
              <span>Enable Email Notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="autoBackup" checked={settings.autoBackup} onChange={handleChange} />
              <span>Enable Automatic Backups</span>
            </label>
          </div>
        </div>

        <div className={`${currentTheme.secondary} p-5 rounded-lg`}>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Shield size={18} /> Security Settings</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <span>Require Strong Passwords</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Enable Two-Factor Authentication</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <span>Enable reCAPTCHA on Forms</span>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;