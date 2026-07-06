// components/payments/PaymentStats.jsx
import React from 'react';
import { DollarSign, Clock, CreditCard, Calendar } from 'lucide-react';

const PaymentStats = ({ stats, currentTheme, currentMood }) => {
  const statCards = [
    { icon: <DollarSign size={22} />, value: `$${stats.totalSpent.toLocaleString()}`, label: "Total Spent", color: "from-green-500 to-emerald-500" },
    { icon: <Clock size={22} />, value: `$${stats.pendingPayments.toLocaleString()}`, label: "Pending Payments", color: "from-yellow-500 to-orange-500" },
    { icon: <CreditCard size={22} />, value: stats.savedMethods, label: "Saved Methods", color: "from-blue-500 to-cyan-500" },
    { icon: <Calendar size={22} />, value: stats.subscriptions, label: "Active Subscriptions", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className={`${currentTheme.card} ${currentMood} p-4 text-center transform hover:scale-105 transition-all`}>
          <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-2`}>
            {stat.icon}
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-xs opacity-75">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentStats;