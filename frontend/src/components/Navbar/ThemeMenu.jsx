// components/Navbar/ThemeMenu.jsx - Fixed
import React from 'react';

const ThemeMenu = ({ theme, popularThemes, allThemes, onSelectTheme, onClose, currentTheme }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 p-2 z-50">
      <div className="p-2 border-b border-gray-700">
        <h3 className="font-semibold text-white">Quick Themes</h3>
        <p className="text-xs text-gray-400 mt-1">Choose your favorite theme</p>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {popularThemes.map((themeName) => (
          <button
            key={themeName}
            onClick={() => {
              onSelectTheme(themeName);
              onClose();
            }}
            className={`w-full text-left p-3 rounded-lg transition-all hover:scale-102 mb-1 ${
              theme === themeName 
                ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500' 
                : 'hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${allThemes[themeName]?.accent || 'bg-purple-500'}`} />
              <div>
                <p className="font-medium capitalize text-white">
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
      <div className="p-2 border-t border-gray-700 mt-1">
        <p className="text-xs text-center text-gray-400">30+ themes available in theme gallery</p>
      </div>
    </div>
  );
};

export default ThemeMenu;