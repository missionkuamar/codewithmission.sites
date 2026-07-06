// components/admin/users/UserStats.jsx
import React from 'react';
import { Users, UserCheck, UserX, MailCheck, Crown, Award, DollarSign, Clock } from 'lucide-react';

const UserStats = ({ stats, currentTheme, currentMood }) => {
  const statCards = [
    { icon: <Users size={20} />, value: stats.total, label: "Total Users", color: "from-blue-500 to-cyan-500" },
    { icon: <UserCheck size={20} />, value: stats.active, label: "Active", color: "from-green-500 to-emerald-500", valueColor: "text-green-500" },
    { icon: <UserX size={20} />, value: stats.suspended + stats.banned, label: "Restricted", color: "from-red-500 to-rose-500", valueColor: "text-red-500" },
    { icon: <MailCheck size={20} />, value: stats.verified, label: "Verified", color: "from-purple-500 to-pink-500" },
    { icon: <Crown size={20} />, value: stats.admins, label: "Admins", color: "from-yellow-500 to-orange-500" },
    { icon: <Award size={20} />, value: stats.sellers, label: "Sellers", color: "from-indigo-500 to-purple-500" },
    { icon: <DollarSign size={20} />, value: `$${(stats.totalSpent / 1000).toFixed(1)}K`, label: "Total Spent", color: "from-green-500 to-emerald-500" },
    { icon: <Clock size={20} />, value: stats.pending, label: "Pending", color: "from-yellow-500 to-orange-500" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className={`${currentTheme.card} ${currentMood} p-3 text-center transform hover:scale-105 transition-all duration-300`}>
          <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-1`}>
            {stat.icon}
          </div>
          <p className={`text-xl font-bold ${stat.valueColor || ''}`}>{stat.value}</p>
          <p className="text-xs opacity-75">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default UserStats;