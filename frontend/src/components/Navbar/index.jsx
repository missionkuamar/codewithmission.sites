// components/Navbar/index.jsx - Main Navbar Component (Fixed)
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import NavLinks from './NavLinks';
import DesktopIcons from './DesktopIcons';
import MobileMenu from './MobileMenu';
import ThemeMenu from './ThemeMenu';
import AdminMenu from './AdminMenu';
import ProfileMenu from './ProfileMenu';
import SearchModal from './SearchModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [cartItems, setCartItems] = useState(2);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Refs for menu containers
  const themeMenuRef = useRef(null);
  const adminMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  const { theme, toggleTheme, currentTheme, changeMood, mood, setSpecificTheme, allThemes } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
 // console.log('Navbar - changeMood exists:', typeof changeMood); // Debug log

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close all menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close theme menu if clicking outside
      if (showThemeMenu && themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
      // Close admin menu if clicking outside
      if (showAdminMenu && adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
        setShowAdminMenu(false);
      }
      // Close profile menu if clicking outside
      if (showProfileMenu && profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showThemeMenu, showAdminMenu, showProfileMenu]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  // Menu toggle handlers with stopPropagation
  const handleThemeMenuToggle = (e) => {
    e.stopPropagation();
    setShowThemeMenu(!showThemeMenu);
    setShowAdminMenu(false);
    setShowProfileMenu(false);
  };

  const handleRandomTheme = (e) => {
    e.stopPropagation();
    const themeKeys = Object.keys(allThemes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setSpecificTheme(themeKeys[nextIndex]);
  };
  const handleAdminMenuToggle = (e) => {
    e.stopPropagation();
    setShowAdminMenu(!showAdminMenu);
    setShowThemeMenu(false);
    setShowProfileMenu(false);
  };

  const handleProfileMenuToggle = (e) => {
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
    setShowThemeMenu(false);
    setShowAdminMenu(false);
  };

  const handleSearchToggle = () => {
    setShowSearch(true);
    setShowThemeMenu(false);
    setShowAdminMenu(false);
    setShowProfileMenu(false);
  };

  const popularThemes = [
    'midnightProfessional', 'cleanWhite', 'sunsetVibes', 'oceanBreeze',
    'goldLuxury', 'cyberpunk', 'pastelDream', 'neonNights'
  ];

  const moods = [
    { name: 'professional', icon: 'Palette', label: 'Professional' },
    { name: 'colorful', icon: 'Zap', label: 'Colorful' },
    { name: 'neon', icon: 'Leaf', label: 'Neon' },
    { name: 'pastel', icon: 'Droplet', label: 'Pastel' },
    { name: 'glassmorphism', icon: 'Sparkles', label: 'Glass' },
    { name: 'minimal', icon: 'Eye', label: 'Minimal' },
    { name: 'premium', icon: 'Flame', label: 'Premium' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
            ? `${currentTheme.bg} bg-opacity-95 backdrop-blur-md shadow-2xl`
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />

            <NavLinks
              scrollToSection={scrollToSection}
              location={location}
              currentTheme={currentTheme}
            />

            <DesktopIcons
              cartItems={cartItems}
              notifications={notifications}
              onSearchClick={() => setShowSearch(true)}
              onThemeMenuToggle={handleThemeMenuToggle}
              onAdminMenuToggle={handleAdminMenuToggle}
              onProfileMenuToggle={handleProfileMenuToggle}
              onRandomTheme={handleRandomTheme}
              currentTheme={currentTheme}
              showThemeMenu={showThemeMenu}
              showAdminMenu={showAdminMenu}
              showProfileMenu={showProfileMenu}
              mood={mood}
              changeMood={changeMood}
            />

            {/* <MobileMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              scrollToSection={scrollToSection}
              location={location}
              currentTheme={currentTheme}
              changeMood={changeMood}
              mood={mood}
              moods={moods}
            /> */}
          </div>
        </div>
      </nav>

      {/* Theme Menu Dropdown */}
      {showThemeMenu && (
        <div ref={themeMenuRef}>
          <ThemeMenu
            theme={theme}
            popularThemes={popularThemes}
            allThemes={allThemes}
            onSelectTheme={(themeName) => {
              setSpecificTheme(themeName);
              setShowThemeMenu(false);
            }}
            onClose={() => setShowThemeMenu(false)}
            currentTheme={currentTheme}
          />
        </div>
      )}


 {/* kese kaam ka nha hia abhi */}
      {/* Admin Menu Dropdown */}
      {/* {showAdminMenu && (
        <div ref={adminMenuRef}>
          <AdminMenu
            onClose={() => setShowAdminMenu(false)}
            currentTheme={currentTheme}
          />
        </div>
      )} */}

      {/* Profile Menu Dropdown */}
      {/* {showProfileMenu && (
        <div ref={profileMenuRef}>
          <ProfileMenu
            onClose={() => setShowProfileMenu(false)}
            currentTheme={currentTheme}
          />
        </div>
      )} */}

      {/* Search Modal */}
      {showSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => setShowSearch(false)}
          onSearch={(query) => {
            navigate(`/search?q=${query}`);
            setShowSearch(false);
          }}
          currentTheme={currentTheme}
        />
      )}
    </>
  );
};

export default Navbar;