// components/about/ExperienceTab.jsx
import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const ExperienceTab = ({ experiences, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      {experiences.map((exp) => (
        <div key={exp.id} className="mb-6 last:mb-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
            <div>
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <p className="text-purple-500 font-semibold">{exp.company}</p>
              <p className="text-sm opacity-75">{exp.location}</p>
            </div>
            <div className="flex items-center gap-1 text-sm opacity-75 mt-2 md:mt-0">
              <Clock size={14} />
              {exp.period}
            </div>
          </div>
          <p className="opacity-75 mb-3">{exp.description}</p>
          <div className="mb-3">
            <p className="font-semibold text-sm mb-2">Key Achievements:</p>
            <ul className="space-y-1">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2 text-sm opacity-75">
                  <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech, i) => (
              <span key={i} className="px-2 py-1 text-xs rounded-full bg-purple-500/20">
                {tech}
              </span>
            ))}
          </div>
          {exp.id !== experiences.length && <hr className="my-4 border-gray-700" />}
        </div>
      ))}
    </div>
  );
};

export default ExperienceTab;