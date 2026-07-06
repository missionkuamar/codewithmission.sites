// components/auth/AuthNotification.jsx
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const AuthNotification = ({ notification }) => {
  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
      <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
        {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

export default AuthNotification;