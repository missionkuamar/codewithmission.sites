// components/auth/TermsCheckbox.jsx
import React from 'react';

const TermsCheckbox = ({ agreed, onAgreeChange }) => {
  return (
    <label className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={agreed}
        onChange={(e) => onAgreeChange(e.target.checked)}
        className="w-4 h-4 mt-0.5 rounded"
      />
      <span className="text-sm">
        I agree to the{' '}
        <a href="/terms" className="text-purple-500 hover:text-purple-400">Terms of Service</a>
        {' '}and{' '}
        <a href="/privacy" className="text-purple-500 hover:text-purple-400">Privacy Policy</a>
      </span>
    </label>
  );
};

export default TermsCheckbox;