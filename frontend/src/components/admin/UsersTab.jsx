// components/admin/UsersTab.jsx - Updated with Pagination
import React, { useState, useEffect } from 'react';
import { Users, Edit, Trash2, Eye, Mail, Phone, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const UsersTab = ({ currentTheme }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 (555) 123-4567", location: "San Francisco, CA", role: "admin", status: "active", joinDate: "2023-01-15", orders: 45, totalSpent: 3450, avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 (555) 234-5678", location: "New York, NY", role: "seller", status: "active", joinDate: "2023-03-20", orders: 128, totalSpent: 8920, avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Michael Chen", email: "michael@example.com", phone: "+1 (555) 345-6789", location: "Los Angeles, CA", role: "user", status: "active", joinDate: "2023-06-10", orders: 12, totalSpent: 890, avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 4, name: "Emily Rodriguez", email: "emily@example.com", phone: "+1 (555) 456-7890", location: "Miami, FL", role: "user", status: "suspended", joinDate: "2023-08-05", orders: 3, totalSpent: 245, avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 5, name: "David Kim", email: "david@example.com", phone: "+1 (555) 567-8901", location: "Seattle, WA", role: "moderator", status: "active", joinDate: "2023-02-28", orders: 67, totalSpent: 4560, avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: 6, name: "Lisa Wang", email: "lisa@example.com", phone: "+1 (555) 678-9012", location: "Chicago, IL", role: "seller", status: "active", joinDate: "2023-04-15", orders: 89, totalSpent: 6780, avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
    { id: 7, name: "James Wilson", email: "james@example.com", phone: "+1 (555) 789-0123", location: "Austin, TX", role: "user", status: "active", joinDate: "2023-07-20", orders: 23, totalSpent: 1560, avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
    { id: 8, name: "Maria Garcia", email: "maria@example.com", phone: "+1 (555) 890-1234", location: "Dallas, TX", role: "user", status: "suspended", joinDate: "2023-09-10", orders: 5, totalSpent: 345, avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
    { id: 9, name: "Robert Brown", email: "robert@example.com", phone: "+1 (555) 901-2345", location: "Boston, MA", role: "moderator", status: "active", joinDate: "2023-05-18", orders: 45, totalSpent: 3450, avatar: "https://randomuser.me/api/portraits/men/9.jpg" },
    { id: 10, name: "Patricia Lee", email: "patricia@example.com", phone: "+1 (555) 012-3456", location: "Denver, CO", role: "admin", status: "active", joinDate: "2023-01-30", orders: 234, totalSpent: 15670, avatar: "https://randomuser.me/api/portraits/women/10.jpg" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin': return 'bg-red-500/20 text-red-500';
      case 'moderator': return 'bg-purple-500/20 text-purple-500';
      case 'seller': return 'bg-blue-500/20 text-blue-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  const updateUserStatus = (id, newStatus) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const roles = ['all', 'admin', 'moderator', 'seller', 'user'];

  // Stats
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    totalSpent: users.reduce((sum, u) => sum + u.totalSpent, 0)
  };

  // Pagination component
  const Pagination = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    if (endPage - startPage + 1 < maxPageButtons) startPage = Math.max(1, endPage - maxPageButtons + 1);
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    return (
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-75">Show:</span>
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`px-2 py-1 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} text-sm`}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm opacity-75">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} users</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prevPage} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : `${currentTheme.card} hover:scale-105`}`}>
            <ChevronLeft size={18} />
          </button>
          {startPage > 1 && (<><button onClick={() => paginate(1)} className={`px-3 py-1 rounded-lg ${currentTheme.card} hover:scale-105`}>1</button>{startPage > 2 && <span className="px-1">...</span>}</>)}
          {pageNumbers.map(number => (<button key={number} onClick={() => paginate(number)} className={`px-3 py-1 rounded-lg ${currentPage === number ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : `${currentTheme.card} hover:scale-105`}`}>{number}</button>))}
          {endPage < totalPages && (<>{endPage < totalPages - 1 && <span className="px-1">...</span>}<button onClick={() => paginate(totalPages)} className={`px-3 py-1 rounded-lg ${currentTheme.card} hover:scale-105`}>{totalPages}</button></>)}
          <button onClick={nextPage} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : `${currentTheme.card} hover:scale-105`}`}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users Management ({filteredUsers.length} total)</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className={`${currentTheme.secondary} p-3 rounded-lg text-center`}>
          <Users size={20} className="mx-auto mb-1" />
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-xs opacity-75">Total Users</p>
        </div>
        <div className={`${currentTheme.secondary} p-3 rounded-lg text-center`}>
          <p className="text-2xl font-bold text-green-500">{stats.active}</p>
          <p className="text-xs opacity-75">Active</p>
        </div>
        <div className={`${currentTheme.secondary} p-3 rounded-lg text-center`}>
          <p className="text-2xl font-bold text-red-500">{stats.suspended}</p>
          <p className="text-xs opacity-75">Suspended</p>
        </div>
        <div className={`${currentTheme.secondary} p-3 rounded-lg text-center`}>
          <p className="text-2xl font-bold">${(stats.totalSpent / 1000).toFixed(1)}K</p>
          <p className="text-xs opacity-75">Total Spent</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" placeholder="Search users by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`flex-1 px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}>
          {roles.map(role => (<option key={role} value={role}>{role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}</option>))}
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-700"><tr className="text-left">
            <th className="pb-3">User</th><th className="pb-3">Contact</th><th className="pb-3">Role</th><th className="pb-3">Status</th><th className="pb-3">Orders</th><th className="pb-3">Total Spent</th><th className="pb-3">Actions</th>
          </tr></thead>
          <tbody>
            {currentUsers.map((user) => (<tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800/50">
              <td className="py-3"><div className="flex items-center gap-3"><img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" /><div><p className="font-semibold">{user.name}</p><p className="text-xs opacity-60">ID: #{user.id}</p></div></div></td>
              <td className="py-3"><div className="space-y-1"><div className="flex items-center gap-1 text-sm"><Mail size={12} /> {user.email}</div><div className="flex items-center gap-1 text-sm"><Phone size={12} /> {user.phone}</div><div className="flex items-center gap-1 text-xs opacity-60"><Calendar size={10} /> Joined: {user.joinDate}</div></div></td>
              <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs ${getRoleBadge(user.role)}`}>{user.role}</span></td>
              <td className="py-3"><select value={user.status} onChange={(e) => updateUserStatus(user.id, e.target.value)} className={`px-2 py-1 rounded-lg text-xs ${getStatusBadge(user.status)} border-none focus:outline-none cursor-pointer`}><option value="active">Active</option><option value="suspended">Suspended</option></select></td>
              <td className="py-3">{user.orders}</td>
              <td className="py-3">${user.totalSpent.toLocaleString()}</td>
              <td className="py-3"><div className="flex gap-2"><button className="p-1 hover:text-blue-500"><Edit size={18} /></button><button onClick={() => deleteUser(user.id)} className="p-1 hover:text-red-500"><Trash2 size={18} /></button><button className="p-1 hover:text-green-500"><Eye size={18} /></button></div></td>
            </tr>))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && <Pagination />}
    </div>
  );
};

export default UsersTab;