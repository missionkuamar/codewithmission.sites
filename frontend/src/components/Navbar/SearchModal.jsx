// components/Navbar/SearchModal.jsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, MessageCircle, ShoppingBag, X } from 'lucide-react';

const SearchModal = ({ searchQuery, setSearchQuery, onClose, onSearch, currentTheme }) => {
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const searchSuggestions = [
    { type: 'project', title: 'AI Analytics Dashboard', link: '/projects/1', icon: <FileText size={14} /> },
    { type: 'project', title: 'E-Commerce Platform', link: '/projects/2', icon: <FileText size={14} /> },
    { type: 'blog', title: 'React 18 Advanced Patterns', link: '/blog/2', icon: <MessageCircle size={14} /> },
    { type: 'blog', title: 'Tailwind CSS Best Practices', link: '/blog/3', icon: <MessageCircle size={14} /> },
    { type: 'product', title: 'Premium Theme Package', link: '/products/1', icon: <ShoppingBag size={14} /> },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div ref={searchRef} className={`max-w-2xl mx-auto mt-20 p-4`}>
        <div className={`${currentTheme.card} rounded-2xl shadow-2xl overflow-hidden`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h3 className="font-semibold">Search</h3>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-700">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={20} />
              <input
                type="text"
                placeholder="Search for projects, blogs, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-12 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                autoFocus
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                Search
              </button>
            </div>
          </form>
          
          <div className="p-4">
            <p className="text-xs opacity-75 mb-3">Popular Searches</p>
            <div className="space-y-2">
              {searchSuggestions.map((suggestion, index) => (
                <Link
                  key={index}
                  to={suggestion.link}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="p-1 rounded bg-purple-500/20">
                    {suggestion.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{suggestion.title}</p>
                    <p className="text-xs opacity-50 capitalize">{suggestion.type}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;