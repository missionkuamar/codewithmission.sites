import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        const stateToken = parsedToken.state?.token;
        if (stateToken) {
          config.headers.Authorization = `Bearer ${stateToken}`;
        }
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
    
    // For FormData, remove Content-Type to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('[API Response Error]', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    
    let errorMessage = 'An unexpected error occurred';
    
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          errorMessage = data?.message || 'Bad request';
          break;
        case 401:
          errorMessage = 'Session expired. Please login again.';
          // Clear auth state
          localStorage.removeItem('auth-storage');
          window.location.href = '/login';
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action';
          break;
        case 404:
          errorMessage = data?.message || 'Resource not found';
          break;
        case 409:
          errorMessage = data?.message || 'Conflict with existing data';
          break;
        case 422:
          errorMessage = data?.message || 'Validation failed';
          if (data?.errors) {
            console.error('Validation errors:', data.errors);
          }
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = data?.message || `Error: ${status}`;
      }
      
      // Show toast for non-auth errors
      if (status !== 401) {
        toast.error(errorMessage);
      }
    } else if (error.request) {
      // Request was made but no response
      errorMessage = 'Network error. Please check your connection.';
      toast.error(errorMessage);
    } else {
      // Something else happened
      errorMessage = error.message || 'Request failed';
      toast.error(errorMessage);
    }
    
    // Enhance error object with custom properties
    error.userMessage = errorMessage;
    error.isHandled = true;
    
    return Promise.reject(error);
  }
);

export default axiosInstance;