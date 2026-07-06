// components/auth/RoleSelector.jsx
import React from 'react';

const RoleSelector = ({ role, onRoleChange }) => {
  const roles = [
    { value: 'user', label: 'Customer', description: 'Buy products & services' },
    { value: 'seller', label: 'Seller', description: 'Sell your products' }
  ];

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">I want to join as</label>
      <div className="grid grid-cols-2 gap-3">
        {roles.map((r) => (
          <label
            key={r.value}
            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
              role === r.value ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-purple-500'
            }`}
          >
            <input
              type="radio"
              name="role"
              value={r.value}
              checked={role === r.value}
              onChange={onRoleChange}
              className="w-4 h-4"
            />
            <div>
              <p className="font-semibold text-sm">{r.label}</p>
              <p className="text-xs opacity-60">{r.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;