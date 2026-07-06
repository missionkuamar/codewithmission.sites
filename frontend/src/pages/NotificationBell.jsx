// components/Navbar/NotificationBell.jsx - Ultra Simple Version
import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, ShoppingBag, Heart, MessageCircle, Tag, UserPlus, Gift, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Static notification data
const NOTIFICATIONS_DATA = [
  { id: 1, type: 'order', title: 'Order Delivered', message: 'Your order #ORD-1001 has been delivered', time: '5 min ago', read: false, link: '/orders' },
  { id: 2, type: 'wishlist', title: 'Back in Stock', message: 'AI Analytics Dashboard is back in stock!', time: '1 hour ago', read: false, link: '/projects/1' },
  { id: 3, type: 'comment', title: 'New Comment', message: 'Sarah commented on your blog post', time: '2 hours ago', read: false, link: '/blog/2' },
  { id: 4, type: 'promotion', title: 'Special Offer', message: 'Get 20% off on all projects!', time: '5 hours ago', read: true, link: '/promotions' }
];

const getIcon = (type, size) => {
  const props = { size, className: 'text-current' };
  switch(type) {
    case 'order': return React.createElement(ShoppingBag, props);
    case 'wishlist': return React.createElement(Heart, props);
    case 'comment': return React.createElement(MessageCircle, props);
    case 'promotion': return React.createElement(Tag, props);
    case 'user': return React.createElement(UserPlus, props);
    case 'gift': return React.createElement(Gift, props);
    default: return React.createElement(Bell, props);
  }
};

const getBgColor = (type) => {
  switch(type) {
    case 'order': return 'bg-green-500/20 text-green-500';
    case 'wishlist': return 'bg-red-500/20 text-red-500';
    case 'comment': return 'bg-blue-500/20 text-blue-500';
    case 'promotion': return 'bg-yellow-500/20 text-yellow-500';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef(null);

  // Load data once
  useEffect(() => {
    try {
      const saved = localStorage.getItem('user_notif');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) {
          setItems(parsed);
          setUnreadCount(parsed.filter(i => !i.read).length);
          return;
        }
      }
      setItems(NOTIFICATIONS_DATA);
      setUnreadCount(NOTIFICATIONS_DATA.filter(i => !i.read).length);
    } catch (e) {
      setItems(NOTIFICATIONS_DATA);
      setUnreadCount(NOTIFICATIONS_DATA.filter(i => !i.read).length);
    }
  }, []);

  // Save when items change
  useEffect(() => {
    if (items.length === 0) return;
    try {
      const toSave = items.map(({ id, type, title, message, time, read, link }) => ({
        id, type, title, message, time, read, link
      }));
      localStorage.setItem('user_notif', JSON.stringify(toSave));
      setUnreadCount(items.filter(i => !i.read).length);
    } catch (e) {}
  }, [items]);

  // Handle click outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAsRead = (id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, read: true } : i));
  };

  const markAllRead = () => {
    setItems(prev => prev.map(i => ({ ...i, read: true })));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const clearAll = () => {
    if (confirm('Clear all notifications?')) {
      setItems([]);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 z-50 overflow-hidden">
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
              {items.length > 0 && (
                <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-400">
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <Bell size={48} className="mx-auto opacity-30 mb-3" />
                <p className="text-sm opacity-60">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {items.map((item) => {
                  const bgClass = getBgColor(item.type);
                  return (
                    <div key={item.id} className={`p-4 hover:bg-gray-800/50 transition relative group ${!item.read ? 'bg-purple-500/5' : ''}`}>
                      <Link
                        to={item.link}
                        onClick={() => {
                          markAsRead(item.id);
                          setIsOpen(false);
                        }}
                        className="flex gap-3"
                      >
                        <div className={`p-2 rounded-lg ${bgClass}`}>
                          {getIcon(item.type, 16)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-sm">{item.title}</h4>
                            <span className="text-xs opacity-50">{item.time}</span>
                          </div>
                          <p className="text-sm opacity-75 mt-1">{item.message}</p>
                          {!item.read && (
                            <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full mt-1" />
                          )}
                        </div>
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-4 right-4 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-700 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-3 border-t border-gray-700 text-center">
              <Link to="/notifications" onClick={() => setIsOpen(false)} className="text-sm text-purple-500 hover:text-purple-400">
                View all
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;