// components/auth/SocialRegister.jsx
import React from 'react';
import { FaChrome, FaGithub } from 'react-icons/fa';


const SocialRegister = ({ onSocialRegister, currentTheme }) => {
  const socialButtons = [
    { provider: 'Google', icon: <FaChrome size={18} />, color: 'bg-red-600 hover:bg-red-700' },
    { provider: 'GitHub', icon: <FaGithub size={18} />, color: 'bg-gray-800 hover:bg-gray-700' }
  ];

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className={`px-2 ${currentTheme.card}`}>Or sign up with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {socialButtons.map((btn) => (
          <button
            key={btn.provider}
            onClick={() => onSocialRegister(btn.provider)}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg ${btn.color} transition-colors`}
          >
            {btn.icon} {btn.provider}
          </button>
        ))}
      </div>
    </>
  );
};

export default SocialRegister;