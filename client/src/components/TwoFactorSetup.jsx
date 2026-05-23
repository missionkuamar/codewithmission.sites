import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const TwoFactorSetup = () => {
  const { user } = useAuth();
  const [step, setStep] = useState('start'); // start, qr, verify
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSetup = async () => {
    setLoading(true);
    try {
      const response = await api.post('/auth/2fa/setup');
      if (response.data.success) {
        setSecret(response.data.secret);
        setQrCode(response.data.qrCode);
        setStep('qr');
        toast.success('Scan QR code with Google Authenticator');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      toast.error('Please enter verification code');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/auth/2fa/enable', {
        token: verificationCode
      });
      
      if (response.data.success) {
        setBackupCodes(response.data.backupCodes);
        setStep('backup');
        toast.success('2FA enabled successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    toast.success('Backup codes copied to clipboard');
  };

  const downloadBackupCodes = () => {
    const element = document.createElement('a');
    const file = new Blob([backupCodes.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'backup-codes.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (step === 'start') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Two-Factor Authentication
          </h3>
          <p className="text-gray-600">
            Add an extra layer of security to your account
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Important:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Download Google Authenticator app on your phone</li>
                  <li>Save backup codes in a safe place</li>
                  <li>You'll need 2FA code every time you login</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={handleSetup}
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <span>Enable 2FA</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'qr') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Scan QR Code
        </h3>
        
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-lg shadow-inner">
            <QRCodeSVG value={qrCode} size={200} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter this code manually:
            </label>
            <code className="block bg-gray-100 p-2 rounded text-sm text-center font-mono">
              {secret}
            </code>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="input-field text-center text-2xl tracking-wider"
              maxLength="6"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading || !verificationCode}
            className="w-full btn-primary"
          >
            {loading ? 'Verifying...' : 'Verify & Enable'}
          </button>

          <button
            onClick={() => setStep('start')}
            className="w-full btn-secondary"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (step === 'backup') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Backup Codes
          </h3>
          <p className="text-gray-600">
            Save these backup codes in a secure place
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-2">
            {backupCodes.map((code, index) => (
              <code key={index} className="text-sm font-mono text-gray-800">
                {code}
              </code>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={copyBackupCodes}
            className="w-full btn-secondary flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <span>Copy Codes</span>
          </button>

          <button
            onClick={downloadBackupCodes}
            className="w-full btn-secondary flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            <span>Download as Text</span>
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full btn-primary"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default TwoFactorSetup;