// components/auth/AuthHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-block">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Portfolio Pro
        </h1>
      </Link>
      <p className="text-sm opacity-75 mt-2">{subtitle || 'Welcome back! Please login to your account'}</p>
    </div>
  );
};

export default AuthHeader;