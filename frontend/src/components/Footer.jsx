// components/Footer.jsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  
   Send, Mail, Phone, MapPin, 
  MessageCircle, ThumbsUp, Link as LinkIcon 
} from 'lucide-react';
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

import { FaSquareInstagram } from "react-icons/fa6";
const Footer = () => {
  const { currentTheme, currentMood } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const socialLinks = [
    { icon: <IoLogoYoutube size={22} />, url: 'https://youtube.com', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: <FaSquareInstagram size={22} />, url: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: <LinkIcon size={22} />, url: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: <Send size={22} />, url: 'https://discord.com', label: 'Discord', color: 'hover:text-indigo-500' },
    { icon: <FaFacebook size={22} />, url: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: <FaXTwitter size={22} />, url: 'https://threads.net', label: 'Threads', color: 'hover:text-purple-500' },
    { icon: <FaTwitter size={22} />, url: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: <FaLinkedin size={22} />, url: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-600' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'About', href: '#about' },
  ];

  const supportLinks = [
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Help Center', href: '#help' },
    { name: 'Support', href: '#support' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Refund Policy', href: '#refund' },
    { name: 'Return Policy', href: '#return' },
  ];

  const mission = "Empowering businesses through innovative digital solutions. Creating beautiful, functional, and scalable web applications that make a difference.";

  return (
    <footer className={`${currentTheme.card} mt-20 border-t ${currentTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Mission Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              My Mission
            </h3>
            <p className="opacity-80 leading-relaxed">{mission}</p>
            <div className="flex space-x-4 pt-4">
              {socialLinks.slice(0, 4).map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} transition-all duration-300 hover:scale-110`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="opacity-80 hover:opacity-100 hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <ChevronRight size={14} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="opacity-80 hover:opacity-100 hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <ChevronRight size={14} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Stay Connected</h3>
            <p className="opacity-80">Subscribe to get latest updates</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-opacity-20 bg-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-lg hover:scale-105 transition-transform"
                >
                  <Send size={20} />
                </button>
              </div>
              {subscribed && (
                <p className="text-green-500 text-sm animate-pulse">
                  Subscribed successfully! 🎉
                </p>
              )}
            </form>
            <div className="flex flex-col space-y-2 pt-2">
              <div className="flex items-center gap-2 opacity-80">
                <Mail size={16} />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Bar */}
        <div className="border-t border-b ${currentTheme.border} py-6 mb-6">
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} transition-all duration-300 hover:scale-125 flex flex-col items-center gap-1 group`}
              >
                {social.icon}
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          {legalLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="opacity-70 hover:opacity-100 hover:text-purple-500 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center opacity-60 text-sm">
          <p>&copy; 2024 John Doe. All rights reserved. | Crafted with ❤️ using React & TailwindCSS</p>
        </div>
      </div>
    </footer>
  );
};

// Discord icon component
const Discord = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.356 0c-.164-.386-.398-.875-.608-1.25a.077.077 0 0 0-.079-.037 19.75 19.75 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 8.046-.32 13.58.099 19.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.372.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-10.673-3.428-14.66a.066.066 0 0 0-.032-.026zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.42 2.157-2.42 1.21 0 2.176 1.096 2.157 2.42 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.42 2.157-2.42 1.21 0 2.176 1.096 2.157 2.42 0 1.334-.946 2.419-2.157 2.419z"/>
  </svg>
);

const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default Footer;