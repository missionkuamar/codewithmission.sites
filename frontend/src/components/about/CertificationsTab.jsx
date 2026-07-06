// components/about/CertificationsTab.jsx
import React from 'react';
import { Award } from 'lucide-react';

const CertificationsTab = ({ certifications, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <div className="grid md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <div key={index} className="p-4 rounded-lg bg-gray-800/50 hover:scale-105 transition-all">
            <div className="flex items-start gap-3">
              <Award size={24} className="text-yellow-500" />
              <div>
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-sm opacity-75">{cert.issuer}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-purple-500">{cert.year}</span>
                  <span className="text-xs opacity-50">ID: {cert.credential}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsTab;