// components/admin/security/SecurityTabs.jsx
import React from 'react';
import { Shield, Key, Fingerprint, Globe, Activity, FileText, Code, Database } from 'lucide-react';

const SecurityTabs = ({ activeTab, setActiveTab, currentTheme }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Shield size={18} /> },
    { id: 'password', label: 'Password', icon: <Key size={18} /> },
    { id: '2fa', label: '2FA', icon: <Fingerprint size={18} /> },
    { id: 'ip', label: 'IP Rules', icon: <Globe size={18} /> },
    { id: 'sessions', label: 'Sessions', icon: <Activity size={18} /> },
    { id: 'logs', label: 'Security Logs', icon: <FileText size={18} /> },
    { id: 'api', label: 'API Keys', icon: <Code size={18} /> },
    { id: 'backup', label: 'Backup', icon: <Database size={18} /> }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 rounded-t-lg capitalize transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : `${currentTheme.card} hover:bg-gray-700`
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SecurityTabs;