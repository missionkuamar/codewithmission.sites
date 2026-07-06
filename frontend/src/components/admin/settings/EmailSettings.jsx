// components/admin/settings/EmailSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Mail, Server, Key, Eye, EyeOff } from 'lucide-react';

const EmailSettings = ({ settings, onSave, loading, currentTheme }) => {
  const [formData, setFormData] = useState(settings);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('email', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Email Configuration</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">SMTP Host</label>
          <div className="relative">
            <Server className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              name="smtpHost"
              value={formData.smtpHost}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">SMTP Port</label>
          <input
            type="text"
            name="smtpPort"
            value={formData.smtpPort}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">SMTP Username</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              name="smtpUser"
              value={formData.smtpUser}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">SMTP Password</label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="smtpPassword"
              value={formData.smtpPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">From Email</label>
          <input
            type="email"
            name="fromEmail"
            value={formData.fromEmail}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">From Name</label>
          <input
            type="text"
            name="fromName"
            value={formData.fromName}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
          />
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold mt-4">Email Notifications</h3>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="welcomeEmail" checked={formData.welcomeEmail} onChange={handleChange} />
          <span>Send Welcome Email to new users</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="orderConfirmation" checked={formData.orderConfirmation} onChange={handleChange} />
          <span>Send Order Confirmation Emails</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="passwordReset" checked={formData.passwordReset} onChange={handleChange} />
          <span>Enable Password Reset Emails</span>
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

export default EmailSettings;