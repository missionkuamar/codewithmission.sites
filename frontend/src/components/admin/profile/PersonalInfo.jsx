// components/profile/PersonalInfo.jsx
import React, { useState } from 'react';
import { Save, Loader, User, Mail, Phone, MapPin, Globe, Edit2 } from 'lucide-react';

const PersonalInfo = ({ user, onUpdate, currentTheme, showNotification }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    bio: user.bio,
    website: user.website
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onUpdate(formData);
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            <Edit2 size={18} /> Edit Profile
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm opacity-60">Full Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm opacity-60">Email Address</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm opacity-60">Phone Number</p>
            <p className="font-medium">{user.phone}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm opacity-60">Location</p>
            <p className="font-medium">{user.location}</p>
          </div>
          <div className="md:col-span-2 space-y-1">
            <p className="text-sm opacity-60">Bio</p>
            <p className="font-medium">{user.bio}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm opacity-60">Website</p>
            <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
              {user.website}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">Edit Personal Information</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name</label>
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
        <div>
          <label className="block text-sm font-semibold mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
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
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <div className="md:col-span-2">
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
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
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

export default PersonalInfo;