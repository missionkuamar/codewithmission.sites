// pages/Login.jsx - Simplified Main Page
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/auth/AuthHeader';
import LoginForm from '../components/auth/LoginForm';
import SocialLogin from '../components/auth/SocialLogin';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import TwoFactorForm from '../components/auth/TwoFactorForm';
import DemoCredentials from '../components/auth/DemoCredentials';
import AuthNotification from '../components/auth/AuthNotification';
import { authApi } from '../services/authApi';

const Login = () => {
  const { currentTheme, currentMood } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: '',
    resetEmail: ''
  });

  // Load saved email
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    try {
      await authApi.login(formData.email, formData.password);
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      
      showNotification('Login successful! Redirecting...');
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.resetEmail) {
      showNotification('Please enter your email address', 'error');
      return;
    }

    setLoading(true);
    try {
      await authApi.forgotPassword(formData.resetEmail);
      showNotification('Password reset link sent to your email!');
      setShowForgotPassword(false);
      setFormData(prev => ({ ...prev, resetEmail: '' }));
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    try {
      await authApi.socialLogin(provider);
      showNotification(`Login with ${provider} successful!`);
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.verify2FA(formData.twoFactorCode);
      showNotification('2FA verification successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full">
        <AuthHeader title="Portfolio Pro" />
        
        {!showForgotPassword && !showTwoFactor && (
          <div className={`${currentTheme.card} ${currentMood} p-8`}>
            <LoginForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleLogin}
              loading={loading}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              onForgotPassword={() => setShowForgotPassword(true)}
              currentTheme={currentTheme}
            />
            
            {/* <SocialLogin onSocialLogin={handleSocialLogin} currentTheme={currentTheme} /> */}
            {/* <DemoCredentials /> */}
          </div>
        )}

        {showForgotPassword && (
          <ForgotPasswordForm
            resetEmail={formData.resetEmail}
            onEmailChange={(value) => setFormData(prev => ({ ...prev, resetEmail: value }))}
            onSubmit={handleForgotPassword}
            onBack={() => setShowForgotPassword(false)}
            loading={loading}
            currentTheme={currentTheme}
          />
        )}

        {showTwoFactor && (
          <TwoFactorForm
            code={formData.twoFactorCode}
            onCodeChange={(value) => setFormData(prev => ({ ...prev, twoFactorCode: value }))}
            onSubmit={handleTwoFactor}
            onBack={() => setShowTwoFactor(false)}
            loading={loading}
            currentTheme={currentTheme}
          />
        )}
      </div>

      {/* <AuthNotification notification={notification} /> */}
    </div>
  );
};

export default Login;