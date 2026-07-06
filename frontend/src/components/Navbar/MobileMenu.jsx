import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  ShoppingBag,
  X,
  BarChart3,
  Users,
  FileText,
  MessageCircle
} from 'lucide-react';

const MobileMenu = ({
  isOpen,
  setIsOpen,
  scrollToSection,
  location,
  currentTheme,
  changeMood,
  mood,
  moods,
  cartItems = 0 // ✅ default safe
}) => {

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  // ✅ Direct icon components use karo
  const adminMenuItems = [
    { icon: <BarChart3 size={16} />, label: 'Dashboard', link: '/admin/dashboard' },
    { icon: <Users size={16} />, label: 'Users', link: '/admin/users' },
    { icon: <FileText size={16} />, label: 'Projects', link: '/admin/projects' },
    { icon: <MessageCircle size={16} />, label: 'Blog Posts', link: '/admin/blog' },
  ];

  return (
    <>
      {/* TOP BAR */}
      <div className="md:hidden flex items-center space-x-2">

        {/* CART */}
        <Link to="/cart" className="relative p-2">
          <ShoppingBag size={20} />

          {cartItems > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {cartItems}
            </span>
          )}
        </Link>

        {/* MENU BUTTON */}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="p-2 rounded-lg"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden animate-fadeIn">

          <div className="px-2 pt-2 pb-3 space-y-1">

            {/* NAV LINKS */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all
                  hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white
                  ${location.pathname === link.href
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : ''
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* ADMIN */}
            <div className="px-3 py-2 border-t border-gray-700 mt-2">
              <p className="text-sm font-semibold mb-2">Admin Panel</p>

              {adminMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-700 transition"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>

            {/* MOOD */}
            <div className="px-3 py-2 border-t border-gray-700 mt-2">
              <p className="text-sm font-semibold mb-2">Mood Styles</p>

              <div className="flex flex-wrap gap-2">
                {moods.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => changeMood(m.name)}
                    className={`p-2 rounded-lg transition-all ${
                      mood === m.name
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : currentTheme.card
                    }`}
                    title={m.label}
                  >
                    <span className="text-xs">
                      {m.label.charAt(0)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;