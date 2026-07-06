// components/payments/BillingAddress.jsx
import React, { useState } from 'react';
import { Save, Loader, MapPin, Building, Phone, Globe } from 'lucide-react';

const BillingAddress = ({ address, onUpdate, currentTheme, currentMood }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(address);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onUpdate(formData);
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Billing Address</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
          >
            Edit Address
          </button>
        </div>

        <div className={`${currentTheme.secondary} p-6 rounded-lg`}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm opacity-60">Full Name</p>
              <p className="font-medium">{address.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-60">Company</p>
              <p className="font-medium">{address.company || 'Not specified'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-60">Street Address</p>
              <p className="font-medium">{address.street}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-60">Apartment/Suite</p>
              <p className="font-medium">{address.apartment || 'Not specified'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-60">City</p>
              <p className="font-medium">{address.city}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-60">State</p>
              <p className="font-medium">{address.state}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-60">ZIP Code</p>
              <p className="font-medium">{address.zipCode}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-60">Country</p>
              <p className="font-medium">{address.country}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-60">Phone Number</p>
              <p className="font-medium">{address.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-60">Tax ID/VAT</p>
              <p className="font-medium">{address.taxId || 'Not specified'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">Edit Billing Address</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Company</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Street Address *</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Apartment/Suite</label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">ZIP Code *</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Country *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
              required
            >
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
              <option>Germany</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Tax ID/VAT</label>
          <input
            type="text"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
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

export default BillingAddress;