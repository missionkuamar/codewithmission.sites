// components/about/AboutHeader.jsx
import React from 'react';

const AboutHeader = ({ personalInfo }) => {
  return (
    <div className="relative mb-12 rounded-2xl overflow-hidden">
      <div className="h-64 md:h-96 relative">
        <img
          src={personalInfo.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      <div className="relative -mt-20 ml-6 md:ml-10">
        <div className="flex flex-col md:flex-row items-end gap-4">
          <img
            src={personalInfo.avatar}
            alt={personalInfo.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover"
          />
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {personalInfo.name}
            </h1>
            <p className="text-xl text-white/90">{personalInfo.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;