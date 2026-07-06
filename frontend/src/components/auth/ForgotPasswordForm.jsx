// components/auth/ForgotPasswordForm.jsx
import React from 'react';
import { Mail, Key, RefreshCw } from 'lucide-react';

const ForgotPasswordForm = ({ 
  resetEmail, 
  onEmailChange, 
  onSubmit, 
  onBack, 
  loading, 
  currentTheme 
}) => {
  return (
    <div className={`${currentTheme.card} ${currentTheme.secondary} p-8`}>
      <div className="text-center mb-6">
        <Key size={48} className="mx-auto mb-3 opacity-50" />
        <h2 className="text-2xl font-bold">Reset Password</h2>
        <p className="text-sm opacity-75 mt-2">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Enter your email"
              className={`w-full pl-10 pr-4 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw size={18} className="animate-spin" /> : <Key size={18} />}
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;