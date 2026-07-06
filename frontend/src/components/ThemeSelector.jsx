// components/ThemeSelector.jsx - New Component for Theme Selection
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Palette, X, Check, Grid, 
  Moon, Sun, Sparkles, Eye 
} from 'lucide-react';

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('all');
  const { theme, setSpecificTheme, currentTheme, allThemes, themesList } = useTheme();

  const categories = {
    all: 'All Themes',
    dark: 'Dark Professional',
    light: 'Light Professional',
    vibrant: 'Vibrant & Creative',
    premium: 'Premium Luxury',
    tech: 'Modern Tech',
    pastel: 'Pastel Soft',
    bold: 'Bold & Dynamic',
  };

  const categorizeThemes = () => {
    const dark = ['midnightProfessional', 'carbonFiber', 'royalNavy', 'darkKnight', 'obsidian'];
    const light = ['cleanWhite', 'minimalBeige', 'corporateBlue', 'elegantGray', 'cream'];
    const vibrant = ['sunsetVibes', 'oceanBreeze', 'forestMystic', 'purpleHaze', 'auroraBorealis'];
    const premium = ['goldLuxury', 'roseGold', 'sapphire', 'emerald', 'ruby'];
    const tech = ['cyberpunk', 'futuristic', 'hackerGreen', 'matrix'];
    const pastel = ['pastelDream', 'mintFresh', 'lavender', 'peachBlush'];
    const bold = ['firestorm', 'electricBlue', 'magenta', 'neonNights'];

    return { dark, light, vibrant, premium, tech, pastel, bold };
  };

  const themeCategories = categorizeThemes();

  const getThemesByCategory = () => {
    if (category === 'all') return themesList;
    return themeCategories[category] || [];
  };

  const getThemePreview = (themeName) => {
    const themeData = allThemes[themeName];
    return themeData;
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl ${currentTheme.accent} text-white hover:scale-110 transition-all duration-300 group`}
      >
        <Palette size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      {/* Theme Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className={`${currentTheme.card} rounded-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden flex flex-col`}>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Theme Gallery
                </h2>
                <p className="text-sm opacity-75 mt-1">Choose from 30+ stunning themes</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Categories */}
            <div className="p-4 border-b border-gray-700 overflow-x-auto">
              <div className="flex gap-2 flex-wrap">
                {Object.entries(categories).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setCategory(key)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                      category === key
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getThemesByCategory().map((themeName) => {
                  const themeData = getThemePreview(themeName);
                  const isActive = theme === themeName;
                  
                  return (
                    <button
                      key={themeName}
                      onClick={() => {
                        setSpecificTheme(themeName);
                        setTimeout(() => setIsOpen(false), 500);
                      }}
                      className={`relative p-4 rounded-xl transition-all duration-300 ${
                        themeData.card
                      } ${themeData.border} border ${
                        isActive ? 'ring-2 ring-purple-500 scale-105' : 'hover:scale-102'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-2 right-2">
                          <Check size={20} className="text-purple-500" />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-full ${themeData.accent}`} />
                        <h3 className="font-semibold capitalize">
                          {themeName.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                      </div>
                      <div className="flex gap-2 text-xs opacity-75">
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> Preview
                        </span>
                      </div>
                      {/* Mini Preview */}
                      <div className="mt-3 grid grid-cols-3 gap-1">
                        <div className={`h-2 rounded ${themeData.accent}`} />
                        <div className={`h-2 rounded ${themeData.secondary}`} />
                        <div className={`h-2 rounded ${themeData.bg}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 text-center text-sm opacity-75">
              <Sparkles size={16} className="inline mr-2" />
              {themesList.length}+ Professional Themes Available
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSelector;