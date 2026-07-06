// components/payments/AddPaymentMethodModal.jsx
import React, { useState } from 'react';
import { X, CreditCard, Lock, Calendar, User } from 'lucide-react';

const AddPaymentMethodModal = ({ onClose, onSave, currentTheme }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveCard: true
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const last4 = formData.cardNumber.slice(-4);
      onSave({
        type: 'card',
        last4: last4,
        expiry: formData.expiry,
        name: formData.cardName,
        isDefault: false,
        brand: 'Visa'
      });
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className={`${currentTheme.card} rounded-2xl max-w-md w-full`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Add Payment Method</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Card Number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
                maxLength="19"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Cardholder Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
              <input
                type="text"
                name="cardName"
                placeholder="John Doe"
                value={formData.cardName}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Expiry Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">CVV</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
                  required
                  maxLength="4"
                />
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="saveCard" checked={formData.saveCard} onChange={handleChange} />
            <span className="text-sm">Save card for future payments</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Cancel            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              {loading ? <Loader size={18} className="animate-spin" /> : <Lock size={18} />}
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentMethodModal;