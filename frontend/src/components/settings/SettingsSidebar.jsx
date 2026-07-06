// components/settings/SettingsSidebar.jsx
import React from 'react';
import { User, UserCircle, Bell, Shield, Palette, Lock } from 'lucide-react';

const iconMap = {
  User: User,
  UserCircle: UserCircle,
  Bell: Bell,
  Shield: Shield,
  Palette: Palette,
  Lock: Lock
};

const SettingsSidebar = ({ sections, activeSection, setActiveSection, currentTheme }) => {
  return (
    <div className="lg:w-64 space-y-1">
      {sections.map((section) => {
        const Icon = iconMap[section.icon];
        return (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : `${currentTheme.secondary} hover:bg-gray-700`
            }`}
          >
            <Icon size={18} />
            <span>{section.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SettingsSidebar;