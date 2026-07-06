// components/auth/RegisterForm.jsx
import React from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, RefreshCw, UserPlus } from 'lucide-react';

const RegisterForm = ({
  formData,
  onInputChange,
  onSubmit,
  loading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  currentTheme
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold mb-2">Full Name *</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            placeholder="John Doe"
            className={`w-full pl-10 pr-4 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold mb-2">Email Address *</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="john@example.com"
            className={`w-full pl-10 pr-4 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            required
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-semibold mb-2">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            placeholder="+1 (555) 123-4567"
            className={`w-full pl-10 pr-4 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold mb-2">Password *</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={onInputChange}
            placeholder="Create a strong password"
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
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-semibold mb-2">Confirm Password *</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onInputChange}
            placeholder="Confirm your password"
            className={`w-full pl-10 pr-12 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
        )}
      </div>

      {/* Referral Code */}
      <div>
        <label className="block text-sm font-semibold mb-2">Referral Code (Optional)</label>
        <div className="relative">
          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={onInputChange}
            placeholder="Enter referral code"
            className={`w-full pl-10 pr-4 py-3 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
          />
        </div>
      </div>

      {/* Register Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <RefreshCw size={18} className="animate-spin" /> : <UserPlus size={18} />}
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
};

export default RegisterForm;    