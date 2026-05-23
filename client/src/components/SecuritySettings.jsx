import React, { useState, useEffect } from 'react';
import TwoFactorSetup from './TwoFactorSetup';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const SecuritySettings = () => {
  const { user } = useAuth();
  const [twoFactorStatus, setTwoFactorStatus] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setTwoFactorStatus(user.twoFactorEnabled || false);
    }
  }, [user]);

  const handleDisable2FA = async () => {
    if (!window.confirm('Are you sure you want to disable 2FA? Your account will be less secure.')) {
      return;
    }
    
    const code = prompt('Enter your 2FA code to disable:');
    if (!code) return;
    
    setLoading(true);
    try {
      const response = await api.post('/auth/2fa/disable', { token: code });
      if (response.data.success) {
        setTwoFactorStatus(false);
        setShowSetup(false);
        toast.success('2FA disabled successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to disable 2FA');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateBackupCodes = async () => {
    const code = prompt('Enter your 2FA code to generate new backup codes:');
    if (!code) return;
    
    setLoading(true);
    try {
      const response = await api.post('/auth/2fa/regenerate-backup-codes', { token: code });
      if (response.data.success) {
        const codes = response.data.backupCodes;
        alert(`New backup codes:\n\n${codes.join('\n')}\n\nSave these in a secure place!`);
        toast.success('New backup codes generated');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate new codes');
    } finally {
      setLoading(false);
    }
  };

  if (showSetup) {
    return <TwoFactorSetup />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Security Settings
          </h2>
        </div>

        <div className="p-6">
          {/* 2FA Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                twoFactorStatus ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {twoFactorStatus ? 'Enabled' : 'Disabled'}
              </div>
            </div>

            {!twoFactorStatus ? (
              <button
                onClick={() => setShowSetup(true)}
                className="btn-primary"
              >
                Enable 2FA
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleRegenerateBackupCodes}
                  disabled={loading}
                  className="btn-secondary mr-3"
                >
                  Regenerate Backup Codes
                </button>
                <button
                  onClick={handleDisable2FA}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Disable 2FA
                </button>
              </div>
            )}
          </div>

          {/* Recent Devices */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recent Login Devices
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Current Device</p>
                    <p className="text-xs text-gray-500">Chrome on Windows</p>
                  </div>
                </div>
                <span className="text-xs text-green-600">Active Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;