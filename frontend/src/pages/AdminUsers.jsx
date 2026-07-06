// pages/AdminUsers.jsx - Main Users Page
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { usersApi } from '../services/usersApi';
import { AlertCircle, UserPlus } from 'lucide-react';
import UserStats from '../components/admin/users/UserStats';
import UserSearchFilters from '../components/admin/users/UserSearchFilters';
import UsersTable from '../components/admin/users/UsersTable';
import UserPagination from '../components/admin/users/UserPagination';
import UserModal from '../components/admin/users/UserModal';


const AdminUsers = () => {
  const { currentTheme, currentMood } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [notification, setNotification] = useState(null);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(usersApi.getAll());
      setLoading(false);
    }, 500);
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const updateUserStatus = (userId, newStatus) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    showNotification(`User status updated to ${newStatus}`);
  };

  const updateUserRole = (userId, newRole) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    showNotification(`User role updated to ${newRole}`);
  };

  const verifyUser = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, verified: true } : user
    ));
    showNotification('User verified successfully');
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      showNotification('User deleted successfully');
    }
  };

  const saveUser = (userData) => {
    if (editingUser) {
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? { ...userData, id: editingUser.id } : user
      ));
      showNotification('User updated successfully');
    } else {
      const newUser = {
        ...userData,
        id: Date.now(),
        joinDate: new Date().toISOString().split('T')[0],
        orders: 0,
        totalSpent: 0
      };
      setUsers(prev => [newUser, ...prev]);
      showNotification('User added successfully');
    }
    setShowUserModal(false);
    setEditingUser(null);
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    banned: users.filter(u => u.status === 'banned').length,
    pending: users.filter(u => u.status === 'pending').length,
    verified: users.filter(u => u.verified).length,
    admins: users.filter(u => u.role === 'admin').length,
    sellers: users.filter(u => u.role === 'seller').length,
    totalSpent: users.reduce((sum, u) => sum + u.totalSpent, 0)
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              User{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-sm opacity-75 mt-1">Manage users, roles, permissions, and activity</p>
          </div>
          <button
            onClick={() => {
              setEditingUser(null);
              setShowUserModal(true);
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2"
          >
            <UserPlus size={18} />
            Add New User
          </button>
        </div>

        {/* Stats Cards */}
        <UserStats stats={stats} currentTheme={currentTheme} currentMood={currentMood} />

        {/* Search and Filters */}
        <UserSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          currentTheme={currentTheme}
        />

        {/* Users Table */}
        <UsersTable
          users={currentUsers}
          loading={loading}
          currentTheme={currentTheme}
          onUpdateStatus={updateUserStatus}
          onUpdateRole={updateUserRole}
          onVerify={verifyUser}
          onDelete={deleteUser}
          onEdit={(user) => {
            setEditingUser(user);
            setShowUserModal(true);
          }}
        />

        {/* Pagination */}
        <UserPagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={filteredUsers.length}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          currentTheme={currentTheme}
        />

        {/* User Modal */}
        {showUserModal && (
          <UserModal
            user={editingUser}
            onClose={() => {
              setShowUserModal(false);
              setEditingUser(null);
            }}
            onSave={saveUser}
            currentTheme={currentTheme}
          />
        )}

        {/* Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
            <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
              {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
              <span>{notification.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;