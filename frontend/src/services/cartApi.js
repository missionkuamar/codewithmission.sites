// services/cartApi.js
export const cartApi = {
  getCartItems: () => {
    return [
      {
        id: 1,
        title: "AI-Powered Analytics Dashboard",
        price: 49,
        originalPrice: 99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200",
        category: "Web Development",
        inStock: true,
        seller: "TechSolutions Inc.",
        rating: 4.8,
        reviews: 124,
        badge: "Bestseller",
        discount: 50,
        shipping: "Free",
        delivery: "2-3 days"
      },
      {
        id: 2,
        title: "E-Commerce Platform",
        price: 79,
        originalPrice: 149,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=200",
        category: "E-commerce",
        inStock: true,
        seller: "ShopMaster Pro",
        rating: 4.9,
        reviews: 89,
        badge: "Editor's Choice",
        discount: 47,
        shipping: "Free",
        delivery: "3-4 days"
      },
      {
        id: 3,
        title: "Social Media Mobile App",
        price: 99,
        originalPrice: 199,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200",
        category: "Mobile App",
        inStock: true,
        seller: "AppFactory",
        rating: 4.7,
        reviews: 203,
        badge: "Trending",
        discount: 50,
        shipping: "$5.99",
        delivery: "5-7 days"
      }
    ];
  },
  
  getSavedItems: () => {
    return [
      {
        id: 4,
        title: "Healthcare Management System",
        price: 149,
        originalPrice: 249,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200",
        category: "Healthcare",
        rating: 4.8,
        savedDate: "2024-02-15"
      },
      {
        id: 5,
        title: "Smart Home IoT Platform",
        price: 89,
        originalPrice: 159,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=200",
        category: "IoT",
        rating: 4.7,
        savedDate: "2024-02-18"
      }
    ];
  },
  
  getRecommendations: () => {
    return [
      {
        id: 6,
        title: "DevOps Mastery Course",
        price: 299,
        originalPrice: 499,
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=200",
        category: "Education",
        rating: 4.9,
        reviews: 234,
        badge: "Limited Time"
      },
      {
        id: 7,
        title: "UI/UX Design Bundle",
        price: 199,
        originalPrice: 399,
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=200",
        category: "Design",
        rating: 4.8,
        reviews: 156,
        badge: "Popular"
      }
    ];
  }
};