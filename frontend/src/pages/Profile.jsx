// pages/Profile.jsx - Main Profile Page
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { profileApi } from '../services/profileApi';
import PersonalInfo from '../components/admin/profile/PersonalInfo';
import OrderHistory from '../components/admin/profile/OrderHistory';
import AddressBook from '../components/admin/profile/AddressBook';
import Wishlist from '../components/admin/profile/Wishlist';
import ActivityLog from '../components/admin/profile/ActivityLog';
import SecuritySettings from '../components/admin/settings/SecuritySettings';
import ProfileHeader from '../components/admin/profile/ProfileHeader';
import ProfileStats from '../components/admin/profile/ProfileStats';
import ProfileTabs from '../components/admin/profile/ProfileTabs';
import { Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../redux/slices/authSlice';


const Profile = () => {
  const { currentTheme, currentMood } = useTheme();
  const [activeTab, setActiveTab] = useState('personal');
  const [notification, setNotification] = useState(null);
  // const [user, setUser] = useState(profileApi.getUser());
  const [orders, setOrders] = useState(profileApi.getOrders());
  const [addresses, setAddresses] = useState(profileApi.getAddresses());
  const [wishlist, setWishlist] = useState(profileApi.getWishlist());
const { user } = useSelector((state) => state.auth || {});
//console.log(user)
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const updateUser = (updatedData) => {
    // setUser({ ...user, ...updatedData });
    // showNotification('Profile updated successfully');
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'personal':
        return <PersonalInfo user={user} onUpdate={updateUser} currentTheme={currentTheme} showNotification={showNotification} />;
      case 'orders':
        return <OrderHistory orders={orders} currentTheme={currentTheme} />;
      case 'addresses':
        return <AddressBook addresses={addresses} setAddresses={setAddresses} currentTheme={currentTheme} showNotification={showNotification} />;
      case 'wishlist':
        return <Wishlist wishlist={wishlist} setWishlist={setWishlist} currentTheme={currentTheme} showNotification={showNotification} />;
      case 'activity':
        return <ActivityLog currentTheme={currentTheme} />;
      case 'security':
        return <SecuritySettings currentTheme={currentTheme} showNotification={showNotification} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if(user?.token){
      getCurrentUser();
    }
  }, [user])


  const stats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
    wishlistItems: wishlist.length,
    memberSince: user.joined
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader user={user} currentTheme={currentTheme} currentMood={currentMood} />
        
        <ProfileStats stats={stats} currentTheme={currentTheme} currentMood={currentMood} />
        
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} currentTheme={currentTheme} />
        
        <div className={`${currentTheme.card} ${currentMood} p-6 mt-6`}>
          {renderTabContent()}
        </div>

        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
            <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
              <Check size={20} />
              <span>{notification.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;