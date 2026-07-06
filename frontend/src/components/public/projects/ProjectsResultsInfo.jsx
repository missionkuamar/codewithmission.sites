// components/projects/ProjectsResultsInfo.jsx
import React from 'react';

const ProjectsResultsInfo = ({ startIndex, endIndex, totalItems }) => {
  if (totalItems === 0) return null;
  
  return (
    <div className="mb-6 flex justify-between items-center">
      <p className="opacity-75">
        Showing <span className="font-bold text-purple-500">{startIndex}</span> -{' '}
        <span className="font-bold text-purple-500">{endIndex}</span> of{' '}
        <span className="font-bold">{totalItems}</span> projects
      </p>
    </div>
  );
};

export default ProjectsResultsInfo;