// services/supportApi.js - Fake Support API Service
export const supportApi = {
  getFaqs: () => [
    {
      id: 1,
      question: "How do I create an account?",
      answer: "Click on the 'Register' button in the top right corner, fill in your details, and verify your email address. It's completely free!",
      category: "Account",
      helpful: 245
    },
    {
      id: 2,
      question: "How can I reset my password?",
      answer: "Go to the login page, click 'Forgot Password', enter your email, and follow the instructions sent to your inbox.",
      category: "Account",
      helpful: 189
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.",
      category: "Payment",
      helpful: 312
    },
    {
      id: 4,
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Overnight delivery is also available.",
      category: "Shipping",
      helpful: 278
    },
    {
      id: 5,
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied, simply contact support for a full refund.",
      category: "Returns",
      helpful: 423
    },
    {
      id: 6,
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track it in your account dashboard.",
      category: "Orders",
      helpful: 567
    },
    {
      id: 7,
      question: "Can I change my order after placing it?",
      answer: "Orders can be modified within 1 hour of placement. Contact support immediately for any changes.",
      category: "Orders",
      helpful: 134
    },
    {
      id: 8,
      question: "How do I contact customer support?",
      answer: "You can reach us via live chat, email at support@example.com, or by submitting a ticket in this support center.",
      category: "Support",
      helpful: 456
    }
  ],

  getKnowledgeBase: () => [
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Learn the basics of using our platform",
      category: "Getting Started",
      articles: 5,
      icon: "Rocket"
    },
    {
      id: 2,
      title: "Account Management",
      description: "Manage your profile, security, and preferences",
      category: "Account",
      articles: 8,
      icon: "User"
    },
    {
      id: 3,
      title: "Payment & Billing",
      description: "Payment methods, invoices, and subscriptions",
      category: "Payment",
      articles: 6,
      icon: "CreditCard"
    },
    {
      id: 4,
      title: "Orders & Shipping",
      description: "Track orders, shipping options, and delivery",
      category: "Orders",
      articles: 7,
      icon: "Truck"
    },
    {
      id: 5,
      title: "Returns & Refunds",
      description: "Return policy, refund process, and exchanges",
      category: "Returns",
      articles: 4,
      icon: "RotateCcw"
    },
    {
      id: 6,
      title: "Technical Support",
      description: "Troubleshooting and technical issues",
      category: "Technical",
      articles: 9,
      icon: "Wrench"
    }
  ]
};  