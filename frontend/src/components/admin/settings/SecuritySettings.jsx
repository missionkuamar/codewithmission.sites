// components/admin/settings/SecuritySettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Shield, Lock, Clock, Key, Database, Cloud } from 'lucide-react';

const SecuritySettings = ({ settings, onSave, loading, currentTheme }) => {
  const [formData, setFormData] = useState(settings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('security', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Security Settings</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Session Timeout (minutes)</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="number"
              name="sessionTimeout"
              value={formData?.sessionTimeout}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Max Login Attempts</label>
          <input
            type="number"
            name="maxLoginAttempts"
            value={formData?.maxLoginAttempts}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Password Expiry (days)</label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="number"
              name="passwordExpiry"
              value={formData?.passwordExpiry}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Backup Frequency</label>
          <div className="relative">
            <Database className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="backupFrequency"
              value={formData?.backupFrequency}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input type="checkbox" name="twoFactorAuth" checked={formData?.twoFactorAuth} onChange={handleChange} />
          <span>Enable Two-Factor Authentication</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="requireStrongPassword" checked={formData?.requireStrongPassword} onChange={handleChange} />
          <span>Require Strong Passwords</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="enableCaptcha" checked={formData?.enableCaptcha} onChange={handleChange} />
          <span>Enable reCAPTCHA on forms</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="backupEnabled" checked={formData?.backupEnabled} onChange={handleChange} />
          <span>Enable Automatic Backups</span>
        </label>
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

export default SecuritySettings;