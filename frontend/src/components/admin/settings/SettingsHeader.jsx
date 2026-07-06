// components/admin/settings/SettingsHeader.jsx
import React from 'react';
import { Download, Upload, RefreshCw, Settings } from 'lucide-react';

const SettingsHeader = ({ onExport, onImport, onReset, currentTheme }) => {
  return (
    <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Admin{' '}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Settings
          </span>
        </h1>
        <p className="text-sm opacity-75 mt-1">Configure your website preferences and system settings</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onExport}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Download size={18} />
          Export
        </button>
        <label className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer">
          <Upload size={18} />
          Import
          <input type="file" accept=".json" onChange={onImport} className="hidden" />
        </label>
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default SettingsHeader;