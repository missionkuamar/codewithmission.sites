// components/support/SupportStats.jsx
import React from 'react';
import { Users, Clock, CheckCircle, ThumbsUp } from 'lucide-react';

const SupportStats = ({ stats, currentTheme, currentMood }) => {
  const statCards = [
    { icon: <Users size={24} />, value: stats.activeAgents, label: "Active Agents", color: "from-blue-500 to-cyan-500" },
    { icon: <Clock size={24} />, value: stats.avgResponseTime, label: "Avg Response Time", color: "from-green-500 to-emerald-500" },
    { icon: <CheckCircle size={24} />, value: stats.ticketsSolved.toLocaleString(), label: "Tickets Solved", color: "from-purple-500 to-pink-500" },
    { icon: <ThumbsUp size={24} />, value: `${stats.satisfactionRate}%`, label: "Satisfaction Rate", color: "from-yellow-500 to-orange-500" }
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

export default SupportStats;