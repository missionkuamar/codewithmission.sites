// services/profileApi.js - Fake Profile API Service
export const profileApi = {
  getUser: () => ({
    id: 1001,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    coverImage: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200',
    joined: 'January 15, 2023',
    bio: 'Full-stack developer and tech enthusiast. Love building amazing web experiences.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    socialLinks: {
      twitter: '@johndoe',
      github: 'johndoe',
      linkedin: 'johndoe'
    }
  }),

  getOrders: () => [
    { id: 'ORD-001', date: '2024-02-15', total: 249.99, status: 'delivered', items: 3, paymentMethod: 'Credit Card' },
    { id: 'ORD-002', date: '2024-02-10', total: 149.99, status: 'shipped', items: 2, paymentMethod: 'PayPal' },
    { id: 'ORD-003', date: '2024-02-05', total: 399.99, status: 'processing', items: 4, paymentMethod: 'Apple Pay' },
    { id: 'ORD-004', date: '2024-01-28', total: 89.99, status: 'delivered', items: 1, paymentMethod: 'Credit Card' },
    { id: 'ORD-005', date: '2024-01-20', total: 199.99, status: 'delivered', items: 2, paymentMethod: 'PayPal' }
  ],

  getAddresses: () => [
    { id: 1, type: 'Home', name: 'John Doe', street: '123 Main St', city: 'San Francisco', state: 'CA', zipCode: '94105', country: 'USA', phone: '+1 (555) 123-4567', isDefault: true },
    { id: 2, type: 'Work', name: 'John Doe', street: '456 Market St', city: 'San Francisco', state: 'CA', zipCode: '94103', country: 'USA', phone: '+1 (555) 234-5678', isDefault: false }
  ],

  getWishlist: () => [
    { id: 1, name: 'AI Analytics Dashboard', price: 49, originalPrice: 99, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200', category: 'AI/ML', added: '2024-02-10' },
    { id: 2, name: 'E-Commerce Platform', price: 79, originalPrice: 149, image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=200', category: 'E-commerce', added: '2024-02-12' },
    { id: 3, name: 'Blockchain Wallet', price: 199, originalPrice: 299, image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200', category: 'Blockchain', added: '2024-02-15' }
  ]
};

