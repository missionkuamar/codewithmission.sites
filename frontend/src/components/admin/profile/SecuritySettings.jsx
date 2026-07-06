// components/profile/SecuritySettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Eye, EyeOff, Lock, Shield, Smartphone, Key } from 'lucide-react';

const SecuritySettings = ({ currentTheme, showNotification }) => {
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showNotification('Password changed successfully');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Security Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-semibold mb-2">Current Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type={showCurrent ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">New Password</label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type={showNew ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
              required
            />
            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
              required
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
          Update Password
        </button>
      </form>

      <div className="border-t border-gray-700 pt-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Smartphone size={18} /> Two-Factor Authentication
        </h3>
        <p className="text-sm opacity-75 mb-3">Add an extra layer of security to your account</p>
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
          Enable 2FA
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;