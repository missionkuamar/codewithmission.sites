// components/admin/security/SecurityHeader.jsx
import React from 'react';
import { Shield, RefreshCw, Download } from 'lucide-react';

const SecurityHeader = ({ onScan, onExport, loading, currentTheme }) => {
  return (
    <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Security{' '}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Center
          </span>
        </h1>
        <p className="text-sm opacity-75 mt-1">Monitor and manage your security settings</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onScan}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          {loading ? <RefreshCw size={18} className="animate-spin" /> : <Shield size={18} />}
          Run Security Scan
        </button>
        <button
          onClick={onExport}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Download size={18} />
          Export Logs
        </button>
      </div>
    </div>
  );
};

export default SecurityHeader;