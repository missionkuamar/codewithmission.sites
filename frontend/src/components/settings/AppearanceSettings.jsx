// components/settings/AppearanceSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Moon, Sun, Monitor, Type, Eye, Wind } from 'lucide-react';

const AppearanceSettings = ({ preferences, onUpdate, currentTheme }) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(preferences);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onUpdate(settings);
      setLoading(false);
    }, 1000);
  };

  const themeOptions = [
    { value: 'dark', label: 'Dark', icon: <Moon size={16} />, description: 'Dark theme for night time' },
    { value: 'light', label: 'Light', icon: <Sun size={16} />, description: 'Light theme for day time' },
    { value: 'system', label: 'System', icon: <Monitor size={16} />, description: 'Follow system preference' }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small', size: '14px' },
    { value: 'medium', label: 'Medium', size: '16px' },
    { value: 'large', label: 'Large', size: '18px' },
    { value: 'xlarge', label: 'Extra Large', size: '20px' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">Appearance Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange({ target: { name: 'theme', value: option.value } })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  settings.theme === option.value
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  {option.icon}
                  <span className="font-semibold">{option.label}</span>
                  <span className="text-xs opacity-75">{option.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Font Size</label>
          <div className="grid grid-cols-4 gap-3">
            {fontSizeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange({ target: { name: 'fontSize', value: option.value } })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  settings.fontSize === option.value
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <span className="font-semibold" style={{ fontSize: option.size }}>Aa</span>
                  <p className="text-xs mt-1">{option.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3">
              <Eye size={18} className="text-purple-500" />
              <div>
                <p className="font-semibold">Compact View</p>
                <p className="text-sm opacity-75">Reduce spacing between elements</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={settings.compactView} onChange={() => handleToggle('compactView')} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3">
              <Wind size={18} className="text-purple-500" />
              <div>
                <p className="font-semibold">Animations</p>
                <p className="text-sm opacity-75">Enable UI animations and transitions</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={settings.animations} onChange={() => handleToggle('animations')} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3">
              <Eye size={18} className="text-purple-500" />
              <div>
                <p className="font-semibold">Reduced Motion</p>
                <p className="text-sm opacity-75">Minimize animations for accessibility</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={settings.reducedMotion} onChange={() => handleToggle('reducedMotion')} className="sr-only peer" />
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
          Save Appearance
        </button>
      </div>
    </form>
  );
};

export default AppearanceSettings;