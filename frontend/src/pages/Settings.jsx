// pages/Settings.jsx - Main Settings Page
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import SettingsHeader from '../components/settings/SettingsHeader';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import AccountSettings from '../components/settings/AccountSettings';
import ProfileSettings from '../components/settings/ProfileSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import PrivacySettings from '../components/settings/PrivacySettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import { settingsApi } from '../services/settingsApi';

const Settings = () => {
  const { currentTheme, currentMood } = useTheme();
  const [activeSection, setActiveSection] = useState('account');
  const [notification, setNotification] = useState(null);

  // User data state
  const [user, setUser] = useState(settingsApi.getUser());
  const [notifications, setNotifications] = useState(settingsApi.getNotificationPrefs());
  const [privacy, setPrivacy] = useState(settingsApi.getPrivacySettings());
  const [appearance, setAppearance] = useState(settingsApi.getAppearancePrefs());

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const updateUser = (updatedData) => {
    setUser({ ...user, ...updatedData });
    showNotification('Account settings updated successfully');
  };

  const updateNotifications = (updatedData) => {
    setNotifications(updatedData);
    showNotification('Notification preferences updated');
  };

  const updatePrivacy = (updatedData) => {
    setPrivacy(updatedData);
    showNotification('Privacy settings updated');
  };

  const updateAppearance = (updatedData) => {
    setAppearance(updatedData);
    showNotification('Appearance preferences updated');
  };

  const sections = [
    { id: 'account', label: 'Account', icon: 'User' },
    { id: 'profile', label: 'Profile', icon: 'UserCircle' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'appearance', label: 'Appearance', icon: 'Palette' },
    { id: 'security', label: 'Security', icon: 'Lock' }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'account':
        return <AccountSettings user={user} onUpdate={updateUser} currentTheme={currentTheme} showNotification={showNotification} />;
      case 'profile':
        return <ProfileSettings user={user} onUpdate={updateUser} currentTheme={currentTheme} showNotification={showNotification} />;
      case 'notifications':
        return <NotificationSettings preferences={notifications} onUpdate={updateNotifications} currentTheme={currentTheme} />;
      case 'privacy':
        return <PrivacySettings settings={privacy} onUpdate={updatePrivacy} currentTheme={currentTheme} />;
      case 'appearance':
        return <AppearanceSettings preferences={appearance} onUpdate={updateAppearance} currentTheme={currentTheme} />;
      case 'security':
        return <SecuritySettings currentTheme={currentTheme} showNotification={showNotification} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SettingsHeader currentTheme={currentTheme} />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <SettingsSidebar 
            sections={sections}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            currentTheme={currentTheme}
          />
          
          <div className="flex-1">
            <div className={`${currentTheme.card} ${currentMood} p-6`}>
              {renderContent()}
            </div>
          </div>
        </div>

        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
            <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
              <Check size={20} />
              <span>{notification.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;