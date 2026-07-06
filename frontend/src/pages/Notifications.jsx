// pages/Notifications.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Bell, ShoppingBag, Heart, MessageCircle, Tag, Gift, Trash2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const { currentTheme, currentMood } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    try {
      const saved = localStorage.getItem('simple_notif');
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotifications(parsed);
      } else {
        // Default notifications
        const defaults = [
          { id: 1, type: 'order', title: 'Order Delivered', message: 'Your order #ORD-1001 has been delivered', time: '5 min ago', read: false, link: '/orders' },
          { id: 2, type: 'wishlist', title: 'Back in Stock', message: 'AI Analytics Dashboard is back in stock!', time: '1 hour ago', read: false, link: '/projects/1' },
          { id: 3, type: 'comment', title: 'New Comment', message: 'Sarah commented on your blog post', time: '2 hours ago', read: false, link: '/blog/2' },
          { id: 4, type: 'promotion', title: 'Special Offer', message: 'Get 20% off on all projects!', time: '5 hours ago', read: true, link: '/promotions' }
        ];
        setNotifications(defaults);
        localStorage.setItem('simple_notif', JSON.stringify(defaults));
      }
    } catch (e) {}
  };

  const getIcon = (type) => {
    switch(type) {
      case 'order': return <ShoppingBag size={18} className="text-green-500" />;
      case 'wishlist': return <Heart size={18} className="text-red-500" />;
      case 'comment': return <MessageCircle size={18} className="text-blue-500" />;
      case 'promotion': return <Tag size={18} className="text-yellow-500" />;
      case 'gift': return <Gift size={18} className="text-orange-500" />;
      default: return <Bell size={18} className="text-gray-400" />;
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
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('simple_notif', JSON.stringify(updated));
  };

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('simple_notif', JSON.stringify(updated));
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('simple_notif', JSON.stringify(updated));
  };

  const deleteAll = () => {
    if (window.confirm('Delete all notifications?')) {
      setNotifications([]);
      localStorage.setItem('simple_notif', JSON.stringify([]));
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    read: notifications.filter(n => n.read).length
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
            <Bell size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Notifications
            </span>
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`${currentTheme.card} ${currentMood} p-4 text-center`}>
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs opacity-75">Total</p>
          </div>
          <div className={`${currentTheme.card} ${currentMood} p-4 text-center`}>
            <p className="text-2xl font-bold text-purple-500">{stats.unread}</p>
            <p className="text-xs opacity-75">Unread</p>
          </div>
          <div className={`${currentTheme.card} ${currentMood} p-4 text-center`}>
            <p className="text-2xl font-bold">{stats.read}</p>
            <p className="text-xs opacity-75">Read</p>
          </div>
        </div>

        {/* Actions */}
        <div className={`${currentTheme.card} ${currentMood} p-4 mb-6 flex justify-between flex-wrap gap-4`}>
          <div className="flex gap-2">
            {['all', 'unread', 'read'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-sm capitalize transition ${
                  filter === f ? 'bg-purple-500 text-white' : 'hover:bg-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {stats.unread > 0 && (
              <button onClick={markAllRead} className="px-3 py-1 rounded-lg text-sm bg-blue-500 hover:bg-blue-600 flex items-center gap-1">
                <Check size={14} /> Read all
              </button>
            )}
            {notifications.length > 0 && (
              <button onClick={deleteAll} className="px-3 py-1 rounded-lg text-sm bg-red-500 hover:bg-red-600 flex items-center gap-1">
                <Trash2 size={14} /> Delete all
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className={`${currentTheme.card} ${currentMood} p-12 text-center`}>
              <Bell size={64} className="mx-auto opacity-30 mb-4" />
              <p className="opacity-75">No notifications</p>
            </div>
          ) : (
            filteredNotifications.map(n => (
              <div key={n.id} className={`${currentTheme.card} ${currentMood} p-4 ${!n.read ? 'border-l-4 border-l-purple-500' : ''}`}>
                <div className="flex gap-4">
                  <div className={`p-2 rounded-lg ${getBgColor(n.type)}`}>
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="font-semibold">{n.title}</h3>
                        <p className="text-sm opacity-75 mt-1">{n.message}</p>
                        <p className="text-xs opacity-50 mt-2">{n.time}</p>
                      </div>
                      <div className="flex gap-2">
                        {!n.read && (
                          <button onClick={() => markAsRead(n.id)} className="text-xs text-purple-500">
                            Mark read
                          </button>
                        )}
                        <button onClick={() => deleteNotification(n.id)} className="text-xs text-red-500">
                          Delete
                        </button>
                      </div>
                    </div>
                    <Link to={n.link} className="inline-block mt-2 text-sm text-purple-500">
                      View details →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;