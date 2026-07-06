// components/Navbar/AdminMenu.jsx - Fixed closing issue
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, FileText, MessageCircle, Calendar, Settings, Shield, LogOut } from 'lucide-react';

const AdminMenu = ({ onClose, currentTheme }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const adminMenuItems = [
    { icon: <BarChart3 size={16} />, label: 'Dashboard', link: '/admin/dashboard', badge: null },
    { icon: <Users size={16} />, label: 'Users Management', link: '/admin/users', badge: '12' },
    { icon: <FileText size={16} />, label: 'Projects', link: '/admin/projects', badge: null },
    { icon: <MessageCircle size={16} />, label: 'Blog Posts', link: '/admin/blog', badge: '4' },
    { icon: <Calendar size={16} />, label: 'Analytics', link: '/admin/analytics', badge: null },
    { icon: <Settings size={16} />, label: 'Settings', link: '/admin/settings', badge: null },
    { icon: <Shield size={16} />, label: 'Security', link: '/admin/security', badge: null },
    { icon: <LogOut size={16} />, label: 'Admin Logout', link: '/admin/logout', badge: null, danger: true },
  ];

  return (
    <div 
      ref={menuRef}
      className={`absolute top-full right-0 mt-2 w-64 ${currentTheme.card} rounded-xl shadow-2xl border ${currentTheme.border} py-2 z-50`}
    >
      <div className="px-4 py-2 border-b border-gray-700">
        <p className="text-xs opacity-75">Admin Panel</p>
      </div>
      {adminMenuItems.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          onClick={onClose}
          className={`flex items-center justify-between px-4 py-2 hover:bg-gray-700 transition-colors ${
            item.danger ? 'text-red-500 hover:bg-red-500/10' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </div>
          {item.badge && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
              {item.badge}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default AdminMenu;