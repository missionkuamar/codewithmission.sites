// services/analyticsApi.js - Fake Analytics API Service
export const analyticsApi = {
  getData: (dateRange) => {
    return {
      overview: {
        totalRevenue: 45678,
        revenueGrowth: 23.5,
        totalOrders: 345,
        ordersGrowth: 12.8,
        totalUsers: 1234,
        usersGrowth: 15.2,
        conversionRate: 3.2,
        conversionGrowth: 0.5,
        avgOrderValue: 132.4,
        avgOrderGrowth: 8.2,
        bounceRate: 42.5,
        bounceRateChange: -3.2,
        sessionDuration: 185,
        sessionGrowth: 12.5
      },
      dailyData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        revenue: [3250, 4120, 3890, 5230, 6780, 8450, 4980],
        orders: [32, 41, 38, 52, 67, 84, 49],
        visitors: [820, 945, 890, 1120, 1450, 1780, 1020],
        conversionRate: [2.8, 3.1, 3.0, 3.4, 3.8, 4.2, 3.5]
      },
      topProducts: [
        { name: "AI Analytics Dashboard", sales: 89, revenue: 4361, growth: 15, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100" },
        { name: "E-Commerce Platform", sales: 67, revenue: 5293, growth: 22, image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=100" },
        { name: "Social Media App", sales: 45, revenue: 4455, growth: 8, image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=100" },
        { name: "Blockchain Wallet", sales: 34, revenue: 6766, growth: 45, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100" },
        { name: "Healthcare System", sales: 23, revenue: 3427, growth: -5, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100" }
      ],
      topCategories: [
        { name: "Web Development", percentage: 35, growth: 12, revenue: 15987, color: "from-blue-500 to-cyan-500" },
        { name: "AI/ML", percentage: 28, growth: 25, revenue: 12789, color: "from-purple-500 to-pink-500" },
        { name: "Mobile App", percentage: 22, growth: 8, revenue: 10045, color: "from-green-500 to-emerald-500" },
        { name: "Blockchain", percentage: 15, growth: 40, revenue: 6857, color: "from-orange-500 to-red-500" }
      ],
      trafficSources: [
        { source: "Direct", percentage: 35, change: 5, color: "from-blue-500 to-cyan-500" },
        { source: "Google Search", percentage: 28, change: -2, color: "from-purple-500 to-pink-500" },
        { source: "Social Media", percentage: 22, change: 8, color: "from-green-500 to-emerald-500" },
        { source: "Email", percentage: 10, change: 3, color: "from-yellow-500 to-orange-500" },
        { source: "Referral", percentage: 5, change: 1, color: "from-red-500 to-rose-500" }
      ],
      deviceBreakdown: {
        desktop: 65,
        mobile: 28,
        tablet: 7,
        desktopGrowth: 5,
        mobileGrowth: 12,
        tabletGrowth: -2
      },
      recentActivity: [
        { id: 1, type: "sale", user: "John Doe", amount: 249.99, product: "AI Analytics Dashboard", time: "2 minutes ago", status: "completed" },
        { id: 2, type: "signup", user: "Sarah Johnson", time: "15 minutes ago", status: "active" },
        { id: 3, type: "review", user: "Michael Chen", product: "E-Commerce Platform", rating: 5, time: "1 hour ago", status: "approved" },
        { id: 4, type: "sale", user: "Emily Rodriguez", amount: 199.99, product: "Blockchain Wallet", time: "2 hours ago", status: "completed" },
        { id: 5, type: "support", user: "David Kim", issue: "Payment Issue", time: "3 hours ago", status: "resolved" },
        { id: 6, type: "sale", user: "Lisa Wang", amount: 299.99, product: "AI Analytics Dashboard", time: "4 hours ago", status: "completed" }
      ]
    };
  }
};