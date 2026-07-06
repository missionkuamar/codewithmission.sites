// // components/Navbar.jsx - Updated with Profile, Admin, and Search
// import React, { useState, useEffect, useRef } from 'react';
// import { useTheme } from '../context/ThemeContext';
// import { 
//   Menu, X, Palette, Zap, Leaf, Droplet, Flame, Sparkles, Eye,
//   User, Settings, LogOut, Bell, Search, ShoppingBag, 
//   Heart, CreditCard, Shield, HelpCircle, Users, 
//   BarChart3, FileText, Calendar, MessageCircle, 
//   Moon, Sun, ChevronDown, ShoppingCart, Star, Award,
//   Lock, Mail, Phone, MapPin, Globe, TrendingUp
// } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [showThemeMenu, setShowThemeMenu] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showAdminMenu, setShowAdminMenu] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [notifications, setNotifications] = useState(3);
//   const [cartItems, setCartItems] = useState(2);
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
  
//   const { theme, toggleTheme, currentTheme, changeMood, mood, setSpecificTheme, allThemes } = useTheme();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSearch(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const navLinks = [
//     { name: 'Home', href: '/', path: '/', icon: <Globe size={16} /> },
//     { name: 'Projects', href: '/projects', path: '/projects', icon: <FileText size={16} /> },
//     { name: 'Blog', href: '/blog', path: '/blog', icon: <MessageCircle size={16} /> },
//     { name: 'About', href: '/about', path: '/about', icon: <User size={16} /> },
//   ];

//   const moods = [
//     { name: 'professional', icon: <Palette size={18} />, label: 'Professional' },
//     { name: 'colorful', icon: <Zap size={18} />, label: 'Colorful' },
//     { name: 'neon', icon: <Leaf size={18} />, label: 'Neon' },
//     { name: 'pastel', icon: <Droplet size={18} />, label: 'Pastel' },
//     { name: 'glassmorphism', icon: <Sparkles size={18} />, label: 'Glass' },
//     { name: 'minimal', icon: <Eye size={18} />, label: 'Minimal' },
//     { name: 'premium', icon: <Flame size={18} />, label: 'Premium' },
//   ];

//   const popularThemes = [
//     'midnightProfessional', 'cleanWhite', 'sunsetVibes', 'oceanBreeze', 
//     'goldLuxury', 'cyberpunk', 'pastelDream', 'neonNights'
//   ];

//   // Profile Menu Items
//   const profileMenuItems = [
//     { icon: <User size={16} />, label: 'My Profile', link: '/profile', badge: null },
//     { icon: <Heart size={16} />, label: 'My Orders', link: '/orders', badge: '3' },
//     { icon: <ShoppingCart size={16} />, label: 'Cart', link: '/cart', badge: cartItems },
//     { icon: <Star size={16} />, label: 'Wishlist', link: '/wishlist', badge: '5' },
//     { icon: <CreditCard size={16} />, label: 'Payments', link: '/payments', badge: null },
//     { icon: <Settings size={16} />, label: 'Settings', link: '/settings', badge: null },
//     { icon: <HelpCircle size={16} />, label: 'Help & Support', link: '/support', badge: null },
//     { icon: <LogOut size={16} />, label: 'Logout', link: '/logout', badge: null, danger: true },
//   ];

//   // Admin Menu Items
//   const adminMenuItems = [
//     { icon: <BarChart3 size={16} />, label: 'Dashboard', link: '/admin/dashboard', badge: null },
//     { icon: <Users size={16} />, label: 'Users Management', link: '/admin/users', badge: '12' },
//     { icon: <FileText size={16} />, label: 'Projects', link: '/admin/projects', badge: null },
//     { icon: <MessageCircle size={16} />, label: 'Blog Posts', link: '/admin/blog', badge: '4' },
//     { icon: <Calendar size={16} />, label: 'Analytics', link: '/admin/analytics', badge: null },
//     { icon: <Settings size={16} />, label: 'Settings', link: '/admin/settings', badge: null },
//     { icon: <Shield size={16} />, label: 'Security', link: '/admin/security', badge: null },
//     { icon: <LogOut size={16} />, label: 'Admin Logout', link: '/admin/logout', badge: null, danger: true },
//   ];

