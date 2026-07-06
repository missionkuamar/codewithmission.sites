// pages/CartPage.jsx - Simplified Main Page
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import CartHeader from '../components/cart/CartHeader';
import CartProgress from '../components/cart/CartProgress';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import EmptyCart from '../components/cart/EmptyCart';
import { cartApi } from '../services/cartApi';

const CartPage = () => {
  const { currentTheme, currentMood } = useTheme();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setCartItems(cartApi.getCartItems());
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal() - discount;
    return subtotal > 100 ? 0 : 9.99;
  };

  const calculateTax = () => {
    return (calculateSubtotal() - discount) * 0.1;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - discount + calculateTax() + calculateShipping();
  };

  const applyCoupon = () => {
    const validCoupons = { 'SAVE10': 10, 'SAVE20': 20, 'WELCOME15': 15 };
    if (validCoupons[couponCode.toUpperCase()]) {
      const discountPercent = validCoupons[couponCode.toUpperCase()];
      const discountAmount = (calculateSubtotal() * discountPercent) / 100;
      setDiscount(discountAmount);
      setCouponApplied(true);
      alert(`Coupon applied! You saved $${discountAmount.toFixed(2)}`);
    } else {
      alert('Invalid coupon code');
    }
    setCouponCode('');
  };

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Order placed successfully!');
      setCartItems([]);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return <EmptyCart currentTheme={currentTheme} currentMood={currentMood} />;
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartHeader itemCount={cartItems.length} />
        <CartProgress />
        
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Cart Items Section */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
                onMoveToSaved={() => {}}
              />
            ))}
          </div>
          
          {/* Order Summary Section */}
          <div className="lg:w-96">
            <OrderSummary
              subtotal={calculateSubtotal()}
              savings={calculateSavings()}
              discount={discount}
              shipping={calculateShipping()}
              tax={calculateTax()}
              total={calculateTotal()}
              couponApplied={couponApplied}
              couponCode={couponCode}
              onCouponChange={(e) => setCouponCode(e.target.value)}
              onApplyCoupon={applyCoupon}
              loading={loading}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;