// pages/Register.jsx - Simplified Main Page
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import AuthHeader from '../components/auth/AuthHeader';
import RegisterForm from '../components/auth/RegisterForm';
import PasswordStrengthMeter from '../components/auth/PasswordStrengthMeter';
import RoleSelector from '../components/auth/RoleSelector';
import TermsCheckbox from '../components/auth/TermsCheckbox';
import SocialRegister from '../components/auth/SocialRegister';
import AuthNotification from '../components/auth/AuthNotification';
import { usePasswordStrength } from '../hooks/usePasswordStrength';
import { authApi } from '../services/authApi';

const Register = () => {
  const { currentTheme, currentMood } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    referralCode: ''
  });

  const { passwordStrength, checkPasswordStrength, getStrengthColor, getStrengthWidth } = usePasswordStrength();

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleRoleChange = (e) => {
    setFormData(prev => ({ ...prev, role: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    
    if (passwordStrength.score < 3) {
      showNotification('Please use a stronger password', 'error');
      return;
    }
    
    if (!agreeTerms) {
      showNotification('Please agree to the Terms & Conditions', 'error');
      return;
    }

    setLoading(true);
    
    try {
      await authApi.register(formData);
      showNotification('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setLoading(true);
    try {
      await authApi.socialRegister(provider);
      showNotification(`Registered with ${provider} successfully!`);
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
        <AuthHeader 
          title="Portfolio Pro" 
          subtitle="Create your account to get started"
        />

        <div className={`${currentTheme.card} ${currentMood} p-8`}>
          <RegisterForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleRegister}
            loading={loading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            currentTheme={currentTheme}
          />

          <PasswordStrengthMeter
            passwordStrength={passwordStrength}
            getStrengthColor={getStrengthColor}
            getStrengthWidth={getStrengthWidth}
          />

          <RoleSelector role={formData.role} onRoleChange={handleRoleChange} />
          
          <TermsCheckbox agreed={agreeTerms} onAgreeChange={setAgreeTerms} />
          
          <SocialRegister onSocialRegister={handleSocialRegister} currentTheme={currentTheme} />

          <div className="text-center mt-6">
            <p className="text-sm opacity-75">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-500 hover:text-purple-400 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthNotification notification={notification} />
    </div>
  );
};

export default Register;