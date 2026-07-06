// components/admin/OrdersTab.jsx - Updated with Pagination
import React, { useState, useEffect } from 'react';
import { Eye, Package, Truck, CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const OrdersTab = ({ currentTheme }) => {
  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', total: 249.99, status: 'delivered', date: '2024-02-20', items: 3, paymentMethod: 'Credit Card' },
    { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@example.com', total: 149.99, status: 'processing', date: '2024-02-19', items: 2, paymentMethod: 'PayPal' },
    { id: 'ORD-003', customer: 'Michael Chen', email: 'michael@example.com', total: 399.99, status: 'shipped', date: '2024-02-18', items: 4, paymentMethod: 'Credit Card' },
    { id: 'ORD-004', customer: 'Emily Rodriguez', email: 'emily@example.com', total: 89.99, status: 'pending', date: '2024-02-17', items: 1, paymentMethod: 'Apple Pay' },
    { id: 'ORD-005', customer: 'David Kim', email: 'david@example.com', total: 199.99, status: 'cancelled', date: '2024-02-16', items: 2, paymentMethod: 'Credit Card' },
    { id: 'ORD-006', customer: 'Lisa Wang', email: 'lisa@example.com', total: 299.99, status: 'processing', date: '2024-02-15', items: 3, paymentMethod: 'PayPal' },
    { id: 'ORD-007', customer: 'James Wilson', email: 'james@example.com', total: 79.99, status: 'delivered', date: '2024-02-14', items: 1, paymentMethod: 'Credit Card' },
    { id: 'ORD-008', customer: 'Maria Garcia', email: 'maria@example.com', total: 159.99, status: 'shipped', date: '2024-02-13', items: 2, paymentMethod: 'Apple Pay' },
    { id: 'ORD-009', customer: 'Robert Brown', email: 'robert@example.com', total: 449.99, status: 'pending', date: '2024-02-12', items: 5, paymentMethod: 'Credit Card' },
    { id: 'ORD-010', customer: 'Patricia Lee', email: 'patricia@example.com', total: 89.99, status: 'delivered', date: '2024-02-11', items: 1, paymentMethod: 'PayPal' },
    { id: 'ORD-011', customer: 'Thomas Martinez', email: 'thomas@example.com', total: 199.99, status: 'processing', date: '2024-02-10', items: 2, paymentMethod: 'Credit Card' },
    { id: 'ORD-012', customer: 'Jennifer Taylor', email: 'jennifer@example.com', total: 299.99, status: 'shipped', date: '2024-02-09', items: 3, paymentMethod: 'Apple Pay' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'shipped': return <Truck size={16} className="text-blue-500" />;
      case 'processing': return <Clock size={16} className="text-yellow-500" />;
      case 'pending': return <Package size={16} className="text-orange-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return <Package size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-500/20 text-green-500';
      case 'shipped': return 'bg-blue-500/20 text-blue-500';
      case 'processing': return 'bg-yellow-500/20 text-yellow-500';
      case 'pending': return 'bg-orange-500/20 text-orange-500';
      case 'cancelled': return 'bg-red-500/20 text-red-500';
      default: return 'bg-gray-500/20';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  // Pagination component
  const Pagination = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    return (
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-75">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className={`px-2 py-1 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} text-sm`}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm opacity-75">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={prevPage} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : `${currentTheme.card} hover:scale-105`}`}>
            <ChevronLeft size={18} />
          </button>
          
          {startPage > 1 && (
            <>
              <button onClick={() => paginate(1)} className={`px-3 py-1 rounded-lg ${currentTheme.card} hover:scale-105`}>1</button>
              {startPage > 2 && <span className="px-1">...</span>}
            </>
          )}
          
          {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} className={`px-3 py-1 rounded-lg ${currentPage === number ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : `${currentTheme.card} hover:scale-105`}`}>
              {number}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-1">...</span>}
              <button onClick={() => paginate(totalPages)} className={`px-3 py-1 rounded-lg ${currentTheme.card} hover:scale-105`}>{totalPages}</button>
            </>
          )}
          
          <button onClick={nextPage} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : `${currentTheme.card} hover:scale-105`}`}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Orders Management ({filteredOrders.length} total)</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className={`${currentTheme.secondary} p-3 rounded-lg text-center`}>
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-xs opacity-75">Total</p>
        </div>
        <div className={`${currentTheme.secondary} p-3 rounded-lg text-center`}>
          <p className="text-2xl font-bold text-orange-500">{stats.pending}</p>
          <p className="text-xs opacity-75">Pending</p>
        </div>
        <div className={`${currentTheme.secondary} p-3 rounded-lg text-center`}>
          <p className="text-2xl font-bold text-yellow-500">{stats.processing}</p>
          <p className="text-xs opacity-75">Processing</p>
        </div>
        <div className={`${currentTheme.secondary} p-3 rounded-lg text-center`}>
          <p className="text-2xl font-bold text-blue-500">{stats.shipped}</p>
          <p className="text-xs opacity-75">Shipped</p>
        </div>
        <div className={`${currentTheme.secondary} p-3 rounded-lg text-center`}>
          <p className="text-2xl font-bold text-green-500">{stats.delivered}</p>
          <p className="text-xs opacity-75">Delivered</p>
        </div>
        <div className={`${currentTheme.secondary} p-3 rounded-lg text-center`}>
          <p className="text-2xl font-bold text-red-500">{stats.cancelled}</p>
          <p className="text-xs opacity-75">Cancelled</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Order ID or Customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-1 px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr className="text-left">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Items</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Payment</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
             </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                <td className="py-3 font-mono text-sm">{order.id}</td>
                <td className="py-3">
                  <div>
                    <p className="font-semibold">{order.customer}</p>
                    <p className="text-xs opacity-60">{order.email}</p>
                  </div>
                </td>
                <td className="py-3">{order.date}</td>
                <td className="py-3">{order.items}</td>
                <td className="py-3 font-semibold">${order.total.toFixed(2)}</td>
                <td className="py-3 text-sm">{order.paymentMethod}</td>
                <td className="py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={`px-2 py-1 rounded-lg text-xs ${getStatusColor(order.status)} border-none focus:outline-none cursor-pointer`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3">
                  <button className="p-1 hover:text-blue-500"><Eye size={18} /></button>
                </td>
               </tr>
            ))}
          </tbody>
         </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && <Pagination />}
    </div>
  );
};

export default OrdersTab;