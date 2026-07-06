// components/about/InterestsTab.jsx
import React from 'react';
import { Code, Book, Music, Camera, Coffee, Globe } from 'lucide-react';

const iconMap = {
  Code: Code,
  Book: Book,
  Music: Music,
  Camera: Camera,
  Coffee: Coffee,
  Globe: Globe
};

const InterestsTab = ({ interests, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <div className="grid md:grid-cols-2 gap-4">
        {interests.map((interest, index) => {
          const Icon = iconMap[interest.icon];
          return (
            <div key={index} className="p-4 rounded-lg bg-gray-800/50 text-center hover:scale-105 transition-all">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-3">
                <Icon size={24} />
              </div>
              <h3 className="font-semibold mb-1">{interest.name}</h3>
              <p className="text-xs opacity-75">{interest.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterestsTab;