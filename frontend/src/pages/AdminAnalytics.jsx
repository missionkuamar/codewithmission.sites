// pages/AdminAnalytics.jsx - Main Analytics Page
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { analyticsApi } from '../services/analyticsApi';
import { AlertCircle, Check, Loader } from 'lucide-react';
import AnalyticsHeader from '../components/admin/analytics/AnalyticsHeader';
import AnalyticsOverviewCards from '../components/admin/analytics/AnalyticsOverviewCards';
import RevenueChart from '../components/admin/analytics/RevenueChart';
import TrafficChart from '../components/admin/analytics/TrafficChart';
import TopProducts from '../components/admin/analytics/TopProducts';
import TopCategories from '../components/admin/analytics/TopCategories';
import TrafficSources from '../components/admin/analytics/TrafficSources';
import DeviceBreakdown from '../components/admin/analytics/DeviceBreakdown';
import RecentActivity from '../components/admin/analytics/RecentActivity';

const AdminAnalytics = () => {
  const { currentTheme, currentMood } = useTheme();
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('7d');
  const [analytics, setAnalytics] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    setTimeout(() => {
      setAnalytics(analyticsApi.getData(dateRange));
      setLoading(false);
    }, 500);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const exportData = () => {
    const data = {
      analytics: analytics,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Analytics data exported');
  };

  if (!analytics) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <Loader size={40} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnalyticsHeader
          dateRange={dateRange}
          setDateRange={setDateRange}
          onExport={exportData}
          onRefresh={loadAnalytics}
          loading={loading}
          currentTheme={currentTheme}
        />

        <AnalyticsOverviewCards
          overview={analytics.overview}
          currentTheme={currentTheme}
          currentMood={currentMood}
        />

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart
            data={analytics.dailyData}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
          <TrafficChart
            data={analytics.dailyData}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <TopProducts
            products={analytics.topProducts}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
          <TopCategories
            categories={analytics.topCategories}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <TrafficSources 
            sources={analytics.trafficSources}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
          <DeviceBreakdown
            devices={analytics.deviceBreakdown}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
        </div>

        <RecentActivity
          activities={analytics.recentActivity}
          currentTheme={currentTheme}
          currentMood={currentMood}
        />

        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
            <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
              {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
              <span>{notification.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;