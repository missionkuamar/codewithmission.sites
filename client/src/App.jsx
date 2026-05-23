import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorBoundary from './components/ErrorBoundary';
import useAuthStore from './store/authStore';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/create" element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            } />
            <Route path="/profile/:id" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/post/:id" element={
              <PrivateRoute>
                <PostDetail />
              </PrivateRoute>
            } />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;