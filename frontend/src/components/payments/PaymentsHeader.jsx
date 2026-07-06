// components/payments/PaymentsHeader.jsx
import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentsHeader = ({ currentTheme }) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
        <CreditCard size={32} className="text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Payment{' '}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Methods
        </span>
      </h1>
      <p className="text-xl opacity-75 max-w-2xl mx-auto">
        Manage your payment methods, view transactions, and billing information
      </p>
    </div>
  );
};

export default PaymentsHeader;