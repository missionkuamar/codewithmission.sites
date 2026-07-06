// components/Navbar/ProfileMenu.jsx - Fixed closing issue
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, ShoppingCart, Star, CreditCard, Settings, HelpCircle, LogOut } from 'lucide-react';

const ProfileMenu = ({ onClose, currentTheme }) => {
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    // Add event listener with a small delay to avoid immediate closing
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const profileMenuItems = [
    { icon: <User size={16} />, label: 'My Profile', link: '/profile', badge: null },
    { icon: <Heart size={16} />, label: 'My Orders', link: '/orders', badge: '3' },
    { icon: <ShoppingCart size={16} />, label: 'Cart', link: '/cart', badge: '2' },
    { icon: <Star size={16} />, label: 'Wishlist', link: '/wishlist', badge: '5' },
    { icon: <CreditCard size={16} />, label: 'Payments', link: '/payments', badge: null },
    { icon: <Settings size={16} />, label: 'Settings', link: '/settings', badge: null },
    { icon: <HelpCircle size={16} />, label: 'Help & Support', link: '/support', badge: null },
    { icon: <LogOut size={16} />, label: 'Logout', link: '/logout', badge: null, danger: true },
  ];

  return (
    <div 
      ref={menuRef}
      className={`absolute right-0 mt-2 w-64 ${currentTheme.card} rounded-xl shadow-2xl border ${currentTheme.border} py-2 z-50`}
    >
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">John Doe</p>
            <p className="text-xs opacity-75">john.doe@example.com</p>
          </div>
        </div>
      </div>
      {profileMenuItems.map((item, index) => (
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

export default ProfileMenu;