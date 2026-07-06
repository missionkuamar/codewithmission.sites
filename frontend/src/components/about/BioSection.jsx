// components/about/BioSection.jsx
import React from 'react';

const BioSection = ({ personalInfo, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <h2 className="text-2xl font-bold mb-3">About Me</h2>
      <p className="text-lg opacity-90 mb-3">{personalInfo.bio}</p>
      <p className="opacity-75">{personalInfo.longBio}</p>
    </div>
  );
};

export default BioSection;