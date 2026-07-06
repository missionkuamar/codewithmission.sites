// components/orders/OrderDetailsModal.jsx
import React from 'react';
import { X, Package, Truck, CheckCircle, Clock, MapPin, Calendar, CreditCard, Truck as DeliveryTruck, RefreshCw, Download } from 'lucide-react';

const OrderDetailsModal = ({ order, onClose, currentTheme, onReorder }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Order Placed': return <Package size={18} className="text-blue-500" />;
      case 'Payment Confirmed': return <CreditCard size={18} className="text-green-500" />;
      case 'Processing': return <Clock size={18} className="text-yellow-500" />;
      case 'Shipped': return <Truck size={18} className="text-purple-500" />;
      case 'Delivered': return <CheckCircle size={18} className="text-green-500" />;
      case 'Cancelled': return <X size={18} className="text-red-500" />;
      default: return <Package size={18} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className={`${currentTheme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit">
          <div>
            <h2 className="text-2xl font-bold">Order Details</h2>
            <p className="text-sm opacity-75">Order #{order.id}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status Timeline */}
          <div className={`${currentTheme.secondary} p-4 rounded-lg`}>
            <h3 className="font-semibold mb-4">Order Timeline</h3>
            <div className="relative">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-3 mb-4 last:mb-0">
                  <div className="relative">
                    <div className={`p-1.5 rounded-full ${event.completed ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                      {getStatusIcon(event.status)}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div className={`absolute top-6 left-4 w-0.5 h-8 ${event.completed ? 'bg-green-500' : 'bg-gray-600'}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.status}</p>
                    <p className="text-sm opacity-75">{event.date}</p>
                  </div>
                  {event.completed && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className={`${currentTheme.secondary} p-3 rounded-lg flex items-center gap-3`}>
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm opacity-75">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs opacity-75">${item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`${currentTheme.secondary} p-4 rounded-lg`}>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin size={16} /> Shipping Address
              </h3>
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>

            <div className={`${currentTheme.secondary} p-4 rounded-lg`}>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <DeliveryTruck size={16} /> Shipping Info
              </h3>
              <p>Method: Standard Shipping</p>
              {order.trackingNumber && (
                <p className="font-mono text-sm">Tracking: {order.trackingNumber}</p>
              )}
              <p className="text-sm opacity-75 mt-2">Estimated delivery: 3-5 business days</p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className={`${currentTheme.secondary} p-4 rounded-lg`}>
            <h3 className="font-semibold mb-3">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-purple-500">${order.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm opacity-75">
                <span>Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            {order.status === 'delivered' && (
              <button
                onClick={() => {
                  onReorder(order);
                  onClose();
                }}
                className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} /> Reorder Items
              </button>
            )}
            <button className="flex-1 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
              <Download size={16} /> Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;