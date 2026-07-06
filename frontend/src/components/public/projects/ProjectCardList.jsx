// components/projects/ProjectCardList.jsx
import React from 'react';
import { Eye, ExternalLink, Heart, Calendar, Star } from 'lucide-react';
import { IoLogoYoutube } from "react-icons/io";

const ProjectCardList = ({ project, onViewDetails, currentTheme, currentMood }) => {
  // Get the first image
  const getImageUrl = () => {
    if (project.thumbnail?.url) return project.thumbnail.url;
    if (project.images && project.images.length > 0) {
      return typeof project.images[0] === 'string' 
        ? project.images[0] 
        : project.images[0]?.url;
    }
    return 'https://via.placeholder.com/400x300?text=No+Image';
  };

  // Get tags
  const getTags = () => {
    if (!project.tags) return [];
    if (Array.isArray(project.tags)) return project.tags;
    if (typeof project.tags === 'string') {
      try {
        return JSON.parse(project.tags);
      } catch {
        return project.tags.split(',').map(t => t.trim());
      }
    }
    return [];
  };

  const tags = getTags();

  // Get social links
  const getSocialLink = (platform) => {
    if (!project.socialLinks) return null;
    const links = Array.isArray(project.socialLinks) ? project.socialLinks : [];
    return links.find(link => link.platform === platform)?.url;
  };

  return (
    <div 
      className={`${currentTheme.card} ${currentMood} p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-xl`} 
      onClick={onViewDetails}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <img 
          src={getImageUrl()} 
          alt={project.title} 
          className="w-full md:w-48 h-32 object-cover rounded-lg" 
        />
        <div className="flex-1">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs rounded-full bg-purple-500/20">
                    #{tag}
                  </span>
                ))}
                {tags.length > 4 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20">
                    +{tags.length - 4}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-purple-500">${project.price}</span>
              {project.mrp && project.mrp > project.price && (
                <div className="text-sm text-gray-400 line-through">${project.mrp}</div>
              )}
              {project.featured && (
                <div className="flex items-center gap-1 text-xs text-yellow-500">
                  <Star size={12} /> Featured
                </div>
              )}
            </div>
          </div>
          <p className="opacity-75 mb-3 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={onViewDetails} 
                className="px-4 py-1 rounded-lg bg-purple-500 text-white text-sm hover:scale-105 flex items-center gap-1"
              >
                <Eye size={14} /> Details
              </button>
              {getSocialLink('live-demo') && (
                <a 
                  href={getSocialLink('live-demo')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-1 rounded-lg bg-green-600 text-white text-sm hover:scale-105 flex items-center gap-1"
                >
                  <ExternalLink size={14} /> Live
                </a>
              )}
              {getSocialLink('youtube') && (
                <a 
                  href={getSocialLink('youtube')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-1 rounded-lg bg-red-600 text-white text-sm hover:scale-105 flex items-center gap-1"
                >
                  <IoLogoYoutube size={14} /> Video
                </a>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <Heart size={14} className="text-red-500" /> {project.likes || 0}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} /> {project.views || 0}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardList;