// components/admin/settings/AppearanceSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, Palette, Type, Square, Monitor, Sun, Moon } from 'lucide-react';

const AppearanceSettings = ({ settings, onSave, loading, currentTheme, theme, setSpecificTheme, allThemes }) => {
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
    onSave('appearance', formData);
  };

  const fontFamilies = ['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Montserrat'];
  const borderRadiuses = ['0rem', '0.25rem', '0.5rem', '1rem', '2rem'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Appearance Settings</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Theme</label>
          <div className="relative">
            <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="theme"
              value={formData.theme}
              onChange={(e) => {
                handleChange(e);
                setSpecificTheme(e.target.value);
              }}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            >
              {Object.keys(allThemes).map(themeName => (
                <option key={themeName} value={themeName}>
                  {themeName.replace(/([A-Z])/g, ' $1').trim()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Primary Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleChange}
              className="w-12 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleChange}
              className={`flex-1 px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Font Family</label>
          <div className="relative">
            <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="fontFamily"
              value={formData.fontFamily}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            >
              {fontFamilies.map(font => <option key={font}>{font}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Border Radius</label>
          <div className="relative">
            <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="borderRadius"
              value={formData.borderRadius}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            >
              {borderRadiuses.map(radius => <option key={radius} value={radius}>{radius === '0rem' ? 'None' : radius}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input type="checkbox" name="animationEnabled" checked={formData.animationEnabled} onChange={handleChange} />
          <span>Enable Animations</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="compactMode" checked={formData.compactMode} onChange={handleChange} />
          <span>Compact Mode (Reduce spacing)</span>
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

export default AppearanceSettings;