// components/Navbar/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        codewithmission.site
      </Link>
    </div>
  );
};

export default Logo;