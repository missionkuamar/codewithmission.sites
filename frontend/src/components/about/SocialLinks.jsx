// components/about/SocialLinks.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const SocialLinks = ({ currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <h3 className="text-lg font-semibold mb-3">Connect with me</h3>
      <div className="flex gap-3">
        <a href="#" className="p-2 rounded-lg bg-gray-700 hover:bg-purple-600 transition-all hover:scale-110">
          <FaGithub size={20} />
        </a>
        <a href="#" className="p-2 rounded-lg bg-gray-700 hover:bg-blue-600 transition-all hover:scale-110">
          <FaLinkedin size={20} />
        </a>
        <a href="#" className="p-2 rounded-lg bg-gray-700 hover:bg-sky-500 transition-all hover:scale-110">
          <FaTwitter size={20} />
        </a>
        <a href="#" className="p-2 rounded-lg bg-gray-700 hover:bg-pink-600 transition-all hover:scale-110">
          <FaInstagram size={20} />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;