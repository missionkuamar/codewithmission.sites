// context/ThemeContext.jsx - Fixed Version
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children }) => {

  
  // 30+ Professional and Attractive Themes
  const themes = {
    // Dark Professional Themes
    midnightProfessional: {
      bg: 'bg-slate-900',
      text: 'text-slate-100',
      card: 'bg-slate-800/50 backdrop-blur-sm',
      border: 'border-slate-700',
      accent: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      secondary: 'bg-slate-800',
      hover: 'hover:bg-slate-700',
    },
    carbonFiber: {
      bg: 'bg-neutral-900',
      text: 'text-neutral-100',
      card: 'bg-neutral-800/90',
      border: 'border-neutral-700',
      accent: 'bg-gradient-to-r from-neutral-500 to-neutral-700',
      secondary: 'bg-neutral-800',
      hover: 'hover:bg-neutral-700',
    },
    royalNavy: {
      bg: 'bg-blue-950',
      text: 'text-blue-100',
      card: 'bg-blue-900/80',
      border: 'border-blue-800',
      accent: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      secondary: 'bg-blue-900',
      hover: 'hover:bg-blue-800',
    },
    darkKnight: {
      bg: 'bg-gray-950',
      text: 'text-gray-100',
      card: 'bg-gray-900/90',
      border: 'border-gray-800',
      accent: 'bg-gradient-to-r from-gray-400 to-gray-600',
      secondary: 'bg-gray-900',
      hover: 'hover:bg-gray-800',
    },
    obsidian: {
      bg: 'bg-black',
      text: 'text-white',
      card: 'bg-zinc-900/95',
      border: 'border-zinc-800',
      accent: 'bg-gradient-to-r from-amber-500 to-orange-600',
      secondary: 'bg-zinc-900',
      hover: 'hover:bg-zinc-800',
    },

    // Light Professional Themes
    cleanWhite: {
      bg: 'bg-white',
      text: 'text-gray-900',
      card: 'bg-gray-50/95',
      border: 'border-gray-200',
      accent: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      secondary: 'bg-gray-50',
      hover: 'hover:bg-gray-100',
    },
    minimalBeige: {
      bg: 'bg-amber-50',
      text: 'text-amber-950',
      card: 'bg-white/90',
      border: 'border-amber-200',
      accent: 'bg-gradient-to-r from-amber-600 to-orange-600',
      secondary: 'bg-white',
      hover: 'hover:bg-amber-100',
    },
    corporateBlue: {
      bg: 'bg-sky-50',
      text: 'text-sky-950',
      card: 'bg-white/95',
      border: 'border-sky-200',
      accent: 'bg-gradient-to-r from-sky-600 to-blue-700',
      secondary: 'bg-white',
      hover: 'hover:bg-sky-100',
    },
    elegantGray: {
      bg: 'bg-gray-100',
      text: 'text-gray-900',
      card: 'bg-white',
      border: 'border-gray-300',
      accent: 'bg-gradient-to-r from-gray-700 to-gray-900',
      secondary: 'bg-gray-50',
      hover: 'hover:bg-gray-200',
    },
    cream: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-950',
      card: 'bg-white/90',
      border: 'border-yellow-200',
      accent: 'bg-gradient-to-r from-yellow-600 to-amber-700',
      secondary: 'bg-white',
      hover: 'hover:bg-yellow-100',
    },

    // Vibrant & Creative Themes
    sunsetVibes: {
      bg: 'bg-gradient-to-br from-orange-900 via-red-900 to-purple-900',
      text: 'text-orange-100',
      card: 'bg-orange-900/40 backdrop-blur-md',
      border: 'border-orange-700',
      accent: 'bg-gradient-to-r from-yellow-500 to-red-500',
      secondary: 'bg-orange-900/30',
      hover: 'hover:bg-orange-800/50',
    },
    oceanBreeze: {
      bg: 'bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900',
      text: 'text-cyan-100',
      card: 'bg-cyan-900/40 backdrop-blur-md',
      border: 'border-cyan-700',
      accent: 'bg-gradient-to-r from-cyan-400 to-blue-500',
      secondary: 'bg-cyan-900/30',
      hover: 'hover:bg-cyan-800/50',
    },
    forestMystic: {
      bg: 'bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900',
      text: 'text-emerald-100',
      card: 'bg-emerald-900/40 backdrop-blur-md',
      border: 'border-emerald-700',
      accent: 'bg-gradient-to-r from-emerald-400 to-teal-500',
      secondary: 'bg-emerald-900/30',
      hover: 'hover:bg-emerald-800/50',
    },
    purpleHaze: {
      bg: 'bg-gradient-to-br from-purple-950 via-fuchsia-950 to-pink-950',
      text: 'text-purple-100',
      card: 'bg-purple-900/40 backdrop-blur-md',
      border: 'border-purple-700',
      accent: 'bg-gradient-to-r from-purple-500 to-pink-500',
      secondary: 'bg-purple-900/30',
      hover: 'hover:bg-purple-800/50',
    },
    auroraBorealis: {
      bg: 'bg-gradient-to-br from-teal-950 via-cyan-950 to-blue-950',
      text: 'text-teal-100',
      card: 'bg-teal-900/40 backdrop-blur-md',
      border: 'border-teal-700',
      accent: 'bg-gradient-to-r from-green-400 to-cyan-500',
      secondary: 'bg-teal-900/30',
      hover: 'hover:bg-teal-800/50',
    },

    // Premium Themes
    goldLuxury: {
      bg: 'bg-gradient-to-br from-amber-950 via-yellow-950 to-amber-950',
      text: 'text-amber-100',
      card: 'bg-amber-900/30 backdrop-blur-md border-2 border-amber-500/30',
      border: 'border-amber-700',
      accent: 'bg-gradient-to-r from-yellow-500 to-amber-600',
      secondary: 'bg-amber-900/20',
      hover: 'hover:bg-amber-800/40',
    },
    roseGold: {
      bg: 'bg-gradient-to-br from-rose-950 via-pink-950 to-rose-950',
      text: 'text-rose-100',
      card: 'bg-rose-900/30 backdrop-blur-md',
      border: 'border-rose-700',
      accent: 'bg-gradient-to-r from-rose-400 to-pink-500',
      secondary: 'bg-rose-900/20',
      hover: 'hover:bg-rose-800/40',
    },
    sapphire: {
      bg: 'bg-gradient-to-br from-indigo-950 via-blue-950 to-indigo-950',
      text: 'text-indigo-100',
      card: 'bg-indigo-900/30 backdrop-blur-md',
      border: 'border-indigo-700',
      accent: 'bg-gradient-to-r from-indigo-500 to-blue-600',
      secondary: 'bg-indigo-900/20',
      hover: 'hover:bg-indigo-800/40',
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-950 via-green-950 to-emerald-950',
      text: 'text-emerald-100',
      card: 'bg-emerald-900/30 backdrop-blur-md',
      border: 'border-emerald-700',
      accent: 'bg-gradient-to-r from-emerald-500 to-green-600',
      secondary: 'bg-emerald-900/20',
      hover: 'hover:bg-emerald-800/40',
    },
    ruby: {
      bg: 'bg-gradient-to-br from-red-950 via-rose-950 to-red-950',
      text: 'text-red-100',
      card: 'bg-red-900/30 backdrop-blur-md',
      border: 'border-red-700',
      accent: 'bg-gradient-to-r from-red-500 to-rose-600',
      secondary: 'bg-red-900/20',
      hover: 'hover:bg-red-800/40',
    },

    // Modern Tech Themes
    cyberpunk: {
      bg: 'bg-gradient-to-br from-cyan-950 via-purple-950 to-pink-950',
      text: 'text-cyan-100',
      card: 'bg-black/50 backdrop-blur-md border-2 border-cyan-500/50',
      border: 'border-cyan-700',
      accent: 'bg-gradient-to-r from-cyan-400 to-pink-500',
      secondary: 'bg-black/40',
      hover: 'hover:bg-black/60',
    },
    futuristic: {
      bg: 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950',
      text: 'text-slate-100',
      card: 'bg-slate-900/50 backdrop-blur-md border border-blue-500/30',
      border: 'border-slate-700',
      accent: 'bg-gradient-to-r from-blue-500 to-purple-600',
      secondary: 'bg-slate-900/40',
      hover: 'hover:bg-slate-800/50',
    },
    hackerGreen: {
      bg: 'bg-gradient-to-br from-lime-950 via-green-950 to-emerald-950',
      text: 'text-lime-100',
      card: 'bg-black/50 backdrop-blur-md border border-lime-500/50',
      border: 'border-lime-700',
      accent: 'bg-gradient-to-r from-lime-400 to-green-500',
      secondary: 'bg-black/40',
      hover: 'hover:bg-black/60',
    },
    matrix: {
      bg: 'bg-black',
      text: 'text-green-500',
      card: 'bg-green-950/20 backdrop-blur-md border border-green-500/30',
      border: 'border-green-800',
      accent: 'bg-gradient-to-r from-green-400 to-emerald-500',
      secondary: 'bg-green-950/10',
      hover: 'hover:bg-green-950/30',
    },

    // Pastel & Soft Themes
    pastelDream: {
      bg: 'bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100',
      text: 'text-purple-900',
      card: 'bg-white/70 backdrop-blur-md',
      border: 'border-purple-200',
      accent: 'bg-gradient-to-r from-purple-400 to-pink-400',
      secondary: 'bg-white/50',
      hover: 'hover:bg-white/80',
    },
    mintFresh: {
      bg: 'bg-gradient-to-br from-teal-100 via-emerald-100 to-green-100',
      text: 'text-teal-900',
      card: 'bg-white/70 backdrop-blur-md',
      border: 'border-teal-200',
      accent: 'bg-gradient-to-r from-teal-400 to-emerald-400',
      secondary: 'bg-white/50',
      hover: 'hover:bg-white/80',
    },
    lavender: {
      bg: 'bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100',
      text: 'text-indigo-900',
      card: 'bg-white/70 backdrop-blur-md',
      border: 'border-indigo-200',
      accent: 'bg-gradient-to-r from-indigo-400 to-purple-400',
      secondary: 'bg-white/50',
      hover: 'hover:bg-white/80',
    },
    peachBlush: {
      bg: 'bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100',
      text: 'text-orange-900',
      card: 'bg-white/70 backdrop-blur-md',
      border: 'border-orange-200',
      accent: 'bg-gradient-to-r from-orange-400 to-amber-400',
      secondary: 'bg-white/50',
      hover: 'hover:bg-white/80',
    },

    // Bold & Dynamic Themes
    firestorm: {
      bg: 'bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900',
      text: 'text-orange-100',
      card: 'bg-orange-900/40 backdrop-blur-md',
      border: 'border-orange-700',
      accent: 'bg-gradient-to-r from-red-500 to-orange-500',
      secondary: 'bg-orange-900/30',
      hover: 'hover:bg-orange-800/50',
    },
    electricBlue: {
      bg: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-sky-900',
      text: 'text-blue-100',
      card: 'bg-blue-900/40 backdrop-blur-md',
      border: 'border-blue-700',
      accent: 'bg-gradient-to-r from-blue-400 to-cyan-500',
      secondary: 'bg-blue-900/30',
      hover: 'hover:bg-blue-800/50',
    },
    magenta: {
      bg: 'bg-gradient-to-br from-fuchsia-900 via-pink-900 to-rose-900',
      text: 'text-fuchsia-100',
      card: 'bg-fuchsia-900/40 backdrop-blur-md',
      border: 'border-fuchsia-700',
      accent: 'bg-gradient-to-r from-fuchsia-500 to-pink-500',
      secondary: 'bg-fuchsia-900/30',
      hover: 'hover:bg-fuchsia-800/50',
    },
    neonNights: {
      bg: 'bg-gradient-to-br from-black via-purple-950 to-cyan-950',
      text: 'text-cyan-100',
      card: 'bg-black/60 backdrop-blur-md border border-cyan-500/50',
      border: 'border-cyan-800',
      accent: 'bg-gradient-to-r from-cyan-400 to-purple-500',
      secondary: 'bg-black/40',
      hover: 'hover:bg-black/70',
    },
  };

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Validate if saved theme exists in themes object
    if (savedTheme && themes[savedTheme]) {
      return savedTheme;
    }
    return 'midnightProfessional'; // Default theme
  });

  const [mood, setMood] = useState(() => {
    const savedMood = localStorage.getItem('mood');
    return savedMood || 'professional';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('mood', mood);
    document.documentElement.className = theme;
  }, [theme, mood]);

  const moodStyles = {
    professional: 'shadow-lg rounded-xl',
    colorful: 'shadow-xl rounded-2xl bg-gradient-to-br',
    neon: 'shadow-neon rounded-lg border-2 border-cyan-400',
    pastel: 'shadow-soft rounded-3xl backdrop-blur',
    glassmorphism: 'backdrop-blur-xl bg-opacity-20 rounded-2xl',
    minimal: 'shadow-sm rounded-md',
    premium: 'shadow-2xl rounded-2xl border',
  };

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  const changeMood = (newMood) => {
    setMood(newMood);
  };

  const setSpecificTheme = (themeName) => {
    if (themes[themeName]) {
      setTheme(themeName);
    }
  };

  // Get current theme with fallback
  const currentTheme = themes[theme] || themes.midnightProfessional;
  const currentMood = moodStyles[mood] || moodStyles.professional;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        mood,
        changeMood,
        toggleTheme,
        setSpecificTheme,
        currentTheme,
        currentMood,
        themesList: Object.keys(themes),
        allThemes: themes,
         
 
      }}
    >
      <div className={`${currentTheme.bg} ${currentTheme.text} transition-all duration-500 min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;