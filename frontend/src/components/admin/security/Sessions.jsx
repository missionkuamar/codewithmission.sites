// components/admin/security/Sessions.jsx
import React, { useState } from 'react';
import { Smartphone, Monitor, Tablet, Trash2, Globe, Clock } from 'lucide-react';

const Sessions = ({ currentTheme, currentMood }) => {
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'Chrome on Windows', type: 'desktop', location: 'San Francisco, CA', ip: '192.168.1.100', lastActive: '2024-02-20 10:30:00', current: true },
    { id: 2, device: 'Safari on iPhone', type: 'mobile', location: 'Los Angeles, CA', ip: '10.0.0.50', lastActive: '2024-02-19 15:20:00', current: false },
    { id: 3, device: 'Firefox on Mac', type: 'desktop', location: 'New York, NY', ip: '203.0.113.45', lastActive: '2024-02-18 09:15:00', current: false }
  ]);

  const getDeviceIcon = (type) => {
    switch(type) {
      case 'desktop': return <Monitor size={16} />;
      case 'mobile': return <Smartphone size={16} />;
      case 'tablet': return <Tablet size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  const revokeSession = (id) => {
    setActiveSessions(activeSessions.filter(session => session.id !== id));
  };

  const revokeAllOthers = () => {
    setActiveSessions(activeSessions.filter(s => s.current));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Active Sessions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr className="text-left">
              <th className="p-3">Device</th>
              <th className="p-3">Location</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Last Active</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
             </tr>
          </thead>
          <tbody>
            {activeSessions.map(session => (
              <tr key={session.id} className="border-b border-gray-700">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(session.type)}
                    {session.device}
                  </div>
                </td>
                <td className="p-3">{session.location}</td>
                <td className="p-3 font-mono text-sm">{session.ip}</td>
                <td className="p-3 text-sm">{session.lastActive}</td>
                <td className="p-3">
                  {session.current ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Current</span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20">Expired</span>
                  )}
                </td>
                <td className="p-3">
                  {!session.current && (
                    <button onClick={() => revokeSession(session.id)} className="p-1 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          onClick={revokeAllOthers}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          Revoke All Other Sessions
        </button>
      </div>
    </div>
  );
};

export default Sessions;