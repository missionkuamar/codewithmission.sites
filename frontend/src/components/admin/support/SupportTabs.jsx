// components/support/SupportTabs.jsx
import React from 'react';
import { HelpCircle, Ticket, Mail, MessageCircle, BookOpen } from 'lucide-react';

const SupportTabs = ({ activeTab, setActiveTab, currentTheme }) => {
  const tabs = [
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={18} /> },
    { id: 'tickets', label: 'My Tickets', icon: <Ticket size={18} /> },
    { id: 'contact', label: 'Contact Us', icon: <Mail size={18} /> },
    { id: 'chat', label: 'Live Chat', icon: <MessageCircle size={18} /> },
    { id: 'knowledge', label: 'Knowledge Base', icon: <BookOpen size={18} /> }
  ];

  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 rounded-t-lg capitalize transition-all flex items-center gap-2 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : `${currentTheme.card} hover:bg-gray-700`
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SupportTabs;