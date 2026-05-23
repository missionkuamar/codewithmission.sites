import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const TwoFactorLogin = ({ userId, tempToken, onSuccess }) => {
  const [code, setCode] = useState('');
  const [isBackupCode, setIsBackupCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code || code.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/auth/2fa/verify-login', {
        userId,
        token: !isBackupCode ? code : undefined,
        backupCode: isBackupCode ? code : undefined
      });
      
      console.log('2FA verification response:', response.data);
      
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success(response.data.message || 'Login successful!');
        
        // Call onSuccess callback
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      const errorMsg = error.response?.data?.message || 'Invalid verification code';
      const attemptsLeft = error.response?.data?.attemptsLeft;
      
      if (attemptsLeft) {
        toast.error(`${errorMsg} (${attemptsLeft} attempts left)`);
      } else {
        toast.error(errorMsg);
      }
      
      // Clear code on error
      setCode('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Two-Factor Authentication
          </h2>
          <p className="text-gray-600">
            {isBackupCode 
              ? 'Enter one of your backup codes' 
              : 'Enter the 6-digit code from your authenticator app'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isBackupCode ? 'Backup Code' : 'Authentication Code'}
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder={isBackupCode ? 'Enter 6-digit backup code' : '000000'}
              className="input-field text-center text-2xl tracking-wider font-mono"
              maxLength={6}
              autoFocus
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isBackupCode}
                onChange={(e) => {
                  setIsBackupCode(e.target.checked);
                  setCode('');
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <span className="text-sm text-gray-600">Use backup code instead</span>
            </label>
            
            <button
              type="button"
              onClick={() => {
                toast('Open Google Authenticator app to get your code', {
                  icon: '📱',
                  duration: 4000
                });
              }}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Need help?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span>Verify & Login</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Important:</p>
              <p className="text-xs mt-1">
                Lost access to your authenticator app? Use one of your backup codes 
                or contact support for account recovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorLogin;