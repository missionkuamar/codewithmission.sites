// components/settings/ProfileSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, User, MapPin, Globe, Camera } from 'lucide-react';

const ProfileSettings = ({ user, onUpdate, currentTheme, showNotification }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || '',
    avatar: user.avatar || null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onUpdate(formData);
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">Profile Settings</h2>
      
      {/* Avatar Upload */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src={formData.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-purple-500 cursor-pointer">
            <Camera size={14} className="text-white" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
        <div>
          <p className="text-sm opacity-75">Upload a new avatar</p>
          <p className="text-xs opacity-50">JPG, GIF or PNG. Max size 2MB</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Display Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            placeholder="Tell us about yourself..."
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Website</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
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

export default ProfileSettings;