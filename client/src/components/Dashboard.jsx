import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('User:', user);
    
    // Double check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            {user?.picture && (
              <img
                src={user.picture}
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">Welcome {user?.name}!</h1>
              <p className="text-blue-100 mt-1">Successfully logged in with {user?.provider === 'google' ? 'Google' : 'Email'}</p>
              <p className="text-blue-100 text-sm mt-1">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Rest of your dashboard content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Dashboard Content
          </h2>
          <p className="text-gray-600">
            You have successfully logged in! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;