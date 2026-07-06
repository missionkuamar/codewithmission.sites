// pages/AboutPage.jsx - Simplified Main Page
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Download, ChevronRight } from 'lucide-react';
import AboutHeader from '../components/about/AboutHeader';
import PersonalInfoCard from '../components/about/PersonalInfoCard';
import AboutStats from '../components/about/AboutStats';
import SocialLinks from '../components/about/SocialLinks';
import BioSection from '../components/about/BioSection';
import AboutTabs from '../components/about/AboutTabs';
import SkillsTab from '../components/about/SkillsTab';
import ExperienceTab from '../components/about/ExperienceTab';
import EducationTab from '../components/about/EducationTab';
import CertificationsTab from '../components/about/CertificationsTab';
import InterestsTab from '../components/about/InterestsTab';
import { personalInfo, skills, experiences, education, certifications, interests, stats } from '../data/aboutData';

const AboutPage = () => {
  const { currentTheme, currentMood } = useTheme();
  const [activeTab, setActiveTab] = useState('skills');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'skills':
        return <SkillsTab skills={skills} currentTheme={currentTheme} currentMood={currentMood} />;
      case 'experience':
        return <ExperienceTab experiences={experiences} currentTheme={currentTheme} currentMood={currentMood} />;
      case 'education':
        return <EducationTab education={education} currentTheme={currentTheme} currentMood={currentMood} />;
      case 'certifications':
        return <CertificationsTab certifications={certifications} currentTheme={currentTheme} currentMood={currentMood} />;
      case 'interests':
        return <InterestsTab interests={interests} currentTheme={currentTheme} currentMood={currentMood} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutHeader personalInfo={personalInfo} />
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <PersonalInfoCard personalInfo={personalInfo} currentTheme={currentTheme} currentMood={currentMood} />
            <AboutStats stats={stats} currentTheme={currentTheme} currentMood={currentMood} />
            
            <button className={`w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}>
              <Download size={20} />
              Download Resume
            </button>
            
            <SocialLinks currentTheme={currentTheme} currentMood={currentMood} />
          </div>
          
          {/* Right Content */}
          <div className="lg:col-span-2 space-y-6">
            <BioSection personalInfo={personalInfo} currentTheme={currentTheme} currentMood={currentMood} />
            
            <AboutTabs activeTab={activeTab} setActiveTab={setActiveTab} currentTheme={currentTheme} />
            
            {renderTabContent()}
            
            {/* Call to Action */}
            <div className={`${currentTheme.card} ${currentMood} p-6 text-center bg-gradient-to-r from-purple-600 to-pink-600`}>
              <h3 className="text-2xl font-bold mb-2">Let's Work Together!</h3>
              <p className="mb-4">Have a project in mind? I'd love to help bring your ideas to life.</p>
              <button className="px-6 py-2 bg-white text-purple-900 rounded-lg font-semibold hover:scale-105 transition-all flex items-center gap-2 mx-auto">
                Contact Me <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;