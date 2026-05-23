import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Verify token with backend
        const response = await authService.getCurrentUser();
        if (response.success) {
          setUser(response.user);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      }
    }
    setLoading(false);
  };

  // This function now properly handles 2FA response
  const loginWithGoogle = async (credentialResponse) => {
    try {
      const response = await authService.googleAuth(credentialResponse);
      
      // If 2FA is required, return the temp data
      if (response.requires2FA) {
        return {
          requires2FA: true,
          userId: response.userId,
          tempToken: response.tempToken
        };
      }
      
      // Normal login
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success(`Welcome ${response.user.name}!`);
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('tempUserId');
      sessionStorage.removeItem('tempToken');
      toast.success('Logged out successfully');
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};