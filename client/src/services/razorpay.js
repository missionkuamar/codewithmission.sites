// frontend/src/services/razorpay.js
import api from './api';

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (projectId) => {
  const { data } = await api.post('/orders/create-order', { projectId });
  return data;
};

export const verifyPayment = async (paymentData) => {
  const { data } = await api.post('/orders/verify', paymentData);
  return data;
};