//   // Search suggestions
//   const searchSuggestions = [
//     { type: 'project', title: 'AI Analytics Dashboard', link: '/projects/1', icon: <FileText size={14} /> },
//     { type: 'project', title: 'E-Commerce Platform', link: '/projects/2', icon: <FileText size={14} /> },
//     { type: 'blog', title: 'React 18 Advanced Patterns', link: '/blog/2', icon: <MessageCircle size={14} /> },
//     { type: 'blog', title: 'Tailwind CSS Best Practices', link: '/blog/3', icon: <MessageCircle size={14} /> },
//     { type: 'product', title: 'Premium Theme Package', link: '/products/1', icon: <ShoppingBag size={14} /> },
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${searchQuery}`);
//       setShowSearch(false);
//       setSearchQuery('');
//     }
//   };

//   const scrollToSection = (href) => {
//     if (href.startsWith('#')) {
//       const element = document.querySelector(href);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//       setIsOpen(false);
//     }
//   };

//   return (
//     <>
//       <nav
//         className={`fixed w-full z-50 transition-all duration-500 ${
//           scrolled
//             ? `${currentTheme.bg} bg-opacity-95 backdrop-blur-md shadow-2xl}`
//             : 'bg-transparent'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
//                 Portfolio Pro
//               </Link>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-6">
//               {navLinks.map((link) => (
//                 link.href.startsWith('#') ? (
//                   <button
//                     key={link.name}
//                     onClick={() => scrollToSection(link.href)}
//                     className="hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300 flex items-center gap-1"
//                   >
//                     {link.icon}
//                     {link.name}
//                   </button>
//                 ) : (
//                   <Link
//                     key={link.name}
//                     to={link.href}
//                     className={`hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300 flex items-center gap-1 ${
//                       location.pathname === link.href ? 'bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent' : ''
//                     }`}
//                   >
//                     {link.icon}
//                     {link.name}
//                   </Link>
//                 )
//               ))}
//             </div>

//             {/* Right Side Icons */}
//             <div className="hidden md:flex items-center space-x-2">
//               {/* Search Button */}
//               <button
//                 onClick={() => setShowSearch(!showSearch)}
//                 className="p-2 rounded-lg hover:scale-110 transition-transform duration-300 relative"
//               >
//                 <Search size={20} />
//               </button>

//               {/* Cart Button */}
//               <Link to="/cart" className="relative p-2 rounded-lg hover:scale-110 transition-transform duration-300">
//                 <ShoppingBag size={20} />
//                 {cartItems > 0 && (
//                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                     {cartItems}
//                   </span>
//                 )}
//               </Link>

//               {/* Notifications */}
//               <button className="relative p-2 rounded-lg hover:scale-110 transition-transform duration-300">
//                 <Bell size={20} />
//                 {notifications > 0 && (
//                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
//                     {notifications}
//                   </span>
//                 )}
//               </button>

//               {/* Theme Selector */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowThemeMenu(!showThemeMenu)}
//                   className="p-2 rounded-lg hover:scale-110 transition-transform duration-300"
//                 >
//                   <Palette size={20} />
//                 </button>
                
//                 {showThemeMenu && (
//                   <div className={`absolute right-0 mt-2 w-80 ${currentTheme.card} rounded-xl shadow-2xl border ${currentTheme.border} p-2 z-50`}>
//                     <div className="p-2 border-b border-gray-700">
//                       <h3 className="font-semibold">Quick Themes</h3>
//                     </div>
//                     <div className="max-h-96 overflow-y-auto">
//                       {popularThemes.map((themeName) => (
//                         <button
//                           key={themeName}
//                           onClick={() => {
//                             setSpecificTheme(themeName);
//                             setShowThemeMenu(false);
//                           }}
//                           className={`w-full text-left p-3 rounded-lg transition-all hover:scale-102 ${
//                             theme === themeName ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' : 'hover:bg-gray-700'
//                           }`}
//                         >
//                           <div className="flex items-center gap-3">
//                             <div className={`w-8 h-8 rounded-full ${allThemes[themeName]?.accent || 'bg-purple-500'}`} />
//                             <div>
//                               <p className="font-medium capitalize">
//                                 {themeName.replace(/([A-Z])/g, ' $1').trim()}
//                               </p>
//                               <p className="text-xs opacity-75">Click to apply</p>
//                             </div>
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Mood Selector */}
//               <div className="flex space-x-1">
//                 {moods.slice(0, 3).map((m) => (
//                   <button
//                     key={m.name}
//                     onClick={() => changeMood(m.name)}
//                     className={`p-2 rounded-lg transition-all duration-300 ${
//                       mood === m.name
//                         ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
//                         : `${currentTheme.card} hover:scale-110`
//                     }`}
//                     title={m.label}
//                   >
//                     {m.icon}
//                   </button>
//                 ))}
//               </div>

