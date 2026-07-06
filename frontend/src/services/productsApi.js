// services/productsApi.js - Product API Service
export const productsApi = {
  getProductById: (id) => {
    const products = {
      1: {
        id: 1,
        title: "AI-Powered Analytics Dashboard",
        description: "Real-time analytics platform with machine learning insights, predictive analytics, and customizable reports for enterprise clients.",
        longDescription: "This enterprise-grade analytics dashboard uses TensorFlow.js for real-time predictions and D3.js for stunning visualizations. It includes user authentication, role-based access, custom report generation, and export capabilities in multiple formats. Perfect for businesses looking to leverage data-driven decision making.",
        price: 49,
        originalPrice: 99,
        discount: 50,
        category: "AI/ML",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        images: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"
        ],
        rating: 4.8,
        reviews: 124,
        inStock: true,
        featured: true,
        technologies: ["React", "TensorFlow", "D3.js", "Python", "Node.js", "MongoDB"],
        features: [
          "Real-time data visualization",
          "AI-powered predictions",
          "Custom report generation",
          "Role-based access control",
          "Export to multiple formats",
          "Automated alerts and notifications"
        ],
        sampleReviews: [
          { author: "John Smith", rating: 5, date: "2024-02-15", comment: "Amazing product! The AI insights are incredibly accurate.", helpful: 45 },
          { author: "Sarah Johnson", rating: 4, date: "2024-02-10", comment: "Great dashboard, very intuitive interface.", helpful: 32 },
          { author: "Mike Chen", rating: 5, date: "2024-02-05", comment: "Best analytics tool I've ever used!", helpful: 67 }
        ]
      },
      2: {
        id: 2,
        title: "E-Commerce Platform",
        description: "Full-featured e-commerce solution with payment integration, inventory management, and real-time order tracking.",
        longDescription: "Complete e-commerce solution with cart management, secure checkout, payment integration (Stripe, PayPal), inventory tracking, order management, customer reviews, and admin dashboard. Includes email notifications and analytics.",
        price: 79,
        originalPrice: 149,
        discount: 47,
        category: "E-commerce",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600",
        images: [
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=600",
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400"
        ],
        rating: 4.9,
        reviews: 89,
        inStock: true,
        featured: true,
        technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redis", "Docker"],
        features: [
          "Payment integration",
          "Inventory management",
          "Order tracking",
          "Customer reviews",
          "Admin dashboard",
          "Email notifications"
        ],
        sampleReviews: [
          { author: "Emily Brown", rating: 5, date: "2024-02-12", comment: "Launched my store in days!", helpful: 56 }
        ]
      }
    };
    return products[id] || null;
  },

  getRelatedProducts: (currentId) => {
    const allProducts = [
      { id: 1, title: "AI Analytics Dashboard", price: 49, category: "AI/ML", rating: 4.8, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300" },
      { id: 2, title: "E-Commerce Platform", price: 79, category: "E-commerce", rating: 4.9, image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=300" },
      { id: 3, title: "Social Media App", price: 99, category: "Mobile App", rating: 4.7, image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300" },
      { id: 4, title: "Blockchain Wallet", price: 199, category: "Blockchain", rating: 4.9, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300" },
      { id: 5, title: "Healthcare System", price: 149, category: "Healthcare", rating: 4.8, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300" },
      { id: 6, title: "Smart Home IoT", price: 89, category: "IoT", rating: 4.7, image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=300" }
    ];
    return allProducts.filter(p => p.id !== currentId).slice(0, 4);
  }
};