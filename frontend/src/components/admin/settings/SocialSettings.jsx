// components/admin/settings/SocialSettings.jsx
import React, { useState } from 'react';
import { Save, Loader,  MessageCircle } from 'lucide-react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const SocialSettings = ({ settings, onSave, loading, currentTheme }) => {
  const [formData, setFormData] = useState(settings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('social', formData);
  };

  const socialFields = [
    { name: 'facebook', icon: <FaFacebook size={18} />, label: 'Facebook', color: 'text-blue-600', placeholder: 'https://facebook.com/yourpage' },
    { name: 'twitter', icon: <FaTwitter size={18} />, label: 'Twitter', color: 'text-sky-500', placeholder: 'https://twitter.com/yourhandle' },
    { name: 'instagram', icon: <FaInstagram size={18} />, label: 'Instagram', color: 'text-pink-600', placeholder: 'https://instagram.com/yourhandle' },
    { name: 'youtube', icon: <FaYoutube size={18} />, label: 'YouTube', color: 'text-red-600', placeholder: 'https://youtube.com/c/yourchannel' },
    { name: 'github', icon: <FaGithub size={18} />, label: 'GitHub', color: 'text-gray-400', placeholder: 'https://github.com/yourusername' },
    { name: 'linkedin', icon: <FaLinkedin size={18} />, label: 'LinkedIn', color: 'text-blue-700', placeholder: 'https://linkedin.com/in/yourprofile' },
    { name: 'discord', icon: <MessageCircle size={18} />, label: 'Discord', color: 'text-indigo-500', placeholder: 'https://discord.gg/invite' },
    { name: 'threads', icon: <MessageCircle size={18} />, label: 'Threads', color: 'text-purple-500', placeholder: 'https://threads.net/@yourhandle' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Social Media Links</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {socialFields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <span className={field.color}>{field.icon}</span> {field.label}
            </label>
            <input
              type="url"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default SocialSettings;