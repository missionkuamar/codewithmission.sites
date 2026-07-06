// components/admin/settings/PaymentSettings.jsx
import React, { useState } from 'react';
import { Save, Loader, DollarSign, CreditCard, Truck, Percent, Ticket } from 'lucide-react';

const PaymentSettings = ({ settings, onSave, loading, currentTheme }) => {
  const [formData, setFormData] = useState(settings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('payment', formData);
  };

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Payment Settings</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Currency</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            >
              {currencies.map(curr => (
                <option key={curr.code} value={curr.code}>{curr.symbol} - {curr.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Tax Rate (%)</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="number"
              name="taxRate"
              value={formData.taxRate}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Shipping Cost ($)</label>
          <div className="relative">
            <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="number"
              name="shippingCost"
              value={formData.shippingCost}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Free Shipping Threshold ($)</label>
          <input
            type="number"
            name="freeShippingThreshold"
            value={formData.freeShippingThreshold}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
          />
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold mt-4">Payment Gateways</h3>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="stripeEnabled" checked={formData.stripeEnabled} onChange={handleChange} />
          <span>Enable Stripe</span>
        </label>
        {formData.stripeEnabled && (
          <div className="ml-6 space-y-3">
            <input
              type="text"
              placeholder="Stripe Public Key"
              name="stripePublicKey"
              value={formData.stripePublicKey}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
            />
            <input
              type="password"
              placeholder="Stripe Secret Key"
              name="stripeSecretKey"
              value={formData.stripeSecretKey}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
            />
          </div>
        )}
        <label className="flex items-center gap-3">
          <input type="checkbox" name="paypalEnabled" checked={formData.paypalEnabled} onChange={handleChange} />
          <span>Enable PayPal</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="enableCoupons" checked={formData.enableCoupons} onChange={handleChange} />
          <span>Enable Coupons & Discounts</span>
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default PaymentSettings;