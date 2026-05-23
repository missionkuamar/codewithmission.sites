import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { IoHome, IoCreate, IoPerson, IoLogOut, IoSettings } from 'react-icons/io5';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            SocialHub
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600">
              <IoHome size={20} />
              <span>Home</span>
            </Link>
            <Link to="/create" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600">
              <IoCreate size={20} />
              <span>Create</span>
            </Link>
            <Link to={`/profile/${user._id}`} className="flex items-center space-x-2 text-gray-700 hover:text-purple-600">
              <IoPerson size={20} />
              <span>Profile</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to={`/profile/${user._id}`}>
              <img
                src={user.profilePicture || 'https://via.placeholder.com/40'}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600"
            >
              <IoLogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;