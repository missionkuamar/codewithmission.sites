import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      clearError: () => set({ error: null }),

      login: async (email, password) => {
        // Validation
        if (!email || !password) {
          const errorMsg = 'Email and password are required';
          set({ error: errorMsg });
          toast.error(errorMsg);
          return { success: false, error: errorMsg };
        }
        
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post('/auth/login', { email, password });
          
          if (response.data && response.data.token) {
            const { token, ...user } = response.data;
            set({ 
              user, 
              token, 
              isLoading: false, 
              error: null 
            });
            
            // Set default auth header for future requests
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            toast.success(`Welcome back, ${user.username}!`);
            return { success: true, data: { user, token } };
          } else {
            throw new Error(response.data?.message || 'Login failed');
          }
        } catch (error) {
          const errorMessage = error.userMessage || error.response?.data?.message || 'Login failed';
          set({ 
            error: errorMessage, 
            isLoading: false,
            user: null,
            token: null
          });
          console.error('Login error:', error);
          toast.error(errorMessage);
          return { success: false, error: errorMessage };
        }
      },

      register: async (username, email, password) => {
        // Validation
        if (!username || !email || !password) {
          const errorMsg = 'All fields are required';
          set({ error: errorMsg });
          toast.error(errorMsg);
          return { success: false, error: errorMsg };
        }
        
        if (password.length < 6) {
          const errorMsg = 'Password must be at least 6 characters';
          set({ error: errorMsg });
          toast.error(errorMsg);
          return { success: false, error: errorMsg };
        }
        
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post('/auth/register', { 
            username, 
            email, 
            password 
          });
          
          if (response.data && response.data.token) {
            const { token, ...user } = response.data;
            set({ 
              user, 
              token, 
              isLoading: false, 
              error: null 
            });
            
            // Set default auth header for future requests
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            toast.success(`Welcome, ${user.username}! Account created successfully.`);
            return { success: true, data: { user, token } };
          } else {
            throw new Error(response.data?.message || 'Registration failed');
          }
        } catch (error) {
          const errorMessage = error.userMessage || error.response?.data?.message || 'Registration failed';
          set({ 
            error: errorMessage, 
            isLoading: false,
            user: null,
            token: null
          });
          console.error('Registration error:', error);
          toast.error(errorMessage);
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
        delete axiosInstance.defaults.headers.common['Authorization'];
        toast.success('Logged out successfully');
        return { success: true };
      },

      updateProfile: async (formData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.put('/users/profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          
          if (response.data) {
            set(state => ({ 
              user: { ...state.user, ...response.data },
              isLoading: false,
              error: null
            }));
            toast.success('Profile updated successfully!');
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to update profile');
          }
        } catch (error) {
          const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to update profile';
          set({ 
            error: errorMessage, 
            isLoading: false 
          });
          console.error('Update profile error:', error);
          toast.error(errorMessage);
          return { success: false, error: errorMessage };
        }
      },

      followUser: async (userId) => {
        try {
          const response = await axiosInstance.post(`/users/${userId}/follow`);
          
          if (response.data) {
            toast.success(response.data.message || 'Follow status updated');
            return { success: true };
          } else {
            throw new Error('Failed to update follow status');
          }
        } catch (error) {
          const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to update follow status';
          console.error('Follow user error:', error);
          toast.error(errorMessage);
          return { success: false, error: errorMessage };
        }
      },

      getUserProfile: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get(`/users/${userId}`);
          
          if (response.data) {
            set({ isLoading: false });
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to fetch user profile');
          }
        } catch (error) {
          const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to fetch user profile';
          set({ 
            error: errorMessage, 
            isLoading: false 
          });
          console.error('Get user profile error:', error);
          toast.error(errorMessage);
          return { success: false, error: errorMessage };
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export default useAuthStore;