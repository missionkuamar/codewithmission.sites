// components/projects/ProjectsEmptyState.jsx
import React from 'react';

const ProjectsEmptyState = ({ onClearFilters, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-12 text-center`}>
      <p className="text-xl opacity-75">No projects found matching your criteria</p>
      <button onClick={onClearFilters} className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform">
        Clear Filters
      </button>
    </div>
  );
};

export default ProjectsEmptyState;