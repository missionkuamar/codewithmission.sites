// components/about/PersonalInfoCard.jsx
import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

const PersonalInfoCard = ({ personalInfo, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <User size={20} /> Personal Info
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Mail size={18} className="opacity-60" />
          <span className="text-sm">{personalInfo.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={18} className="opacity-60" />
          <span className="text-sm">{personalInfo.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={18} className="opacity-60" />
          <span className="text-sm">{personalInfo.location}</span>
        </div>
        <div className="flex items-center gap-3">
          <Calendar size={18} className="opacity-60" />
          <span className="text-sm">{personalInfo.birthday}</span>
        </div>
        <div className="flex items-center gap-3">
          <Briefcase size={18} className="opacity-60" />
          <span className="text-sm">{personalInfo.experience}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;