// components/common/Notification.jsx
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

const Notification = ({ notification, setNotification }) => {
  if (!notification) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
      <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
        <Check size={20} />
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

export default Notification;