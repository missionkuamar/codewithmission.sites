// components/about/AboutTabs.jsx
import React from 'react';

const AboutTabs = ({ activeTab, setActiveTab, currentTheme }) => {
  const tabs = ['skills', 'experience', 'education', 'certifications', 'interests'];
  
  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 rounded-t-lg capitalize transition-all ${
            activeTab === tab
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : `${currentTheme.card} hover:bg-gray-700`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default AboutTabs;