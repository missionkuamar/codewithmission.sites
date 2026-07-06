import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

import StatsCards from "../components/admin/StatsCards";
import DashboardTabs from "../components/admin/DashboardTabs";

import ProductsTab from "../components/admin/dashboard/products";
import OrdersTab from "../components/admin/OrdersTab";
import UsersTab from "../components/admin/UsersTab";
import AnalyticsTab from "../components/admin/AnalyticsTab";
import SettingsTab from "../components/admin/SettingsTab";
import BlogTab from "../components/admin/dashboard/blog/index";

const AdminDashboard = () => {
  const { currentTheme, currentMood } = useTheme();

  const [activeTab, setActiveTab] = useState("products");

  const stats = [
    {
      icon: "ShoppingBag",
      label: "Total Products",
      value: "24",
      change: "+12%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "Users",
      label: "Total Users",
      value: "1,234",
      change: "+18%",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "DollarSign",
      label: "Total Revenue",
      value: "$45,678",
      change: "+23%",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "TrendingUp",
      label: "Monthly Growth",
      value: "+23%",
      change: "+5%",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: "ShoppingCart",
      label: "Total Orders",
      value: "345",
      change: "+15%",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: "Star",
      label: "Avg. Rating",
      value: "4.8",
      change: "+0.3",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Admin{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>

            <p className="opacity-70 mt-2">
              Manage Products, Orders, Users, Blogs and Settings
            </p>
          </div>
        </div>

        {/* Stats */}
        <StatsCards
          stats={stats}
          currentTheme={currentTheme}
          currentMood={currentMood}
        />

        {/* Tabs */}
        <div className="overflow-x-auto mt-6">
          <DashboardTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentTheme={currentTheme}
          />
        </div>

        {/* Debug */}
        <div className="mt-4 text-sm">
          Current Tab : <b>{activeTab}</b>
        </div>

        {/* Content */}
        <div
          className={`${currentTheme.card} ${currentMood} p-6 rounded-xl mt-6`}
        >
          {activeTab === "products" && (
            <ProductsTab currentTheme={currentTheme} />
          )}

          {activeTab === "orders" && (
            <OrdersTab currentTheme={currentTheme} />
          )}

          {activeTab === "users" && (
            <UsersTab currentTheme={currentTheme} />
          )}

          {activeTab === "analytics" && (
            <AnalyticsTab currentTheme={currentTheme} />
          )}

          {activeTab === "settings" && (
            <SettingsTab currentTheme={currentTheme} />
          )}

          {activeTab === "blog" && (
            <BlogTab currentTheme={currentTheme} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;