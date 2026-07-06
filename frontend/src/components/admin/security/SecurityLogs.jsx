// components/admin/security/SecurityLogs.jsx
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Info, Search, Filter } from 'lucide-react';

const SecurityLogs = ({ logs, currentTheme, currentMood }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'critical': return <AlertCircle size={16} className="text-red-500" />;
      case 'warning': return <AlertCircle size={16} className="text-yellow-500" />;
      case 'info': return <Info size={16} className="text-blue-500" />;
      default: return <Info size={16} />;
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-red-500/20 text-red-500';
      case 'warning': return 'bg-yellow-500/20 text-yellow-500';
      case 'info': return 'bg-blue-500/20 text-blue-500';
      default: return 'bg-gray-500/20';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ip.includes(searchTerm);
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Security Event Logs</h2>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
        >
          <option value="all">All Severity</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr className="text-left">
              <th className="p-3">Timestamp</th>
              <th className="p-3">Event</th>
              <th className="p-3">User</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Severity</th>
             </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id} className="border-b border-gray-700">
                <td className="p-3 text-sm">{log.timestamp}</td>
                <td className="p-3">{log.event}</td>
                <td className="p-3 text-sm">{log.user}</td>
                <td className="p-3 font-mono text-sm">{log.ip}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${getSeverityColor(log.severity)}`}>
                    {getSeverityIcon(log.severity)}
                    {log.severity}
                  </span>
                </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecurityLogs;