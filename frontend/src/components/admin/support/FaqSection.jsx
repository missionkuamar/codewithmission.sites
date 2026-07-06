// components/support/FaqSection.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, ThumbsUp, ThumbsDown } from 'lucide-react';
import { supportApi } from '../../../services/supportApi';

const FaqSection = ({ currentTheme, currentMood }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const faqs = supportApi.getFaqs();

  const categories = ['all', ...new Set(faqs.map(f => f.category))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className={`${currentTheme.secondary} rounded-lg overflow-hidden`}>
            <button
              onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
            >
              <span className="font-semibold text-left">{faq.question}</span>
              {openFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openFaq === faq.id && (
              <div className="px-6 py-4 border-t border-gray-700">
                <p className="opacity-75 mb-4">{faq.answer}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="opacity-60">Was this helpful?</span>
                  <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                    <ThumbsUp size={14} /> Yes ({faq.helpful})
                  </button>
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <ThumbsDown size={14} /> No
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle size={48} className="mx-auto opacity-30 mb-3" />
          <p className="opacity-75">No FAQs found matching your search</p>
        </div>
      )}
    </div>
  );
};

export default FaqSection;