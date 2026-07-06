// components/support/SupportHeader.jsx
import React from 'react';
import { Headphones, MessageCircle, Mail, Clock } from 'lucide-react';

const SupportHeader = ({ currentTheme }) => {
  const contactChannels = [
    { icon: <MessageCircle size={20} />, title: "Live Chat", value: "Available 24/7", action: "Start Chat" },
    { icon: <Mail size={20} />, title: "Email Support", value: "support@example.com", action: "Send Email" },
    { icon: <Clock size={20} />, title: "Response Time", value: "Within 2 hours", action: "View Status" }
  ];

  return (
    <div className="text-center mb-8">
      <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
        <Headphones size={32} className="text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        How Can We{' '}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Help You?
        </span>
      </h1>
      <p className="text-xl opacity-75 max-w-2xl mx-auto">
        Get the support you need with our comprehensive help center
      </p>
      
      <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
        {contactChannels.map((channel, index) => (
          <div key={index} className={`${currentTheme.card} p-4 text-center hover:scale-105 transition-all cursor-pointer`}>
            <div className="text-purple-500 mb-2">{channel.icon}</div>
            <h3 className="font-semibold">{channel.title}</h3>
            <p className="text-sm opacity-75">{channel.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportHeader;