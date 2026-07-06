// components/profile/AddressBook.jsx
import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Home, Briefcase, Check, X } from 'lucide-react';

const AddressBook = ({ addresses, setAddresses, currentTheme, showNotification }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Home',
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: '',
    isDefault: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(addresses.map(addr => addr.id === editingAddress.id ? { ...formData, id: addr.id } : addr));
      showNotification('Address updated successfully');
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
      showNotification('Address added successfully');
    }
    setShowForm(false);
    setEditingAddress(null);
    setFormData({ type: 'Home', name: '', street: '', city: '', state: '', zipCode: '', country: 'USA', phone: '', isDefault: false });
  };

  const deleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      showNotification('Address deleted successfully');
    }
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({ ...addr, isDefault: addr.id === id })));
    showNotification('Default address updated');
  };

  const editAddress = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Address Book</h2>
        <button
          onClick={() => {
            setEditingAddress(null);
            setFormData({ type: 'Home', name: '', street: '', city: '', state: '', zipCode: '', country: 'USA', phone: '', isDefault: false });
            setShowForm(true);
          }}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={18} /> Add New Address
        </button>
      </div>

      {showForm && (
        <div className={`${currentTheme.secondary} p-6 rounded-lg`}>
          <h3 className="font-semibold mb-4">{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Address Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
                >
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
                  required
                />
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} />
              <span>Set as default address</span>
            </label>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {editingAddress ? 'Update Address' : 'Add Address'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div key={address.id} className={`${currentTheme.secondary} p-4 rounded-lg relative`}>
            {address.isDefault && (
              <span className="absolute top-4 right-4 px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full">
                Default
              </span>
            )}
            <div className="flex items-start gap-3">
              {address.type === 'Home' ? <Home size={20} /> : <Briefcase size={20} />}
              <div className="flex-1">
                <h3 className="font-semibold">{address.type}</h3>
                <p className="text-sm">{address.name}</p>
                <p className="text-sm opacity-75">{address.street}</p>
                <p className="text-sm opacity-75">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-sm opacity-75">{address.country}</p>
                <p className="text-sm">{address.phone}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => editAddress(address)} className="p-1 hover:text-blue-500 transition-colors">
                <Edit size={16} />
              </button>
              <button onClick={() => deleteAddress(address.id)} className="p-1 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
              {!address.isDefault && (
                <button onClick={() => setDefaultAddress(address.id)} className="text-xs text-purple-500 hover:text-purple-400">
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;