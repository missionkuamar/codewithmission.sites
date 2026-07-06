// components/auth/TwoFactorForm.jsx
import React from 'react';
import { Fingerprint, Smartphone, Shield, RefreshCw } from 'lucide-react';

const TwoFactorForm = ({ 
  code, 
  onCodeChange, 
  onSubmit, 
  onBack, 
  loading, 
  currentTheme 
}) => {
  return (
    <div className={`${currentTheme.card} ${currentTheme.secondary} p-8`}>
      <div className="text-center mb-6">
        <Fingerprint size={48} className="mx-auto mb-3 opacity-50" />
        <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
        <p className="text-sm opacity-75 mt-2">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Verification Code</label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              placeholder="000000"
              maxLength="6"
              className={`w-full pl-10 pr-4 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-2xl tracking-widest`}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw size={18} className="animate-spin" /> : <Shield size={18} />}
          {loading ? 'Verifying...' : 'Verify & Login'}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
        >
          Use Backup Code
        </button>
      </form>
    </div>
  );
};

export default TwoFactorForm;