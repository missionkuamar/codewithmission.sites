// components/admin/security/SecurityOverview.jsx
import React from 'react';
import { Lock, Shield, Server, Fingerprint, Database, Activity, CheckCircle, XCircle } from 'lucide-react';

const SecurityOverview = ({ data, currentTheme, currentMood }) => {
  const securityStatuses = [
    { name: "SSL Certificate", status: true, description: "Active - Valid certificate", icon: <Lock size={20} /> },
    { name: "Firewall", status: true, description: "Active - Protecting your site", icon: <Shield size={20} /> },
    { name: "Backup System", status: true, description: "Configured - Last backup: " + data.stats.lastBackup, icon: <Database size={20} /> },
    { name: "Two-Factor Auth", status: false, description: "Disabled - Recommended", icon: <Fingerprint size={20} /> },
    { name: "Active Sessions", status: true, description: `${data.stats.activeSessions} current sessions`, icon: <Activity size={20} /> }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Security Status</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityStatuses.map((item, index) => (
          <div key={index} className="p-4 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3 mb-2">
              <div className={item.status ? 'text-green-500' : 'text-yellow-500'}>
                {item.icon}
              </div>
              <h3 className="font-semibold">{item.name}</h3>
            </div>
            <p className="text-sm opacity-75">{item.description}</p>
            <div className="mt-2">
              {item.status ? (
                <span className="text-xs text-green-500 flex items-center gap-1"><CheckCircle size={12} /> Active</span>
              ) : (
                <span className="text-xs text-yellow-500 flex items-center gap-1"><XCircle size={12} /> Inactive - Recommended</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityOverview;