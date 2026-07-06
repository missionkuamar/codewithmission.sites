// components/Navbar/NavLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, FileText, MessageCircle, User } from 'lucide-react';

const NavLinks = ({ scrollToSection, location, currentTheme }) => {
  const navLinks = [
    { name: 'Home', href: '/', path: '/', icon: <Globe size={16} /> },
    { name: 'Projects', href: '/projects', path: '/projects', icon: <FileText size={16} /> },
    { name: 'Blog', href: '/blog', path: '/blog', icon: <MessageCircle size={16} /> },
    { name: 'About', href: '/about', path: '/about', icon: <User size={16} /> },
     { name: 'GetStarted', href: '/login', path: '/about', icon: <User size={16} /> },
  ];

  return (
    <div className="hidden md:flex items-center space-x-6">
      {navLinks.map((link) => (
        link.href.startsWith('#') ? (
          <button
            key={link.name}
            onClick={() => scrollToSection(link.href)}
            className="hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300 flex items-center gap-1"
          >
            {link.icon}
            {link.name}
          </button>
        ) : (
          <Link
            key={link.name}
            to={link.href}
            className={`hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300 flex items-center gap-1 ${
              location.pathname === link.href ? 'bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent' : ''
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        )
      ))}
    </div>
  );
};

export default NavLinks;