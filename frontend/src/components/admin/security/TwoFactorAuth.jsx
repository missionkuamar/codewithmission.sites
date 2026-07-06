// components/admin/security/TwoFactorAuth.jsx
import React, { useState } from 'react';
import { Fingerprint, ShieldCheck, QrCode, Copy, Check, Loader } from 'lucide-react';

const TwoFactorAuth = ({ currentTheme, currentMood }) => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);

  const generateQrCode = () => {
    return 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/PortfolioPro:admin@example.com?secret=JBSWY3DPEHPK3PXP&issuer=PortfolioPro';
  };

  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
    }
    setBackupCodes(codes);
  };

  const enable2FA = () => {
    setLoading(true);
    setTimeout(() => {
      setEnabled(true);
      generateBackupCodes();
      setLoading(false);
    }, 1500);
  };

  const disable2FA = () => {
    if (window.confirm('Are you sure you want to disable two-factor authentication?')) {
      setEnabled(false);
      setBackupCodes([]);
    }
  };

  if (!enabled) {
    return (
      <div className="text-center py-8">
        <Fingerprint size={64} className="mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">Enhance Your Account Security</h3>
        <p className="opacity-75 mb-6">Add an extra layer of security to your account</p>
        <button
          onClick={enable2FA}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform"
        >
          {loading ? <Loader size={18} className="animate-spin inline mr-2" /> : null}
          Enable Two-Factor Authentication
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck size={24} className="text-green-500" />
          <div>
            <p className="font-semibold">2FA is enabled</p>
            <p className="text-sm opacity-75">Your account is protected with two-factor authentication</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="text-center">
          <h3 className="font-semibold mb-3">Scan QR Code</h3>
          <div className="inline-block p-4 bg-white rounded-lg">
            <img src={generateQrCode()} alt="QR Code" className="w-48 h-48" />
          </div>
          <p className="text-sm opacity-75 mt-3">Scan with Google Authenticator or similar app</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Backup Codes</h3>
          {backupCodes.length === 0 ? (
            <button
              onClick={generateBackupCodes}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Backup Codes
            </button>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {backupCodes.map((code, index) => (
                  <div key={index} className="font-mono text-sm bg-gray-800 p-2 rounded text-center">
                    {code}
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(backupCodes.join('\n'));
                  alert('Codes copied to clipboard');
                }}
                className="text-sm text-blue-500 hover:text-blue-400 flex items-center gap-1"
              >
                <Copy size={14} /> Copy codes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={disable2FA}
          className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
        >
          Disable 2FA
        </button>
      </div>
    </div>
  );
};

export default TwoFactorAuth;