// components/admin/security/SecurityScoreCard.jsx
import React from 'react';
import { Shield, ShieldCheck, ShieldAlert, Activity, Clock, AlertTriangle } from 'lucide-react';

const SecurityScoreCard = ({ score, stats, currentTheme, currentMood }) => {
  return (
    <div className={`${currentTheme.card} ${currentMood} p-6 mb-8 bg-gradient-to-r from-purple-600 to-pink-600`}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg className="w-24 h-24">
              <circle className="text-white/20" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="48" cy="48"/>
              <circle 
                className="text-white" 
                strokeWidth="8" 
                strokeDasharray={`${2 * Math.PI * 40}`} 
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                strokeLinecap="round"
                fill="transparent" 
                r="40" 
                cx="48" 
                cy="48"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
              <text x="48" y="52" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                {score}
              </text>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold">Security Score</h3>
            <p className="text-white/80">Your site is well protected</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Shield size={24} className="mx-auto mb-1" />
            <p className="text-2xl font-bold">{stats.blockedAttempts}</p>
            <p className="text-xs">Blocked Attempts</p>
          </div>
          <div className="text-center">
            <AlertTriangle size={24} className="mx-auto mb-1" />
            <p className="text-2xl font-bold">{stats.suspiciousActivities}</p>
            <p className="text-xs">Suspicious</p>
          </div>
          <div className="text-center">
            <ShieldAlert size={24} className="mx-auto mb-1" />
            <p className="text-2xl font-bold">{stats.vulnerabilities}</p>
            <p className="text-xs">Vulnerabilities</p>
          </div>
          <div className="text-center">
            <Activity size={24} className="mx-auto mb-1" />
            <p className="text-2xl font-bold">{stats.activeSessions}</p>
            <p className="text-xs">Active Sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityScoreCard;