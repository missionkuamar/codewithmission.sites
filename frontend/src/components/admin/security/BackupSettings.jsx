// components/admin/security/BackupSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Database, Cloud, Clock, Shield, Check } from 'lucide-react';

const BackupSettings = ({ currentTheme, currentMood }) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '23:00',
    retentionDays: 30,
    backupLocation: 's3',
    encryptBackups: true
  });

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
      alert('Backup settings saved successfully!');
    }, 1000);
  };

  const runBackup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Backup completed successfully!');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Backup & Recovery</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3">Backup Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" name="autoBackup" checked={settings.autoBackup} onChange={handleChange} />
              <span>Enable Automatic Backups</span>
            </label>
            <div>
              <label className="block text-sm font-semibold mb-1">Backup Frequency</label>
              <select
                name="backupFrequency"
                value={settings.backupFrequency}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Backup Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
                <input
                  type="time"
                  name="backupTime"
                  value={settings.backupTime}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Retention Period (days)</label>
              <input
                type="number"
                name="retentionDays"
                value={settings.retentionDays}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Storage Location</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Backup Location</label>
              <div className="relative">
                <Database className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
                <select
                  name="backupLocation"
                  value={settings.backupLocation}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
                >
                  <option value="local">Local Storage</option>
                  <option value="s3">Amazon S3</option>
                  <option value="dropbox">Dropbox</option>
                  <option value="google">Google Drive</option>
                </select>
              </div>
            </div>
            <label className="flex items-center gap-3">
              <input type="checkbox" name="encryptBackups" checked={settings.encryptBackups} onChange={handleChange} />
              <span>Encrypt Backups</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg flex justify-between items-center flex-wrap gap-4">
        <div>
          <p className="text-sm opacity-75">Last Backup: 2024-02-19 23:00:00</p>
          <p className="text-sm opacity-75">Next Backup: 2024-02-20 23:00:00</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={runBackup}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2"
          >
            {loading ? <Loader size={18} className="animate-spin" /> : <Database size={18} />}
            Run Backup Now
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackupSettings;