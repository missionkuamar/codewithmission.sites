// pages/Payments.jsx - Main Payments Page
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import PaymentsHeader from '../components/payments/PaymentsHeader';
import PaymentStats from '../components/payments/PaymentStats';
import PaymentMethods from '../components/payments/PaymentMethods';
import TransactionHistory from '../components/payments/TransactionHistory';
import BillingAddress from '../components/payments/BillingAddress';
import PaymentPagination from '../components/payments/PaymentPagination';
import AddPaymentMethodModal from '../components/payments/AddPaymentMethodModal';
import { paymentsApi } from '../services/paymentsApi';

const Payments = () => {
  const { currentTheme, currentMood } = useTheme();
  const [transactions, setTransactions] = useState(paymentsApi.getTransactions());
  const [paymentMethods, setPaymentMethods] = useState(paymentsApi.getPaymentMethods());
  const [billingAddress, setBillingAddress] = useState(paymentsApi.getBillingAddress());
  const [activeTab, setActiveTab] = useState('methods');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Pagination for transactions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const addPaymentMethod = (newMethod) => {
    setPaymentMethods([...paymentMethods, { ...newMethod, id: Date.now(), isDefault: false }]);
    showNotification('Payment method added successfully');
  };

  const removePaymentMethod = (id) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
      showNotification('Payment method removed');
    }
  };

  const setDefaultMethod = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    showNotification('Default payment method updated');
  };

  const updateBillingAddress = (newAddress) => {
    setBillingAddress(newAddress);
    showNotification('Billing address updated');
  };

  const stats = {
    totalSpent: paymentsApi.getTotalSpent(),
    pendingPayments: paymentsApi.getPendingPayments(),
    savedMethods: paymentMethods.length,
    subscriptions: paymentsApi.getSubscriptions()
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PaymentsHeader currentTheme={currentTheme} />
        
        <PaymentStats stats={stats} currentTheme={currentTheme} currentMood={currentMood} />
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-6 py-3 rounded-t-lg transition-all flex items-center gap-2 ${
              activeTab === 'methods'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : `${currentTheme.card} hover:bg-gray-700`
            }`}
          >
            Payment Methods
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-3 rounded-t-lg transition-all flex items-center gap-2 ${
              activeTab === 'transactions'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : `${currentTheme.card} hover:bg-gray-700`
            }`}
          >
            Transaction History
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`px-6 py-3 rounded-t-lg transition-all flex items-center gap-2 ${
              activeTab === 'billing'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : `${currentTheme.card} hover:bg-gray-700`
            }`}
          >
            Billing Address
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'methods' && (
          <PaymentMethods 
            methods={paymentMethods}
            onAdd={() => setShowAddModal(true)}
            onRemove={removePaymentMethod}
            onSetDefault={setDefaultMethod}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
        )}

        {activeTab === 'transactions' && (
          <>
            <TransactionHistory 
              transactions={currentTransactions}
              currentTheme={currentTheme}
              currentMood={currentMood}
            />
            <PaymentPagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              totalItems={transactions.length}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
              currentTheme={currentTheme}
            />
          </>
        )}

        {activeTab === 'billing' && (
          <BillingAddress 
            address={billingAddress}
            onUpdate={updateBillingAddress}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
        )}

        {showAddModal && (
          <AddPaymentMethodModal
            onClose={() => setShowAddModal(false)}
            onSave={addPaymentMethod}
            currentTheme={currentTheme}
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

export default Payments;