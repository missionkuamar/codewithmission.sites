// pages/AdminSettings.jsx - Main Settings Page
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { settingsApi } from '../services/settingsApi';
import GeneralSettings from '../components/admin/settings/GeneralSettings';
import AppearanceSettings from '../components/admin/settings/AppearanceSettings';
import EmailSettings from '../components/admin/settings/EmailSettings';
import PaymentSettings from '../components/admin/settings/PaymentSettings';
import SecuritySettings from '../components/admin/settings/SecuritySettings';
import SocialSettings from '../components/admin/settings/SocialSettings';
import SeoSettings from '../components/admin/settings/SeoSettings';
import NotificationSettings from '../components/admin/settings/NotificationSettings';
import SettingsHeader from '../components/admin/settings/SettingsHeader';
import SettingsTabs from '../components/admin/settings/SettingsTabs';
import { AlertCircle, Check } from 'lucide-react';


const AdminSettings = () => {
  const { currentTheme, currentMood, theme, setSpecificTheme, allThemes } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Settings state
  const [generalSettings, setGeneralSettings] = useState(settingsApi.getGeneralSettings());
  const [appearanceSettings, setAppearanceSettings] = useState(settingsApi.getAppearanceSettings());
  const [emailSettings, setEmailSettings] = useState(settingsApi.getEmailSettings());
  const [paymentSettings, setPaymentSettings] = useState(settingsApi.getPaymentSettings());
  const [securitySettings, setSecuritySettings] = useState(settingsApi.getSecuritySettings());
  const [socialSettings, setSocialSettings] = useState(settingsApi.getSocialSettings());
  const [seoSettings, setSeoSettings] = useState(settingsApi.getSeoSettings());
  const [notificationSettings, setNotificationSettings] = useState(settingsApi.getNotificationSettings());

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = (section, data) => {
    setLoading(true);
    setTimeout(() => {
      switch(section) {
        case 'general': setGeneralSettings(data); break;
        case 'appearance': setAppearanceSettings(data); break;
        case 'email': setEmailSettings(data); break;
        case 'payment': setPaymentSettings(data); break;
        case 'security': setSecuritySettings(data); break;
        case 'social': setSocialSettings(data); break;
        case 'seo': setSeoSettings(data); break;
        case 'notifications': setNotificationSettings(data); break;
        default: break;
      }
      setLoading(false);
      showNotification(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully`);
    }, 1000);
  };

  const exportSettings = () => {
    const allSettings = {
      general: generalSettings,
      appearance: appearanceSettings,
      email: emailSettings,
      payment: paymentSettings,
      security: securitySettings,
      social: socialSettings,
      seo: seoSettings,
      notifications: notificationSettings,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(allSettings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `settings_backup_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Settings exported successfully');
  };

  const importSettings = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const settings = JSON.parse(event.target.result);
          setGeneralSettings(settings.general || generalSettings);
          setAppearanceSettings(settings.appearance || appearanceSettings);
          setEmailSettings(settings.email || emailSettings);
          setPaymentSettings(settings.payment || paymentSettings);
          setSecuritySettings(settings.security || securitySettings);
          setSocialSettings(settings.social || socialSettings);
          setSeoSettings(settings.seo || seoSettings);
          setNotificationSettings(settings.notifications || notificationSettings);
          showNotification('Settings imported successfully');
        } catch (error) {
          showNotification('Invalid settings file', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setGeneralSettings(settingsApi.getGeneralSettings());
      setAppearanceSettings(settingsApi.getAppearanceSettings());
      setEmailSettings(settingsApi.getEmailSettings());
      setPaymentSettings(settingsApi.getPaymentSettings());
      setSecuritySettings(settingsApi.getSecuritySettings());
      setSocialSettings(settingsApi.getSocialSettings());
      setSeoSettings(settingsApi.getSeoSettings());
      setNotificationSettings(settingsApi.getNotificationSettings());
      showNotification('All settings reset to default');
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'general':
        return <GeneralSettings settings={generalSettings} onSave={handleSave} loading={loading} currentTheme={currentTheme} />;
      case 'appearance':
        return <AppearanceSettings settings={appearanceSettings} onSave={handleSave} loading={loading} currentTheme={currentTheme} theme={theme} setSpecificTheme={setSpecificTheme} allThemes={allThemes} />;
      case 'email':
        return <EmailSettings settings={emailSettings} onSave={handleSave} loading={loading} currentTheme={currentTheme} />;
      case 'payment':
        return <PaymentSettings settings={paymentSettings} onSave={handleSave} loading={loading} currentTheme={currentTheme} />;
      case 'security':
        return <SecuritySettings settings={securitySettings} onSave={handleSave} loading={loading} currentTheme={currentTheme} />;
      case 'social':
        return <SocialSettings settings={socialSettings} onSave={handleSave} loading={loading} currentTheme={currentTheme} />;
      case 'seo':
        return <SeoSettings settings={seoSettings} onSave={handleSave} loading={loading} currentTheme={currentTheme} />;
      case 'notifications':
        return <NotificationSettings settings={notificationSettings} onSave={handleSave} loading={loading} currentTheme={currentTheme} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SettingsHeader
          onExport={exportSettings}
          onImport={importSettings}
          onReset={resetSettings}
          currentTheme={currentTheme}
        />

        <SettingsTabs
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

export default AdminSettings;