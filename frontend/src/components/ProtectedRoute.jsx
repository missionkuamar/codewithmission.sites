// components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }

  return children;
};

// Usage in App.jsx or routes.js
// <Route path="/admin/*" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>} />
// <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />