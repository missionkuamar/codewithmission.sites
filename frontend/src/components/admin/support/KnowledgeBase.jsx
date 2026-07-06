// components/support/KnowledgeBase.jsx
import React, { useState } from 'react';
import { Search, BookOpen, Rocket, User, CreditCard, Truck, RotateCcw, Wrench, ChevronRight } from 'lucide-react';
import { supportApi } from '../../../services/supportApi';

const KnowledgeBase = ({ currentTheme, currentMood }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = supportApi.getKnowledgeBase();

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'Rocket': return <Rocket size={24} />;
      case 'User': return <User size={24} />;
      case 'CreditCard': return <CreditCard size={24} />;
      case 'Truck': return <Truck size={24} />;
      case 'RotateCcw': return <RotateCcw size={24} />;
      case 'Wrench': return <Wrench size={24} />;
      default: return <BookOpen size={24} />;
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
        <input
          type="text"
          placeholder="Search knowledge base..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className={`${currentTheme.secondary} p-6 rounded-lg hover:scale-105 transition-all cursor-pointer group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-lg bg-purple-500/20 text-purple-500">
                {getIcon(category.icon)}
              </div>
              <span className="text-xs opacity-60">{category.articles} articles</span>
            </div>
            <h3 className="font-semibold mb-1">{category.title}</h3>
            <p className="text-sm opacity-75 mb-3">{category.description}</p>
            <div className="flex items-center text-purple-500 text-sm group-hover:gap-2 transition-all">
              Browse Articles <ChevronRight size={16} className="ml-1" />
            </div>
          </div>
        ))}
      </div>

      <div className={`${currentTheme.secondary} p-6 rounded-lg text-center`}>
        <h3 className="font-semibold mb-2">Can't find what you're looking for?</h3>
        <p className="text-sm opacity-75 mb-4">Our support team is here to help</p>
        <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default KnowledgeBase;