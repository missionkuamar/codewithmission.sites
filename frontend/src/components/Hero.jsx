// components/Hero.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Download, Code, Award, Users } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Hero = () => {
  const { currentTheme, currentMood } = useTheme();

  const stats = [
    { icon: <Code size={24} />, value: '50+', label: 'Projects Completed' },
    { icon: <Award size={24} />, value: '15+', label: 'Awards Won' },
    { icon: <Users size={24} />, value: '100+', label: 'Happy Clients' },
  ];

  const socialLinks = [
    { icon: <FaGithub size={24} />, url: 'https://github.com', label: 'GitHub' },
    { icon: <FaLinkedin  size={24} />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaXTwitter size={24} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Mail size={24} />, url: 'mailto:contact@example.com', label: 'Email' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold animate-pulse">
                  Welcome to My Portfolio
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  John Doe
                </span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                Full-Stack Developer & UI/UX Designer
              </p>
              <p className="text-lg opacity-75 max-w-lg">
                Creating beautiful, responsive, and user-friendly web applications with modern technologies. 5+ years of experience in delivering high-quality solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                <Download size={20} />
                Download CV
              </button>
              <button className="px-8 py-3 rounded-full border-2 border-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300">
                Contact Me
              </button>
            </div>

            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-300 hover:text-purple-500"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-1 gap-6">
            <div className={`${currentTheme.card} ${currentMood} p-8 transform hover:scale-105 transition-all duration-500`}>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="flex justify-center text-purple-500">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-75">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${currentTheme.card} ${currentMood} p-8`}>
              <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Vue.js', 'Node.js', 'Python', 'TailwindCSS', 'TypeScript', 'GraphQL', 'Docker'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;