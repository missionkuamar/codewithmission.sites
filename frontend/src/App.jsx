// Update App.jsx - Add Notifications route
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import Navbar from './components/Navbar/index';
// import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatPeopleSay from './components/WhatPeopleSay';
import LatestProjects from './components/LatestProjects';
import Footer from './components/Footer';
import ThemeSelector from './components/ThemeSelector';
import ThemeProvider from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminDashboard';
import CartPage from './pages/CartPage';
import AdminUsers from './pages/AdminUsers';
import AdminProjects from './pages/AdminProjects';
import AdminBlog from './pages/AdminBlog';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminSettings from './pages/AdminSettings';
import AdminSecurity from './pages/AdminSecurity';
import Login from './pages/Login';
import Register from './pages/Register';
import Support from './pages/Support';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import ProductDetail from './pages/ProductDetail';
import Notifications from './pages/Notifications';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen transition-all duration-500">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <WhatPeopleSay />
                    <LatestProjects />
                  </>
                } />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProductDetail />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/security" element={<AdminSecurity />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/support" element={<Support />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />
              </Routes>
            </main>
            <Footer />
            <ThemeSelector />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;