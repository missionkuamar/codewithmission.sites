// components/settings/SettingsHeader.jsx
import React from 'react';
import { Settings } from 'lucide-react';

const SettingsHeader = ({ currentTheme }) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
        <Settings size={32} className="text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Account{' '}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Settings
        </span>
      </h1>
      <p className="text-xl opacity-75 max-w-2xl mx-auto">
        Manage your account preferences and privacy settings
      </p>
    </div>
  );
};

export default SettingsHeader;