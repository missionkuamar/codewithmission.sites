// pages/AdminSecurity.jsx - Main Security Page
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { securityApi } from '../services/securityApi';
import { AlertCircle, Check, Loader } from 'lucide-react';
import SecurityOverview from '../components/admin/security/SecurityOverview';
import PasswordSecurity from '../components/admin/security/PasswordSecurity';
import TwoFactorAuth from '../components/admin/security/TwoFactorAuth';
import IpRules from '../components/admin/security/IpRules';
import Sessions from '../components/admin/security/Sessions';
import SecurityLogs from '../components/admin/security/SecurityLogs';
import ApiKeys from '../components/admin/security/ApiKeys';
import BackupSettings from '../components/admin/security/BackupSettings';
import SecurityHeader from '../components/admin/security/SecurityHeader';
import SecurityScoreCard from '../components/admin/security/SecurityScoreCard';
import SecurityTabs from '../components/admin/security/SecurityTabs';


const AdminSecurity = () => {
  const { currentTheme, currentMood } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [securityData, setSecurityData] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    setLoading(true);
    setTimeout(() => {
      setSecurityData(securityApi.getAll());
      setLoading(false);
    }, 500);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const runSecurityScan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showNotification('Security scan completed. No threats found.');
    }, 3000);
  };

  const exportLogs = () => {
    const data = {
      logs: securityData?.securityLogs || [],
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security_logs_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Security logs exported');
  };

  if (!securityData) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <Loader size={40} className="animate-spin" />
      </div>
    );
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <SecurityOverview data={securityData} currentTheme={currentTheme} currentMood={currentMood} />;
      case 'password':
        return <PasswordSecurity currentTheme={currentTheme} currentMood={currentMood} />;
      case '2fa':
        return <TwoFactorAuth currentTheme={currentTheme} currentMood={currentMood} />;
      case 'ip':
        return <IpRules currentTheme={currentTheme} currentMood={currentMood} />;
      case 'sessions':
        return <Sessions currentTheme={currentTheme} currentMood={currentMood} />;
      case 'logs':
        return <SecurityLogs logs={securityData.securityLogs} currentTheme={currentTheme} currentMood={currentMood} />;
      case 'api':
        return <ApiKeys currentTheme={currentTheme} currentMood={currentMood} />;
      case 'backup':
        return <BackupSettings currentTheme={currentTheme} currentMood={currentMood} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SecurityHeader
          onScan={runSecurityScan}
          onExport={exportLogs}
          loading={loading}
          currentTheme={currentTheme}
        />

        <SecurityScoreCard
          score={securityData.securityScore}
          stats={securityData.stats}
          currentTheme={currentTheme}
          currentMood={currentMood}
        />

        <SecurityTabs
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          currentTheme={currentTheme} 
        />

        <div className={`${currentTheme.card} ${currentMood} p-6 mt-6`}>
          {renderTabContent()}
        </div>

        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
            <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
              {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
              <span>{notification.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSecurity;