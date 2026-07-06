// components/Navbar/SimpleNotificationBell.jsx - Enhanced Version
import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, ShoppingBag, Heart, MessageCircle, Tag, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const SimpleNotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef(null);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // 🔔 Toggle menu
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  // ❌ Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 📩 Mark all as read
  const markAllAsRead = () => {
    setUnreadCount(0);
  };
  // Sample notifications data
  const defaultNotifications = [
    { id: 1, type: 'order', title: 'Order Delivered', message: 'Your order #ORD-1001 has been delivered', time: '5 min ago', read: false, link: '/orders' },
    { id: 2, type: 'wishlist', title: 'Back in Stock', message: 'AI Analytics Dashboard is back in stock!', time: '1 hour ago', read: false, link: '/projects/1' },
    { id: 3, type: 'comment', title: 'New Comment', message: 'Sarah commented on your blog post', time: '2 hours ago', read: false, link: '/blog/2' },
    { id: 4, type: 'promotion', title: 'Special Offer', message: 'Get 20% off on all projects!', time: '5 hours ago', read: true, link: '/promotions' },
    { id: 5, type: 'gift', title: 'Reward Points', message: 'You earned 500 reward points', time: '1 day ago', read: true, link: '/rewards' }
  ];

  // Load data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('simple_notif');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNotifications(parsed);
          setUnreadCount(parsed.filter(n => !n.read).length);
          return;
        }
      }
      setNotifications(defaultNotifications);
      setUnreadCount(defaultNotifications.filter(n => !n.read).length);
    } catch (e) {
      setNotifications(defaultNotifications);
      setUnreadCount(defaultNotifications.filter(n => !n.read).length);
    }
  }, []);

  // Save when notifications change
  useEffect(() => {
    if (notifications.length > 0) {
      try {
        const toSave = notifications.map(({ id, type, title, message, time, read, link }) => ({
          id, type, title, message, time, read, link
        }));
        localStorage.setItem('simple_notif', JSON.stringify(toSave));
      } catch (e) {}
    }
  }, [notifications]);

  // Close on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'order': return <ShoppingBag size={14} className="text-green-500" />;
      case 'wishlist': return <Heart size={14} className="text-red-500" />;
      case 'comment': return <MessageCircle size={14} className="text-blue-500" />;
      case 'promotion': return <Tag size={14} className="text-yellow-500" />;
      case 'gift': return <Gift size={14} className="text-orange-500" />;
      default: return <Bell size={14} className="text-gray-400" />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'order': return 'bg-green-500/20';
      case 'wishlist': return 'bg-red-500/20';
      case 'comment': return 'bg-blue-500/20';
      case 'promotion': return 'bg-yellow-500/20';
      case 'gift': return 'bg-orange-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setUnreadCount(prev => prev - (notifications.find(n => n.id === id)?.read ? 0 : 1));
  };

  const clearAll = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
      setUnreadCount(0);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="relative p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center px-1">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800/50">
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-xs opacity-60">{unreadCount} unread</p>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-purple-500 hover:text-purple-400">
                  Read all
                </button>
              )}
              {notifications.length > 0 && (
                <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-400">
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell size={48} className="mx-auto opacity-30 mb-3" />
                <p className="text-sm opacity-60">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 hover:bg-gray-800/50 transition relative group ${
                      !notif.read ? 'bg-purple-500/5' : ''
                    }`}
                  >
                    <Link
                      to={notif.link}
                      onClick={() => {
                        if (!notif.read) markAsRead(notif.id);
                        setIsOpen(false);
                      }}
                      className="flex gap-3"
                    >
                      <div className={`p-2 rounded-lg ${getBgColor(notif.type)}`}>
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm">{notif.title}</h4>
                          <span className="text-xs opacity-50">{notif.time}</span>
                        </div>
                        <p className="text-sm opacity-75 mt-1">{notif.message}</p>
                        {!notif.read && (
                          <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full mt-1" />
                        )}
                      </div>
                    </Link>
                    <button
                      onClick={() => removeNotification(notif.id)}
                      className="absolute top-4 right-4 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-700 transition"
                    >
                      <X size={14} className="opacity-60 hover:opacity-100" />
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
                onClick={() => setIsOpen(false)}
                className="text-sm text-purple-500 hover:text-purple-400"
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

export default SimpleNotificationBell;