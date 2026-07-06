// pages/Orders.jsx - Updated with Pagination
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import OrdersHeader from '../components/orders/OrdersHeader';
import OrdersStats from '../components/orders/OrdersStats';
import OrdersFilters from '../components/orders/OrdersFilters';
import OrdersList from '../components/orders/OrdersList';
import OrderDetailsModal from '../components/orders/OrderDetailsModal';
import OrdersPagination from '../components/orders/OrdersPagination';
import { ordersApi } from '../services/ordersApi';

const Orders = () => {
  const { currentTheme, currentMood } = useTheme();
  const [orders, setOrders] = useState(ordersApi.getOrders());
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filter === 'all' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
  };

  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
      showNotification('Order cancelled successfully');
    }
  };

  const reorder = (order) => {
    showNotification(`Items from order ${order.id} added to cart`);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OrdersHeader currentTheme={currentTheme} />
        
        <OrdersStats stats={stats} currentTheme={currentTheme} currentMood={currentMood} />
        
        <OrdersFilters 
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentTheme={currentTheme}
        />
        
        <OrdersList 
          orders={currentOrders}
          currentTheme={currentTheme}
          currentMood={currentMood}
          onViewDetails={setSelectedOrder}
          onCancelOrder={cancelOrder}
          onReorder={reorder}
        />

        {/* Pagination */}
        <OrdersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={filteredOrders.length}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          currentTheme={currentTheme}
        />

        {selectedOrder && (
          <OrderDetailsModal 
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            currentTheme={currentTheme}
            onReorder={reorder}
          />
        )}

        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
            <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
              <Check size={20} />
              <span>{notification.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;