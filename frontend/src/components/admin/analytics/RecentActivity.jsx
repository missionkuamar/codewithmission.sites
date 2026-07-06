// components/admin/analytics/RecentActivity.jsx
import React from 'react';
import { Activity, DollarSign, UserPlus, Star, MessageCircle, CheckCircle, Clock } from 'lucide-react';

const RecentActivity = ({ activities, currentTheme, currentMood }) => {
  const getActivityIcon = (type) => {
    switch(type) {
      case 'sale': return <DollarSign size={16} className="text-green-500" />;
      case 'signup': return <UserPlus size={16} className="text-blue-500" />;
      case 'review': return <Star size={16} className="text-yellow-500" />;
      case 'support': return <MessageCircle size={16} className="text-purple-500" />;
      default: return <Activity size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-500';
      case 'active': return 'bg-blue-500/20 text-blue-500';
      case 'approved': return 'bg-purple-500/20 text-purple-500';
      case 'resolved': return 'bg-green-500/20 text-green-500';
      default: return 'bg-gray-500/20';
    }
  };

  return (
    <div className={`${currentTheme.card} ${currentMood} p-6 mt-6`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity size={20} /> Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-3">
              {getActivityIcon(activity.type)}
              <div>
                <p className="text-sm">
                  <span className="font-semibold">{activity.user}</span>
                  {activity.type === 'sale' && ` purchased ${activity.product} for $${activity.amount}`}
                  {activity.type === 'signup' && ` signed up`}
                  {activity.type === 'review' && ` reviewed ${activity.product} (${activity.rating}★)`}
                  {activity.type === 'support' && ` reported: ${activity.issue}`}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={10} className="opacity-50" />
                  <span className="text-xs opacity-50">{activity.time}</span>
                  {activity.status && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {activity.type === 'sale' && (
              <CheckCircle size={18} className="text-green-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;