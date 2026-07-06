// components/admin/settings/NotificationSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Bell, Mail, MessageCircle, TrendingUp, Calendar } from 'lucide-react';

const NotificationSettings = ({ settings, onSave, loading, currentTheme }) => {
  const [formData, setFormData] = useState(settings);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('notifications', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Bell size={18} /> System Notifications
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input type="checkbox" name="emailNotifications" checked={formData.emailNotifications} onChange={handleChange} />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" name="pushNotifications" checked={formData.pushNotifications} onChange={handleChange} />
              <span>Push Notifications</span>
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Mail size={18} /> Alert Preferences
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input type="checkbox" name="orderAlerts" checked={formData.orderAlerts} onChange={handleChange} />
              <span>New Order Alerts</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" name="userSignupAlerts" checked={formData.userSignupAlerts} onChange={handleChange} />
              <span>New User Signup Alerts</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" name="commentAlerts" checked={formData.commentAlerts} onChange={handleChange} />
              <span>New Comment Alerts</span>
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={18} /> Reports
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input type="checkbox" name="dailyDigest" checked={formData.dailyDigest} onChange={handleChange} />
              <span>Daily Digest</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" name="weeklyReport" checked={formData.weeklyReport} onChange={handleChange} />
              <span>Weekly Performance Report</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" name="marketingEmails" checked={formData.marketingEmails} onChange={handleChange} />
              <span>Marketing & Promotional Emails</span>
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default NotificationSettings;