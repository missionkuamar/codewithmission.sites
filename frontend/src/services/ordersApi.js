// services/ordersApi.js - Updated with More Orders
export const ordersApi = {
  getOrders: () => {
    const baseOrders = [
      {
        id: 'ORD-1001',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        date: '2024-02-20',
        total: 249.99,
        status: 'delivered',
        paymentMethod: 'Credit Card',
        trackingNumber: '1Z999AA10123456784',
        items: [
          { id: 1, name: 'AI Analytics Dashboard', price: 49, quantity: 2, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100' },
          { id: 2, name: 'E-Commerce Platform', price: 79, quantity: 1, image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=100' },
          { id: 3, name: 'Social Media Mobile App', price: 99, quantity: 1, image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=100' }
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA'
        },
        timeline: [
          { status: 'Order Placed', date: '2024-02-20 10:30:00', completed: true },
          { status: 'Payment Confirmed', date: '2024-02-20 10:35:00', completed: true },
          { status: 'Processing', date: '2024-02-20 11:00:00', completed: true },
          { status: 'Shipped', date: '2024-02-21 09:00:00', completed: true },
          { status: 'Delivered', date: '2024-02-22 14:30:00', completed: true }
        ]
      },
      {
        id: 'ORD-1002',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        date: '2024-02-18',
        total: 149.99,
        status: 'shipped',
        paymentMethod: 'PayPal',
        trackingNumber: '1Z999AA10123456785',
        items: [
          { id: 4, name: 'Healthcare Management System', price: 149, quantity: 1, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100' }
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA'
        },
        timeline: [
          { status: 'Order Placed', date: '2024-02-18 15:20:00', completed: true },
          { status: 'Payment Confirmed', date: '2024-02-18 15:25:00', completed: true },
          { status: 'Processing', date: '2024-02-18 16:00:00', completed: true },
          { status: 'Shipped', date: '2024-02-19 10:00:00', completed: true },
          { status: 'Delivered', date: '2024-02-21', completed: false }
        ]
      },
      {
        id: 'ORD-1003',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        date: '2024-02-15',
        total: 399.99,
        status: 'processing',
        paymentMethod: 'Apple Pay',
        items: [
          { id: 5, name: 'Blockchain Wallet', price: 199, quantity: 1, image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100' },
          { id: 6, name: 'Smart Home IoT Platform', price: 99, quantity: 2, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=100' }
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA'
        },
        timeline: [
          { status: 'Order Placed', date: '2024-02-15 09:15:00', completed: true },
          { status: 'Payment Confirmed', date: '2024-02-15 09:20:00', completed: true },
          { status: 'Processing', date: '2024-02-15 10:00:00', completed: false },
          { status: 'Shipped', date: 'Pending', completed: false },
          { status: 'Delivered', date: 'Pending', completed: false }
        ]
      },
      {
        id: 'ORD-1004',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        date: '2024-02-10',
        total: 89.99,
        status: 'delivered',
        paymentMethod: 'Credit Card',
        trackingNumber: '1Z999AA10123456786',
        items: [
          { id: 7, name: 'Portfolio Generator', price: 59, quantity: 1, image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=100' },
          { id: 8, name: 'Task Management System', price: 30, quantity: 1, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100' }
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA'
        },
        timeline: [
          { status: 'Order Placed', date: '2024-02-10 14:30:00', completed: true },
          { status: 'Payment Confirmed', date: '2024-02-10 14:35:00', completed: true },
          { status: 'Processing', date: '2024-02-10 15:00:00', completed: true },
          { status: 'Shipped', date: '2024-02-11 09:00:00', completed: true },
          { status: 'Delivered', date: '2024-02-12 11:00:00', completed: true }
        ]
      },
      {
        id: 'ORD-1005',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        date: '2024-02-05',
        total: 199.99,
        status: 'cancelled',
        paymentMethod: 'PayPal',
        items: [
          { id: 9, name: 'Video Streaming Platform', price: 199, quantity: 1, image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100' }
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA'
        },
        timeline: [
          { status: 'Order Placed', date: '2024-02-05 11:00:00', completed: true },
          { status: 'Payment Confirmed', date: '2024-02-05 11:05:00', completed: true },
          { status: 'Cancelled', date: '2024-02-05 12:00:00', completed: true }
        ]
      },
      {
        id: 'ORD-1006',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        date: '2024-02-01',
        total: 129.99,
        status: 'delivered',
        paymentMethod: 'Credit Card',
        trackingNumber: '1Z999AA10123456787',
        items: [
          { id: 10, name: 'CRM Software', price: 129, quantity: 1, image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=100' }
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA'
        },
        timeline: [
          { status: 'Order Placed', date: '2024-02-01 09:00:00', completed: true },
          { status: 'Payment Confirmed', date: '2024-02-01 09:05:00', completed: true },
          { status: 'Processing', date: '2024-02-01 10:00:00', completed: true },
          { status: 'Shipped', date: '2024-02-02 08:00:00', completed: true },
          { status: 'Delivered', date: '2024-02-03 12:00:00', completed: true }
        ]
      },
      {
        id: 'ORD-1007',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        date: '2024-01-28',
        total: 299.99,
        status: 'delivered',
        paymentMethod: 'Apple Pay',
        trackingNumber: '1Z999AA10123456788',
        items: [
          { id: 11, name: 'Learning Management System', price: 299, quantity: 1, image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=100' }
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA'
        },
        timeline: [
          { status: 'Order Placed', date: '2024-01-28 13:30:00', completed: true },
          { status: 'Payment Confirmed', date: '2024-01-28 13:35:00', completed: true },
          { status: 'Processing', date: '2024-01-28 14:00:00', completed: true },
          { status: 'Shipped', date: '2024-01-29 09:00:00', completed: true },
          { status: 'Delivered', date: '2024-01-30 15:00:00', completed: true }
        ]
      },
      {
        id: 'ORD-1008',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        date: '2024-01-25',
        total: 79.99,
        status: 'shipped',
        paymentMethod: 'PayPal',
        trackingNumber: '1Z999AA10123456789',
        items: [
          { id: 12, name: 'Chat Application', price: 79, quantity: 1, image: 'https://images.unsplash.com/photo-1611746873065-1e8d9f6e9b8f?w=100' }
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA'
        },
        timeline: [
          { status: 'Order Placed', date: '2024-01-25 16:00:00', completed: true },
          { status: 'Payment Confirmed', date: '2024-01-25 16:05:00', completed: true },
          { status: 'Processing', date: '2024-01-25 17:00:00', completed: true },
          { status: 'Shipped', date: '2024-01-26 10:00:00', completed: true },
          { status: 'Delivered', date: 'Pending', completed: false }
        ]
      }
    ];
    
    // Generate 12 more orders for pagination testing
    const additionalOrders = [];
    for (let i = 1009; i <= 1020; i++) {
      additionalOrders.push({
        id: `ORD-${i}`,
        customer: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        date: `2024-01-${25 - (i - 1008)}`,
        total: Math.floor(Math.random() * 300) + 50,
        status: ['delivered', 'shipped', 'processing', 'cancelled'][Math.floor(Math.random() * 4)],
        paymentMethod: ['Credit Card', 'PayPal', 'Apple Pay'][Math.floor(Math.random() * 3)],
        items: [
          { id: i, name: `Product ${i}`, price: 49, quantity: 1, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100' }
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA'
        },
        timeline: [
          { status: 'Order Placed', date: `2024-01-${25 - (i - 1008)} 10:00:00`, completed: true },
          { status: 'Payment Confirmed', date: `2024-01-${25 - (i - 1008)} 10:05:00`, completed: true },
          { status: 'Processing', date: `2024-01-${25 - (i - 1008)} 11:00:00`, completed: true }
        ]
      });
    }
    
    return [...baseOrders, ...additionalOrders];
  }
};