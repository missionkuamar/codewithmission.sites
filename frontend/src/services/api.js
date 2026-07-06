import axios from 'axios';
import toast from 'react-hot-toast';
const API_URL = import.meta.env.VITE_API_URL || 'https://codewithmission.site';

//console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 30000,
});

// Request interceptor to add token
// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
   // console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
   // console.log('Headers:', config.headers);
    
    if (config.data instanceof FormData) {
     // console.log('📎 FormData request - fields:');
      for (let [key, value] of config.data.entries()) {
       // console.log(`  ${key}:`, value instanceof File ? value.name : value);
      }
    } else {
      //  console.log('Request data:', config.data);
    }
    
    return config;
  },
  (error) => {
   // console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    // console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
   // console.error('❌ Response error:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
    //  console.error('Response data:', error.response.data);
    //  console.error('Response status:', error.response.status);
     // console.error('Response headers:', error.response.headers);
      
      // Handle specific status codes
      if (error.response.status === 401) {
        toast.error('Session expired. Please login again.');
        // Redirect to login if needed
        // window.location.href = '/login';
      } else if (error.response.status === 403) {
        toast.error('You do not have permission to perform this action');
      } else if (error.response.status === 404) {
        toast.error('Resource not found');
      } else if (error.response.status === 500) {
        toast.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      // The request was made but no response was received
     // console.error('No response received:', error.request);
      toast.error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request
     // console.error('Error setting up request:', error.message);
      toast.error('An unexpected error occurred');
    }
    
    return Promise.reject(error);
  }
);

export default api;