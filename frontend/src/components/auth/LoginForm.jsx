import { Mail, Lock, Eye, EyeOff, LogIn, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { googleLogin } from '../../redux/slices/authSlice';


const LoginForm = ({
  formData,
  onInputChange,
  onSubmit,
  loading,
  rememberMe,
  setRememberMe,
  onForgotPassword,
  currentTheme,
  onGoogleLogin // Add this prop for Google login
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSuccess = async (credentialResponse) => {
   // console.log('Google login success:', credentialResponse);
    setIsLoggingIn(true);

    try {
      // Make sure we have the credential
      if (!credentialResponse.credential) {
        toast.error('No credential received from Google');
        setIsLoggingIn(false);
        return;
      }

    //  console.log('Sending credential to backend...');
      const result = await dispatch(googleLogin(credentialResponse.credential)).unwrap();

      console.log('Backend response:', result);

      if (result.success) {
        if (result.message === 'Registration successful') {
          toast.success(`Welcome ${result.user.name}! Account created successfully.`);
        } else {
          toast.success(`Welcome back ${result.user.name}!`);
        }
        navigate('/');
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleError = () => {
    //console.error('Google login failed');
    toast.error('Google login failed. Please check your credentials and try again.');
  };

  if (isLoading || isLoggingIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{isLoggingIn ? 'Authenticating...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }




  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center space-y-5">
      <h2 className='text-3xl text- aligh-center font-extrabold'>Contune With Google</h2>
      {/* Email Field */}
      {/* <div>
        <label className="block text-sm font-semibold mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="admin@example.com"
            className={`w-full pl-10 pr-4 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            required
          />
        </div>
      </div> */}

      {/* Password Field */}
      {/* <div>
        <label className="block text-sm font-semibold mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={onInputChange}
            placeholder="Enter your password"
            className={`w-full pl-10 pr-12 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div> */}

      {/* Remember Me & Forgot Password */}
      {/* <div className="flex justify-between items-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm">Remember me</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-purple-500 hover:text-purple-400 transition-colors"
        >
          Forgot Password?
        </button>
      </div> */}

      {/* Login Button */}
      {/* <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <RefreshCw size={18} className="animate-spin" /> : <LogIn size={18} />}
        {loading ? 'Logging in...' : 'Login'}
      </button> */}

      {/* Divider */}
      {/* <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className={`px-2 ${currentTheme.secondary}`}>Contune With Google</span>
        </div>
      </div> */}

      {/* Google Login Button */}

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        theme="filled_blue"
        size="large"
        text="continue_with"
        shape="rectangular"
        width="280"
        useOneTap={false}
        auto_select={false}
        cancel_on_tap_outside={false}
        logo_alignment="center"
      />

      {/* Register Link */}
      {/* <div className="text-center">
        <p className="text-sm opacity-75">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-500 hover:text-purple-400 font-semibold">
            Sign up now
          </Link>
        </p>
      </div> */}
    </form>
  );
};

export default LoginForm;