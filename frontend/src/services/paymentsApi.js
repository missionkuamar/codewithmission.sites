// services/paymentsApi.js - Fake Payments API Service
export const paymentsApi = {
  getTransactions: () => [
    { id: 'TXN-001', date: '2024-02-20', description: 'Purchase - AI Analytics Dashboard', amount: 49.99, status: 'completed', type: 'purchase', paymentMethod: 'Visa ****4242' },
    { id: 'TXN-002', date: '2024-02-18', description: 'Purchase - E-Commerce Platform', amount: 79.99, status: 'completed', type: 'purchase', paymentMethod: 'PayPal' },
    { id: 'TXN-003', date: '2024-02-15', description: 'Subscription - Pro Plan', amount: 29.99, status: 'completed', type: 'subscription', paymentMethod: 'Mastercard ****5555' },
    { id: 'TXN-004', date: '2024-02-10', description: 'Purchase - Blockchain Wallet', amount: 199.99, status: 'completed', type: 'purchase', paymentMethod: 'Visa ****4242' },
    { id: 'TXN-005', date: '2024-02-05', description: 'Refund - Order Cancellation', amount: -89.99, status: 'completed', type: 'refund', paymentMethod: 'PayPal' },
    { id: 'TXN-006', date: '2024-02-01', description: 'Purchase - Healthcare System', amount: 149.99, status: 'pending', type: 'purchase', paymentMethod: 'Amex ****1234' },
    { id: 'TXN-007', date: '2024-01-28', description: 'Subscription - Pro Plan', amount: 29.99, status: 'completed', type: 'subscription', paymentMethod: 'Mastercard ****5555' },
    { id: 'TXN-008', date: '2024-01-25', description: 'Purchase - Smart Home IoT', amount: 89.99, status: 'completed', type: 'purchase', paymentMethod: 'Visa ****4242' },
    { id: 'TXN-009', date: '2024-01-20', description: 'Purchase - Portfolio Generator', amount: 59.99, status: 'completed', type: 'purchase', paymentMethod: 'PayPal' },
    { id: 'TXN-010', date: '2024-01-15', description: 'Subscription - Pro Plan', amount: 29.99, status: 'failed', type: 'subscription', paymentMethod: 'Amex ****1234' }
  ],

  getPaymentMethods: () => [
    { id: 1, type: 'visa', last4: '4242', expiry: '12/26', name: 'Visa Platinum', isDefault: true, brand: 'Visa' },
    { id: 2, type: 'mastercard', last4: '5555', expiry: '08/25', name: 'Mastercard Gold', isDefault: false, brand: 'Mastercard' },
    { id: 3, type: 'paypal', email: 'john@example.com', isDefault: false, brand: 'PayPal' },
    { id: 4, type: 'amex', last4: '1234', expiry: '03/27', name: 'American Express', isDefault: false, brand: 'Amex' }
  ],

  getBillingAddress: () => ({
    name: 'John Doe',
    company: '',
    street: '123 Main Street',
    apartment: 'Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    taxId: ''
  }),

  getTotalSpent: () => 678.92,
  
  getPendingPayments: () => 149.99,
  
  getSubscriptions: () => 1
};