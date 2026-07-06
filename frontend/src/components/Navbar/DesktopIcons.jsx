// components/Navbar/DesktopIcons.jsx - Fully Responsive with Theme Features
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Search, ShoppingBag, Palette, User, Sparkles, ChevronDown,
  Heart, Bell, Zap, Leaf, Menu, X, LogOut, LogIn,
  Sun, Moon, Monitor, Grid, List, LayoutGrid
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';

const DesktopIcons = ({
  cartItems,
  onSearchClick,
  onRandomTheme,
  onProfileMenuToggle,
  onAdminMenuToggle,
  onLogout,
  user,
}) => {
  const { theme, currentTheme, changeMood, mood, setSpecificTheme, allThemes, toggleTheme } = useTheme();
  const [showNotification, setShowNotification] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoodMenu, setShowMoodMenu] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Order Delivered", message: "Your order #ORD-1001 has been delivered", time: "5 min ago", read: false },
    { id: 2, title: "Welcome!", message: "Thanks for joining Portfolio Pro", time: "1 hour ago", read: false },
  ]);

  // Get user from Redux
  const reduxUser = useSelector((state) => state.auth?.user);
  const currentUser = user || reduxUser;

  // Check if user is admin
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';
  //const isEditor = currentUser?.role === 'editor' || currentUser?.role === 'admin';

  // Refs for dropdowns
  const notificationRef = useRef(null);
  const themeMenuRef = useRef(null);
  const adminMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const moodMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotification(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
        setShowAdminMenu(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      if (moodMenuRef.current && !moodMenuRef.current.contains(event.target)) {
        setShowMoodMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // All available themes
  const popularThemes = [
    'midnightProfessional', 'cleanWhite', 'sunsetVibes', 'oceanBreeze',
    'goldLuxury', 'cyberpunk', 'pastelDream', 'neonNights',
    'darkKnight', 'royalNavy', 'auroraBorealis', 'sapphire',
    'roseGold', 'emerald', 'ruby', 'firestorm',
    'mintFresh', 'lavender', 'peachBlush', 'futuristic'
  ];

  // All moods
  const moodOptions = [
    { name: 'professional', icon: <LayoutGrid size={16} />, label: 'Professional', color: 'from-purple-500 to-pink-500' },
    { name: 'colorful', icon: <Zap size={16} />, label: 'Colorful', color: 'from-yellow-500 to-orange-500' },
    { name: 'neon', icon: <Leaf size={16} />, label: 'Neon', color: 'from-cyan-500 to-green-500' },
    { name: 'glassmorphism', icon: <Monitor size={16} />, label: 'Glass', color: 'from-blue-400 to-cyan-400' },
    { name: 'minimal', icon: <Grid size={16} />, label: 'Minimal', color: 'from-gray-400 to-gray-600' },
    { name: 'premium', icon: <Sun size={16} />, label: 'Premium', color: 'from-amber-500 to-yellow-500' },
    { name: 'pastel', icon: <Moon size={16} />, label: 'Pastel', color: 'from-pink-300 to-purple-300' }
  ];

 const dispatch = useDispatch();

const handleLogout = () => {
  dispatch(logoutUser());
};
  const navLinks = [
    // { name: "My Profile", href: "/profile", icon: "👤" },
    // { name: "My Projects", href: "/projects", icon: "📁" },
    // { name: "Security", href: "/security", icon: "🛡️" },
    // { name: "Settings", href: "/settings", icon: "⚙️" },
    // { name: "Help Center", href: "/help", icon: "❓" },
    // { name: "Support", href: "/support", icon: "🎧" },
  ];

  const adminMenuItems = [
    { icon: <LayoutGrid size={16} />, label: "Dashboard", link: "/admin/dashboard" },
    { icon: <Users size={16} />, label: "Users", link: "/admin/users", badge: "12" },
    { icon: <Shield size={16} />, label: "Roles", link: "/admin/roles" },
    { icon: <FileText size={16} />, label: "Projects", link: "/admin/projects" },
    { icon: <MessageCircle size={16} />, label: "Blog", link: "/admin/blog", badge: "4" },
    { icon: <Calendar size={16} />, label: "Orders", link: "/admin/orders" },
    { icon: <Calendar size={16} />, label: "Payments", link: "/admin/payments" },
    { icon: <BarChart3 size={16} />, label: "Analytics", link: "/admin/analytics" },
    { icon: <MessageCircle size={16} />, label: "Support Tickets", link: "/admin/support", badge: "8" },
    { icon: <Settings size={16} />, label: "Settings", link: "/admin/settings" },
    { icon: <Shield size={16} />, label: "Security", link: "/admin/security" },
    { icon: <Shield size={16} />, label: "API Keys", link: "/admin/api-keys" },
    { icon: <LogOut size={16} />, label: "Admin Logout", link: "/admin/logout", danger: true },
  ];

  const handleMoodChange = (newMood) => {
    if (changeMood && typeof changeMood === 'function') {
      changeMood(newMood);
    }
    setShowMoodMenu(false);
    setMobileMenuOpen(false);
  };

  const handleRandomTheme = (e) => {
    e.stopPropagation();
    const themeKeys = Object.keys(allThemes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setSpecificTheme(themeKeys[nextIndex]);
  };

  const handleThemeSelect = (themeName) => {
    setSpecificTheme(themeName);
    setShowThemeMenu(false);
  };

  // const handleLogout = () => {
  //   if (onLogout) onLogout();
  //   setShowProfileMenu(false);
  //   setMobileMenuOpen(false);
  // };

  // Get theme accent color
  const getThemeAccent = (themeName) => {
    const themeColors = {
      midnightProfessional: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      cleanWhite: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      sunsetVibes: 'bg-gradient-to-r from-yellow-500 to-red-500',
      oceanBreeze: 'bg-gradient-to-r from-cyan-400 to-blue-500',
      goldLuxury: 'bg-gradient-to-r from-yellow-500 to-amber-600',
      cyberpunk: 'bg-gradient-to-r from-cyan-400 to-pink-500',
      pastelDream: 'bg-gradient-to-r from-purple-400 to-pink-400',
      neonNights: 'bg-gradient-to-r from-cyan-400 to-purple-500'
    };
    return themeColors[themeName] || 'bg-gradient-to-r from-purple-500 to-pink-500';
  };

  return (
    <>
      {/* ========== DESKTOP VIEW (lg and above) ========== */}
      <div className="hidden lg:flex items-center gap-1 xl:gap-2">
        
        {/* Search */}
        {/* <button 
          onClick={onSearchClick} 
          className="p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110" 
          title="Search"
        >
          <Search size={20} />
        </button> */}

        {/* Cart */}
        {/* {currentUser && (
          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110" title="Cart">
            <ShoppingBag size={20} />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center px-1">
                {cartItems}
              </span>
            )}
          </Link>
        )} */}

        {/* Notifications */}
        {/* {currentUser && (
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotification(!showNotification)} 
              className="relative p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110" 
              title="Notifications"
            >
              <Bell size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            {showNotification && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 z-50">
                <div className="p-3 border-b border-gray-700">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-400 text-sm">No notifications</div>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className="p-3 hover:bg-gray-800 border-b border-gray-700">
                        <div className="flex justify-between">
                          <h4 className="font-semibold text-sm">{notif.title}</h4>
                          <span className="text-xs text-gray-400">{notif.time}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <button onClick={() => setNotifications([])} className="w-full p-2 text-center text-sm text-purple-500 hover:bg-gray-800">
                    Clear all
                  </button>
                )}
              </div>
            )}
          </div>
        )} */}

        {/* Theme Selector Button */}
        <div className="relative" ref={themeMenuRef}>
          <button 
            onClick={() => setShowThemeMenu(!showThemeMenu)} 
            className={`p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110 ${
              showThemeMenu ? 'bg-purple-500/20 ring-1 ring-purple-500' : ''
            }`} 
            title="Change Theme"
          >
            <Palette size={20} />
          </button>

          {showThemeMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 p-2 z-50 max-h-[80vh] overflow-y-auto">
              <div className="p-3 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">🎨 Theme Gallery</h3>
                    <p className="text-xs text-gray-400">Choose your favorite appearance</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                    {Object.keys(allThemes).length} Themes
                  </span>
                </div>
                {/* Quick Theme Actions */}
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => { toggleTheme(); setShowThemeMenu(false); }}
                    className="flex-1 py-1 text-xs rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                  >
                    ⚡ Random
                  </button>
                  <button 
                    onClick={() => { setSpecificTheme('midnightProfessional'); setShowThemeMenu(false); }}
                    className="flex-1 py-1 text-xs rounded-lg bg-gray-700 hover:bg-gray-600"
                  >
                    🌙 Dark
                  </button>
                  <button 
                    onClick={() => { setSpecificTheme('cleanWhite'); setShowThemeMenu(false); }}
                    className="flex-1 py-1 text-xs rounded-lg bg-gray-700 hover:bg-gray-600"
                  >
                    ☀️ Light
                  </button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {popularThemes.map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => handleThemeSelect(themeName)}
                    className={`w-full text-left p-3 rounded-lg transition hover:bg-gray-800 mb-1 ${
                      theme === themeName ? 'bg-purple-500/20 ring-1 ring-purple-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${getThemeAccent(themeName)}`} />
                      <div>
                        <p className="font-medium capitalize text-white text-sm">
                          {themeName.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-xs text-gray-400">Click to apply</p>
                      </div>
                      {theme === themeName && (
                        <span className="ml-auto text-xs text-purple-400">✓ Active</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-gray-700 mt-1 sticky bottom-0 bg-gray-900">
                <p className="text-xs text-center text-gray-400">✨ {Object.keys(allThemes).length}+ themes available</p>
              </div>
            </div>
          )}
        </div>

        {/* Random Theme Button */}
        <button 
          onClick={handleRandomTheme} 
          className="p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110" 
          title="Random Theme"
        >
          <Sparkles size={20} />
        </button>

        {/* Mood Selector Button */}
        <div className="relative" ref={moodMenuRef}>
          <button 
            onClick={() => setShowMoodMenu(!showMoodMenu)} 
            className={`p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110 ${
              showMoodMenu ? 'bg-purple-500/20 ring-1 ring-purple-500' : ''
            }`}
            title="Mood Styles"
          >
            <LayoutGrid size={20} />
          </button>

          {showMoodMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 p-2 z-50">
              <div className="p-2 border-b border-gray-700">
                <h3 className="font-semibold text-sm">🎭 Mood Styles</h3>
                <p className="text-xs text-gray-400">Change the visual style</p>
              </div>
              <div className="grid grid-cols-2 gap-2 p-2">
                {moodOptions.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => handleMoodChange(m.name)}
                    className={`p-2 rounded-lg text-center transition hover:scale-105 ${
                      mood === m.name
                        ? `bg-gradient-to-r ${m.color} text-white shadow-lg`
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex justify-center">{m.icon}</div>
                    <span className="text-xs mt-1 block">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Wishlist */}
        {/* <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110" title="Wishlist">
          <Heart size={18} />
          <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-pink-500 text-white text-[9px] rounded-full flex items-center justify-center px-1">
            123
          </span>
        </Link> */}

        {/* Admin Panel */}
        {isAdmin && (
          <div className="relative" ref={adminMenuRef}>
            <button 
              onClick={() => setShowAdminMenu(!showAdminMenu)} 
              className={`p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110 flex items-center gap-1 ${
                showAdminMenu ? 'bg-purple-500/20 ring-1 ring-purple-500' : ''
              }`} 
              title="Admin Panel"
            >
              <Shield size={18} />
              <ChevronDown size={14} />
            </button>

            {showAdminMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 py-2 z-50 max-h-[80vh] overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-700 sticky top-0 bg-gray-900">
                  <p className="text-xs text-gray-400">🔐 Admin Panel</p>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2">
                  {adminMenuItems.slice(0, 12).map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      onClick={() => setShowAdminMenu(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-gray-800 text-sm ${
                        item.danger ? "text-red-500 hover:bg-red-500/10" : ""
                      }`}
                    >
                      {item.icon}
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-red-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 mt-1 pt-1">
                  <Link
                    to="/admin/logout"
                    onClick={() => setShowAdminMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10 transition text-sm"
                  >
                    <LogOut size={16} /> Admin Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Profile */}
        <div className="relative" ref={profileMenuRef}>
          {currentUser ? (
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)} 
              className={`flex items-center gap-2 p-1 rounded-lg hover:bg-gray-700 transition hover:scale-105 ${
                showProfileMenu ? 'bg-purple-500/20 ring-1 ring-purple-500' : ''
              }`} 
              title="Profile"
            >
              <img
                src={currentUser?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                alt={currentUser?.name || "Profile"}
                className="w-8 h-8 rounded-full object-cover"
              />
              <ChevronDown size={14} />
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition hover:scale-110">
              <LogIn size={20} />
              <span className="text-sm font-medium">Login</span>
            </Link>
          )}

          {showProfileMenu && currentUser && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                    alt={currentUser?.name || "Profile"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{currentUser?.name || "Guest User"}</p>
                    <p className="text-xs text-gray-400">{currentUser?.email || "guest@example.com"}</p>
                    {currentUser?.role && (
                      <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] bg-purple-500/20 text-purple-400 rounded-full">
                        {currentUser.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition text-sm"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="border-t border-gray-700 my-1"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-500/10 transition text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========== MOBILE VIEW ========== */}
      <div className="flex lg:hidden items-center gap-2">
        {currentUser && (
          <Link to="/cart" className="relative p-2">
            <ShoppingBag size={20} />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Link>
        )}

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="p-2 rounded-lg hover:bg-gray-700 transition"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-16 left-0 right-0 bottom-0 bg-gray-900 border-t border-gray-700 shadow-xl z-50 overflow-y-auto lg:hidden"
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <div className="flex flex-col p-4 space-y-2">
            {/* User Info */}
            {currentUser && (
              <div className="px-4 py-3 bg-gray-800 rounded-lg mb-2">
                <p className="font-semibold">{currentUser.name}</p>
                <p className="text-sm text-gray-400">{currentUser.email}</p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-2 p-2 bg-gray-800/50 rounded-lg">
              {/* <button onClick={onSearchClick} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700">
                <Search size={18} />
                <span className="text-[10px] mt-1">Search</span>
              </button> */}
              <button onClick={() => { toggleTheme(); setMobileMenuOpen(false); }} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700">
                <Sparkles size={18} />
                <span className="text-[10px] mt-1">Random</span>
              </button>
              {/* <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700">
                <Heart size={18} />
                <span className="text-[10px] mt-1">Wishlist</span>
              </Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700">
                <User size={18} />
                <span className="text-[10px] mt-1">Profile</span>
              </Link> */}
            </div>

            <div className="border-t border-gray-700 my-2"></div>

            {/* Theme Quick Select */}
            <div className="px-2 py-2">
              <p className="text-xs text-gray-400 mb-2">🎨 Quick Themes</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['midnightProfessional', 'cleanWhite', 'sunsetVibes', 'oceanBreeze', 'cyberpunk'].map((t) => (
                  <button
                    key={t}
                    onClick={() => { setSpecificTheme(t); setMobileMenuOpen(false); }}
                    className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                      theme === t ? 'bg-purple-500 text-white' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {t.replace(/([A-Z])/g, ' $1').trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Selector */}
            <div className="px-2 py-2">
              <p className="text-xs text-gray-400 mb-2">🎭 Mood Styles</p>
              <div className="flex gap-2 flex-wrap">
                {moodOptions.slice(0, 4).map((m) => (
                  <button
                    key={m.name}
                    onClick={() => { changeMood(m.name); setMobileMenuOpen(false); }}
                    className={`px-3 py-1 text-xs rounded-full ${
                      mood === m.name
                        ? `bg-gradient-to-r ${m.color} text-white`
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-700 my-2"></div>

            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-lg"
              >
                <span className="text-2xl">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Admin Links */}
            {/* {isAdmin && (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <div className="px-4 py-2">
                  <p className="text-sm text-gray-400 mb-3">🔐 Admin Panel</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-center text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                      📊 Dashboard
                    </Link>
                    <Link to="/admin/users" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-center text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                      👥 Users
                    </Link>
                    <Link to="/admin/projects" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-center text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                      📁 Projects
                    </Link>
                    <Link to="/admin/blog" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-center text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                      📝 Blog
                    </Link>
                    <Link to="/admin/analytics" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-center text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                      📊 Analytics
                    </Link>
                    <Link to="/admin/settings" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-center text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                      ⚙️ Settings
                    </Link>
                  </div>
                </div>
              </>
            )} */}

            <div className="border-t border-gray-700 my-2"></div>

            {/* Auth */}
            {currentUser ? (
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                <LogIn size={18} /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Import missing icons at the top
import { BarChart3, Users, FileText, MessageCircle, Calendar, Settings, Shield } from 'lucide-react';
import { logoutUser } from '../../redux/slices/authSlice';

export default DesktopIcons;