// components/about/EducationTab.jsx
import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const EducationTab = ({ education, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      {education.map((edu) => (
        <div key={edu.id} className="mb-6 last:mb-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
            <div>
              <h3 className="text-xl font-bold">{edu.degree}</h3>
              <p className="text-purple-500 font-semibold">{edu.institution}</p>
              <p className="text-sm opacity-75">{edu.location}</p>
            </div>
            <div className="flex items-center gap-1 text-sm opacity-75 mt-2 md:mt-0">
              <Clock size={14} /> {edu.period}
            </div>
          </div>
          <p className="opacity-75 mb-3">{edu.description}</p>
          <ul className="space-y-1">
            {edu.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2 text-sm opacity-75">
                <CheckCircle size={14} className="text-green-500 mt-0.5" />
                {achievement}
              </li>
            ))}
          </ul>
          {edu.id !== education.length && <hr className="my-4 border-gray-700" />}
        </div>
      ))}
    </div>
  );
};

export default EducationTab;