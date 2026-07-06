// hooks/usePasswordStrength.js
import { useState, useCallback } from 'react';

export const usePasswordStrength = () => {
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
    minLength: false
  });

  const checkPasswordStrength = useCallback((password) => {
    const strength = {
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      minLength: password.length >= 8
    };
    
    let score = 0;
    let message = '';
    
    if (strength.minLength) score++;
    if (strength.hasUpper) score++;
    if (strength.hasLower) score++;
    if (strength.hasNumber) score++;
    if (strength.hasSpecial) score++;
    
    if (score <= 2) message = 'Weak';
    else if (score <= 4) message = 'Medium';
    else message = 'Strong';
    
    setPasswordStrength({ ...strength, score, message });
  }, []);

  const getStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthWidth = () => {
    return `${(passwordStrength.score / 5) * 100}%`;
  };

  return {
    passwordStrength,
    checkPasswordStrength,
    getStrengthColor,
    getStrengthWidth
  };
};