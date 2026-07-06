// components/admin/users/UsersTable.jsx
import React from 'react';
import { Edit, Trash2, Eye, Mail, Phone, Calendar, CheckCircle, XCircle, Loader, Users } from 'lucide-react';

const UsersTable = ({ users, loading, currentTheme, onUpdateStatus, onUpdateRole, onVerify, onDelete, onEdit }) => {
  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-red-500/20 text-red-500',
      moderator: 'bg-purple-500/20 text-purple-500',
      seller: 'bg-blue-500/20 text-blue-500',
      user: 'bg-gray-500/20 text-gray-500'
    };
    return styles[role] || styles.user;
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-500/20 text-green-500',
      suspended: 'bg-yellow-500/20 text-yellow-500',
      banned: 'bg-red-500/20 text-red-500',
      pending: 'bg-orange-500/20 text-orange-500'
    };
    return styles[status] || styles.pending;
  };

  if (loading) {
    return (
      <div className={`${currentTheme.card} p-12 text-center`}>
        <Loader size={40} className="animate-spin mx-auto" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={`${currentTheme.card} p-12 text-center`}>
        <Users size={48} className="mx-auto opacity-30 mb-3" />
        <p className="opacity-75">No users found</p>
      </div>
    );
  }

  return (
    <div className={`${currentTheme.card} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr className="text-left">
              <th className="p-4">User</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Verified</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Total Spent</th>
              <th className="p-4">Actions</th>
             </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs opacity-75">ID: #{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm"><Mail size={12} /> {user.email}</div>
                    <div className="flex items-center gap-1 text-sm"><Phone size={12} /> {user.phone}</div>
                    <div className="flex items-center gap-1 text-xs opacity-60"><Calendar size={10} /> Joined: {user.joinDate}</div>
                  </div>
                </td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => onUpdateRole(user.id, e.target.value)}
                    className={`px-2 py-1 rounded-lg text-xs ${getRoleBadge(user.role)} border-none focus:outline-none cursor-pointer`}
                  >
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="seller">Seller</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td className="p-4">
                  <select
                    value={user.status}
                    onChange={(e) => onUpdateStatus(user.id, e.target.value)}
                    className={`px-2 py-1 rounded-lg text-xs ${getStatusBadge(user.status)} border-none focus:outline-none cursor-pointer`}
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="banned">Banned</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td className="p-4">
                  {user.verified ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <button onClick={() => onVerify(user.id)} className="text-yellow-500 hover:text-yellow-400">
                      <XCircle size={18} />
                    </button>
                  )}
                </td>
                <td className="p-4">{user.orders}</td>
                <td className="p-4">${user.totalSpent.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(user)} className="p-1 hover:text-blue-500 transition-colors" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => onDelete(user.id)} className="p-1 hover:text-red-500 transition-colors" title="Delete">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-1 hover:text-green-500 transition-colors" title="View">
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;