//               {/* Admin Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowAdminMenu(!showAdminMenu)}
//                   className="p-2 rounded-lg hover:scale-110 transition-transform duration-300 flex items-center gap-1"
//                 >
//                   <Shield size={18} />
//                   <ChevronDown size={14} />
//                 </button>
                
//                 {showAdminMenu && (
//                   <div className={`absolute right-0 mt-2 w-64 ${currentTheme.card} rounded-xl shadow-2xl border ${currentTheme.border} py-2 z-50`}>
//                     <div className="px-4 py-2 border-b border-gray-700">
//                       <p className="text-xs opacity-75">Admin Panel</p>
//                     </div>
//                     {adminMenuItems.map((item, index) => (
//                       <Link
//                         key={index}
//                         to={item.link}
//                         onClick={() => setShowAdminMenu(false)}
//                         className={`flex items-center justify-between px-4 py-2 hover:bg-gray-700 transition-colors ${
//                           item.danger ? 'text-red-500 hover:bg-red-500/10' : ''
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           {item.icon}
//                           <span className="text-sm">{item.label}</span>
//                         </div>
//                         {item.badge && (
//                           <span className="px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
//                             {item.badge}
//                           </span>
//                         )}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Profile Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowProfileMenu(!showProfileMenu)}
//                   className="flex items-center gap-2 p-1 rounded-lg hover:scale-105 transition-transform duration-300"
//                 >
//                   <img
//                     src="https://randomuser.me/api/portraits/men/1.jpg"
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                   <ChevronDown size={14} />
//                 </button>
                
