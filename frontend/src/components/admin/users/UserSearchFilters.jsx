// components/admin/users/UserSearchFilters.jsx
import React from 'react';
import { Search, Filter, Download, RefreshCw } from 'lucide-react';

const UserSearchFilters = ({ 
  searchTerm, setSearchTerm, 
  roleFilter, setRoleFilter, 
  statusFilter, setStatusFilter, 
  currentTheme 
}) => {
  const roles = ['all', 'admin', 'moderator', 'seller', 'user'];
  const statuses = ['all', 'active', 'suspended', 'banned', 'pending'];

  return (
    <div className={`${currentTheme.card} p-4 mb-6`}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
        >
          {roles.map(role => (
            <option key={role} value={role}>
              {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserSearchFilters;