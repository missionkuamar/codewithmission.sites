// components/profile/ActivityLog.jsx
import React from 'react';
import { ShoppingBag, Heart, User, MessageCircle, Star, Clock } from 'lucide-react';

const ActivityLog = ({ currentTheme }) => {
  const activities = [
    { id: 1, type: 'order', title: 'Placed order #ORD-001', amount: '$249.99', time: '2 hours ago', icon: <ShoppingBag size={16} />, color: 'text-green-500' },
    { id: 2, type: 'wishlist', title: 'Added "AI Analytics Dashboard" to wishlist', time: '5 hours ago', icon: <Heart size={16} />, color: 'text-red-500' },
    { id: 3, type: 'profile', title: 'Updated profile information', time: '1 day ago', icon: <User size={16} />, color: 'text-blue-500' },
    { id: 4, type: 'review', title: 'Reviewed "E-Commerce Platform"', rating: 5, time: '2 days ago', icon: <Star size={16} />, color: 'text-yellow-500' },
    { id: 5, type: 'support', title: 'Contacted support about order #ORD-002', time: '3 days ago', icon: <MessageCircle size={16} />, color: 'text-purple-500' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Recent Activity</h2>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className={`${currentTheme.secondary} p-4 rounded-lg flex items-center justify-between flex-wrap gap-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${activity.color}/20`}>
                {activity.icon}
              </div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={12} className="opacity-50" />
                  <span className="text-xs opacity-50">{activity.time}</span>
                  {activity.amount && <span className="text-xs font-semibold text-purple-500">{activity.amount}</span>}
                  {activity.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < activity.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-500'} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;