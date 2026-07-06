// components/projects/ProjectsHeader.jsx
import React from 'react';

const ProjectsHeader = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        My{' '}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Projects
        </span>
      </h1>
      <p className="text-xl opacity-75 max-w-2xl mx-auto">
        Explore my collection of projects, source code, and live demos
      </p>
    </div>
  );
};

export default ProjectsHeader;