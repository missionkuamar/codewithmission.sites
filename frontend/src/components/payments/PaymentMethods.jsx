// components/payments/PaymentMethods.jsx
import React from 'react';
import { Plus, Trash2, Star, CreditCard, Bitcoin, Wallet } from 'lucide-react';

const PaymentMethods = ({ methods, onAdd, onRemove, onSetDefault, currentTheme, currentMood }) => {
  const getCardIcon = (brand) => {
    switch(brand.toLowerCase()) {
      case 'visa': return <CreditCard className="text-blue-600" size={32} />;
      case 'mastercard': return <CreditCard className="text-red-600" size={32} />;
      case 'amex': return <CreditCard className="text-blue-400" size={32} />;
      case 'paypal': return <div className="text-blue-600 font-bold text-xl">P</div>;
      default: return <CreditCard size={32} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Saved Payment Methods</h2>
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={18} /> Add New Method
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {methods.map((method) => (
          <div key={method.id} className={`${currentTheme.secondary} p-4 rounded-lg relative`}>
            {method.isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1 text-yellow-500">
                <Star size={14} fill="currentColor" /> Default
              </div>
            )}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gray-800">
                {getCardIcon(method.brand)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{method.name || method.brand}</h3>
                {method.type !== 'paypal' ? (
                  <>
                    <p className="text-sm opacity-75">•••• {method.last4}</p>
                    <p className="text-sm opacity-75">Expires {method.expiry}</p>
                  </>
                ) : (
                  <p className="text-sm opacity-75">{method.email}</p>
                )}
              </div>
              <div className="flex gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => onSetDefault(method.id)}
                    className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-500 text-sm hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => onRemove(method.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`${currentTheme.secondary} p-4 rounded-lg text-center`}>
        <Wallet size={32} className="mx-auto mb-2 opacity-50" />
        <h3 className="font-semibold mb-1">Digital Wallet</h3>
        <p className="text-sm opacity-75 mb-3">Connect your digital wallet for faster checkout</p>
        <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;