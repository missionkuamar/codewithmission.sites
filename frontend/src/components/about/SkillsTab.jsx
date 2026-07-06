// components/about/SkillsTab.jsx
import React from 'react';
import { Code, Star } from 'lucide-react';

const SkillsTab = ({ skills, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
      <div className="space-y-4 mb-8">
        {skills.technical.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="flex items-center gap-2">
                <Code size={20} /> {skill.name}
              </span>
              <span className="text-sm opacity-75">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <p className="text-xs opacity-60 mt-1">{skill.years} years experience</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">Soft Skills</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {skills.soft.map((skill, index) => (
          <div key={index} className="p-3 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-yellow-500" />
              <span className="font-semibold">{skill.name}</span>
            </div>
            <p className="text-sm opacity-75">{skill.description}</p>
            <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsTab;