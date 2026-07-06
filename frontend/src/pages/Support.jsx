// pages/Support.jsx - Main Support Page
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import FaqSection from '../components/admin/support/FaqSection';
import TicketSystem from '../components/admin/support/TicketSystem';
import ContactForm from '../components/admin/support/ContactForm';
import LiveChat from '../components/admin/support/LiveChat';
import KnowledgeBase from '../components/admin/support/KnowledgeBase';
import SupportHeader from '../components/admin/support/SupportHeader';
import SupportStats from '../components/admin/support/SupportStats';
import SupportTabs from '../components/admin/support/SupportTabs';
import { Check } from 'lucide-react';


const Support = () => {
  const { currentTheme, currentMood } = useTheme();
  const [activeTab, setActiveTab] = useState('faq');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'faq':
        return <FaqSection currentTheme={currentTheme} currentMood={currentMood} />;
      case 'tickets':
        return <TicketSystem currentTheme={currentTheme} currentMood={currentMood} showNotification={showNotification} />;
      case 'contact':
        return <ContactForm currentTheme={currentTheme} currentMood={currentMood} showNotification={showNotification} />;
      case 'chat':
        return <LiveChat currentTheme={currentTheme} currentMood={currentMood} showNotification={showNotification} />;
      case 'knowledge':
        return <KnowledgeBase currentTheme={currentTheme} currentMood={currentMood} />;
      default:
        return null;
    }
  };

  const stats = {
    activeAgents: 5,
    avgResponseTime: '2.4 min',
    ticketsSolved: 1234,
    satisfactionRate: 98
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SupportHeader currentTheme={currentTheme} />
        
        <SupportStats stats={stats} currentTheme={currentTheme} currentMood={currentMood} />
        
        <SupportTabs activeTab={activeTab} setActiveTab={setActiveTab} currentTheme={currentTheme} />
        
        <div className={`${currentTheme.card} ${currentMood} p-6 mt-6`}>
          {renderTabContent()}
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

export default Support;