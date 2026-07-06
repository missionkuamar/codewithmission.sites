// components/auth/PasswordStrengthMeter.jsx
import React from 'react';

const PasswordStrengthMeter = ({ passwordStrength, getStrengthColor, getStrengthWidth }) => {
  if (!passwordStrength || passwordStrength.score === 0) return null;

  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs mb-1">
        <span>Password Strength:</span>
        <span className={
          passwordStrength.score <= 2 ? 'text-red-500' : 
          passwordStrength.score <= 4 ? 'text-yellow-500' : 'text-green-500'
        }>
          {passwordStrength.message}
        </span>
      </div>
      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full ${getStrengthColor()} transition-all duration-300`} style={{ width: getStrengthWidth() }} />
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs mt-2">
        <span className={passwordStrength.minLength ? 'text-green-500' : 'text-red-500'}>
          ✓ Min 8 characters
        </span>
        <span className={passwordStrength.hasUpper ? 'text-green-500' : 'text-red-500'}>
          ✓ Uppercase letter
        </span>
        <span className={passwordStrength.hasLower ? 'text-green-500' : 'text-red-500'}>
          ✓ Lowercase letter
        </span>
        <span className={passwordStrength.hasNumber ? 'text-green-500' : 'text-red-500'}>
          ✓ Number
        </span>
        <span className={passwordStrength.hasSpecial ? 'text-green-500' : 'text-red-500'}>
          ✓ Special character
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;