// components/admin/security/IpRules.jsx
import React, { useState } from 'react';
import { Plus, Trash2, Globe, Shield, ShieldAlert } from 'lucide-react';

const IpRules = ({ currentTheme, currentMood }) => {
  const [ipRules, setIpRules] = useState([
    { id: 1, ip: '192.168.1.1', type: 'whitelist', note: 'Office Network', active: true },
    { id: 2, ip: '10.0.0.1', type: 'whitelist', note: 'VPN', active: true },
    { id: 3, ip: '203.0.113.0/24', type: 'blacklist', note: 'Suspicious Range', active: true }
  ]);
  const [newIp, setNewIp] = useState({ ip: '', type: 'whitelist', note: '' });

  const addIpRule = () => {
    if (newIp.ip) {
      setIpRules([...ipRules, { ...newIp, id: Date.now(), active: true }]);
      setNewIp({ ip: '', type: 'whitelist', note: '' });
    }
  };

  const removeIpRule = (id) => {
    setIpRules(ipRules.filter(rule => rule.id !== id));
  };

  const toggleIpRule = (id) => {
    setIpRules(ipRules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">IP Whitelist & Blacklist</h2>
      
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Add IP Rule</h3>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="IP Address or Range (e.g., 192.168.1.1 or 192.168.1.0/24)"
            value={newIp.ip}
            onChange={(e) => setNewIp({ ...newIp, ip: e.target.value })}
            className={`flex-1 px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <select
            value={newIp.type}
            onChange={(e) => setNewIp({ ...newIp, type: e.target.value })}
            className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
          >
            <option value="whitelist">Allow</option>
            <option value="blacklist">Block</option>
          </select>
          <input
            type="text"
            placeholder="Note (optional)"
            value={newIp.note}
            onChange={(e) => setNewIp({ ...newIp, note: e.target.value })}
            className={`flex-1 px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
          />
          <button
            onClick={addIpRule}
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr className="text-left">
              <th className="p-3">IP Address/Range</th>
              <th className="p-3">Type</th>
              <th className="p-3">Note</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
             </tr>
          </thead>
          <tbody>
            {ipRules.map(rule => (
              <tr key={rule.id} className="border-b border-gray-700">
                <td className="p-3 font-mono text-sm">{rule.ip}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${rule.type === 'whitelist' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {rule.type === 'whitelist' ? <Shield size={12} /> : <ShieldAlert size={12} />}
                    {rule.type === 'whitelist' ? 'Allow' : 'Block'}
                  </span>
                </td>
                <td className="p-3 text-sm opacity-75">{rule.note}</td>
                <td className="p-3">
                  <button
                    onClick={() => toggleIpRule(rule.id)}
                    className={`px-2 py-1 rounded-full text-xs ${rule.active ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20'}`}
                  >
                    {rule.active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="p-3">
                  <button onClick={() => removeIpRule(rule.id)} className="p-1 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IpRules;