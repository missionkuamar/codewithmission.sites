// components/about/AboutStats.jsx
import React from 'react';
import { Briefcase, Code, Users, Award, Coffee, Heart } from 'lucide-react';

const iconMap = {
  Briefcase: Briefcase,
  Code: Code,
  Users: Users,
  Award: Award,
  Coffee: Coffee,
  Heart: Heart
};

const AboutStats = ({ stats, currentTheme, currentMood }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.slice(0, 4).map((stat, index) => {
        const Icon = iconMap[stat.icon];
        return (
          <div key={index} className={`${currentTheme.card} ${currentMood} p-4 text-center transform hover:scale-105 transition-all duration-300`}>
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-2`}>
              <Icon size={24} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-75">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AboutStats;