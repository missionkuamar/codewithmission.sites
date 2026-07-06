// components/Navbar/NotificationBell.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, Clock, ShoppingBag, Heart, MessageCircle, UserPlus, Tag, Gift, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);

  // Sample notifications data
  const sampleNotifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #ORD-1001 has been delivered successfully',
      time: '5 minutes ago',
      read: false,
      icon: <ShoppingBag size={16} />,
      link: '/orders/ORD-1001',
      color: 'text-green-500',
      bgColor: 'bg-green-500/20'
    },
    {
      id: 2,
      type: 'wishlist',
      title: 'Back in Stock',
      message: 'AI Analytics Dashboard is back in stock!',
      time: '1 hour ago',
      read: false,
      icon: <Heart size={16} />,
      link: '/projects/1',
      color: 'text-red-500',
      bgColor: 'bg-red-500/20'
    },
    {
      id: 3,
      type: 'comment',
      title: 'New Comment',
      message: 'Sarah commented on your blog post',
      time: '2 hours ago',
      read: false,
      icon: <MessageCircle size={16} />,
      link: '/blog/2',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 20% off on all projects! Limited time offer.',
      time: '5 hours ago',
      read: true,
      icon: <Tag size={16} />,
      link: '/promotions',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20'
    },
    {
      id: 5,
      type: 'user',
      title: 'New User Joined',
      message: 'Welcome to our community! Complete your profile.',
      time: '1 day ago',
      read: true,
      icon: <UserPlus size={16} />,
      link: '/profile',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20'
    },
    {
      id: 6,
      type: 'gift',
      title: 'Reward Points',
      message: 'You earned 500 reward points from your recent purchase',
      time: '2 days ago',
      read: true,
      icon: <Gift size={16} />,
      link: '/rewards',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/20'
    },
    {
      id: 7,
      type: 'alert',
      title: 'Payment Successful',
      message: 'Your payment of $49.99 has been processed successfully',
      time: '3 days ago',
      read: true,
      icon: <Check size={16} />,
      link: '/payments',
      color: 'text-green-500',
      bgColor: 'bg-green-500/20'
    }
  ];

  useEffect(() => {
    // Load notifications from localStorage or use sample
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(parsed);
      setUnreadCount(parsed.filter(n => !n.read).length);
    } else {
      setNotifications(sampleNotifications);
      setUnreadCount(sampleNotifications.filter(n => !n.read).length);
      localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
      setUnreadCount(notifications.filter(n => !n.read).length);
    }
  }, [notifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      setShowNotifications(false);
    }
  };

  const getTimeAgo = (timeString) => {
    return timeString;
  };

  return (
    <div className="relative" ref={notificationRef}>
      {/* Bell Icon with Badge */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800/50">
            <div>
              <h3 className="font-semibold text-lg">Notifications</h3>
              <p className="text-xs opacity-60">You have {unreadCount} unread notifications</p>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-purple-500 hover:text-purple-400 transition-colors"
                >
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-xs text-red-500 hover:text-red-400 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell size={48} className="mx-auto opacity-30 mb-3" />
                <p className="text-sm opacity-60">No notifications yet</p>
                <p className="text-xs opacity-40 mt-1">We'll notify you when something arrives</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-800/50 transition-all duration-300 relative ${
                      !notification.read ? 'bg-purple-500/5' : ''
                    }`}
                  >
                    <Link
                      to={notification.link}
                      onClick={() => {
                        markAsRead(notification.id);
                        setShowNotifications(false);
                      }}
                      className="flex gap-3"
                    >
                      {/* Icon */}
                      <div className={`p-2 rounded-lg ${notification.bgColor} ${notification.color}`}>
                        {notification.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs opacity-50">{notification.time}</span>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm opacity-75 mt-1">{notification.message}</p>
                      </div>
                    </Link>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="absolute top-4 right-4 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-700 transition-all"
                    >
                      <X size={14} className="opacity-50 hover:opacity-100" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-700 text-center">
              <Link
                to="/notifications"
                onClick={() => setShowNotifications(false)}
                className="text-sm text-purple-500 hover:text-purple-400 transition-colors"
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;