//                 {showProfileMenu && (
//                   <div className={`absolute right-0 mt-2 w-64 ${currentTheme.card} rounded-xl shadow-2xl border ${currentTheme.border} py-2 z-50`}>
//                     <div className="px-4 py-3 border-b border-gray-700">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src="https://randomuser.me/api/portraits/men/1.jpg"
//                           alt="Profile"
//                           className="w-10 h-10 rounded-full object-cover"
//                         />
//                         <div>
//                           <p className="font-semibold text-sm">John Doe</p>
//                           <p className="text-xs opacity-75">john.doe@example.com</p>
//                         </div>
//                       </div>
//                     </div>
//                     {profileMenuItems.map((item, index) => (
//                       <Link
//                         key={index}
//                         to={item.link}
//                         onClick={() => setShowProfileMenu(false)}
//                         className={`flex items-center justify-between px-4 py-2 hover:bg-gray-700 transition-colors ${
//                           item.danger ? 'text-red-500 hover:bg-red-500/10' : ''
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           {item.icon}
//                           <span className="text-sm">{item.label}</span>
//                         </div>
//                         {item.badge && (
//                           <span className="px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
//                             {item.badge}
//                           </span>
//                         )}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Random Theme Button */}
//               <button
//                 onClick={toggleTheme}
//                 className="p-2 rounded-lg hover:scale-110 transition-transform duration-300"
//                 title="Random Theme"
//               >
//                 <Sparkles size={18} />
//               </button>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center space-x-2">
//               <Link to="/cart" className="relative p-2">
//                 <ShoppingBag size={20} />
//                 {cartItems > 0 && (
//                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                     {cartItems}
//                   </span>
//                 )}
//               </Link>
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-2 rounded-lg"
//               >
//                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {isOpen && (
//             <div className="md:hidden">
//               <div className="px-2 pt-2 pb-3 space-y-1">
//                 {/* Search in mobile */}
//                 <div className="px-3 py-2">
//                   <form onSubmit={handleSearch} className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} text-sm`}
//                     />
//                     <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" />
//                   </form>
//                 </div>

//                 {navLinks.map((link) => (
//                   link.href.startsWith('#') ? (
//                     <button
//                       key={link.name}
//                       onClick={() => {
//                         scrollToSection(link.href);
//                         setIsOpen(false);
//                       }}
//                       className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all"
//                     >
//                       {link.name}
//                     </button>
//                   ) : (
//                     <Link
//                       key={link.name}
//                       to={link.href}
//                       onClick={() => setIsOpen(false)}
//                       className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all ${
//                         location.pathname === link.href ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''
//                       }`}
//                     >
//                       {link.name}
//                     </Link>
//                   )
//                 ))}
                
//                 <div className="px-3 py-2 border-t border-gray-700">
//                   <p className="text-sm font-semibold mb-2">Admin Panel</p>
//                   {adminMenuItems.slice(0, 4).map((item, index) => (
//                     <Link
//                       key={index}
//                       to={item.link}
//                       onClick={() => setIsOpen(false)}
//                       className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-700"
//                     >
//                       {item.icon}
//                       {item.label}
//                     </Link>
//                   ))}
//                 </div>

//                 <div className="px-3 py-2 border-t border-gray-700">
//                   <p className="text-sm font-semibold mb-2">Mood Styles</p>
//                   <div className="flex flex-wrap gap-2">
//                     {moods.map((m) => (
//                       <button
//                         key={m.name}
//                         onClick={() => changeMood(m.name)}
//                         className={`p-2 rounded-lg transition-all ${
//                           mood === m.name
//                             ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
//                             : `${currentTheme.card}`
//                         }`}
//                         title={m.label}
//                       >
//                         {m.icon}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Search Modal */}
//       {showSearch && (
//         <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fadeIn">
//           <div ref={searchRef} className={`max-w-2xl mx-auto mt-20 p-4`}>
//             <div className={`${currentTheme.card} rounded-2xl shadow-2xl overflow-hidden`}>
//               <form onSubmit={handleSearch} className="p-4 border-b border-gray-700">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={20} />
//                   <input
//                     type="text"
//                     placeholder="Search for projects, blogs, products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className={`w-full pl-10 pr-12 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
//                     autoFocus
//                   />
//                   <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
//                     Search
//                   </button>
//                 </div>
//               </form>
              
//               <div className="p-4">
//                 <p className="text-xs opacity-75 mb-3">Popular Searches</p>
//                 <div className="space-y-2">
//                   {searchSuggestions.map((suggestion, index) => (
//                     <Link
//                       key={index}
//                       to={suggestion.link}
//                       onClick={() => setShowSearch(false)}
//                       className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
//                     >
//                       <div className="p-1 rounded bg-purple-500/20">
//                         {suggestion.icon}
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium">{suggestion.title}</p>
//                         <p className="text-xs opacity-50 capitalize">{suggestion.type}</p>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;