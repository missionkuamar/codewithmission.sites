// components/profile/ProfileHeader.jsx
import React from 'react';
import { Camera, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';

const ProfileHeader = ({ user, currentTheme, currentMood }) => {
  return (
    <div className="relative mb-8">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
        <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />
        <button className="absolute bottom-4 right-4 p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors">
          <Camera size={18} />
        </button>
      </div>
      
      {/* Avatar and Info */}
      <div className="relative -mt-16 ml-6 md:ml-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-900 object-cover"
            />
            <button className="absolute bottom-2 right-2 p-1.5 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>
            <div className="flex flex-wrap gap-3 mt-2 text-sm opacity-75">
              <span className="flex items-center gap-1"><MapPin size={14} /> {user.location}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> Joined {user.joined}</span>
              {user.website && (
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-purple-500">
                  <LinkIcon size={14} /> {user.website}
                </a>
              )}
            </div>
            <p className="mt-2 text-sm opacity-75 max-w-md">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;