// data/blogData.js
export const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: 2024 Trends",
    excerpt: "Explore the latest trends shaping web development in 2024, from AI integration to WebAssembly and beyond...",
    content: `<p>The web development landscape is evolving faster than ever...</p>`,
    category: "Web Development",
    tags: ["Web Development", "AI", "Trends", "2024", "Technology"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    author: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Full-stack developer with 8+ years of experience"
    },
    date: "2024-02-15",
    readTime: "5 min read",
    likes: 342,
    views: 2450,
    comments: 28,
    featured: true,
    trending: true
  },
  {
    id: 2,
    title: "Mastering React 18: Advanced Patterns",
    excerpt: "Deep dive into React 18 features including concurrent rendering, automatic batching, and new hooks...",
    content: `<p>React 18 introduced groundbreaking features...</p>`,
    category: "React",
    tags: ["React", "JavaScript", "Frontend", "Hooks", "Performance"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    author: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Full-stack developer with 8+ years of experience"
    },
    date: "2024-02-10",
    readTime: "8 min read",
    likes: 567,
    views: 3890,
    comments: 45,
    featured: true,
    trending: true
  },
  {
    id: 3,
    title: "Tailwind CSS Best Practices",
    excerpt: "Learn how to write cleaner, more maintainable Tailwind CSS code with these proven patterns and practices...",
    content: `<p>Tailwind CSS has revolutionized how we style web applications...</p>`,
    category: "CSS",
    tags: ["TailwindCSS", "CSS", "Design", "Frontend", "Styling"],
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800",
    author: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Full-stack developer with 8+ years of experience"
    },
    date: "2024-02-05",
    readTime: "6 min read",
    likes: 423,
    views: 2780,
    comments: 32,
    featured: false,
    trending: true
  },
  {
    id: 4,
    title: "Building Scalable APIs with Node.js",
    excerpt: "Architecture patterns and best practices for building production-ready Node.js APIs that scale...",
    content: `<p>Building scalable APIs requires careful planning...</p>`,
    category: "Backend",
    tags: ["Node.js", "API", "Backend", "JavaScript", "Database"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    author: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Full-stack developer with 8+ years of experience"
    },
    date: "2024-01-28",
    readTime: "7 min read",
    likes: 289,
    views: 1950,
    comments: 23,
    featured: false,
    trending: false
  },
  {
    id: 5,
    title: "TypeScript: From Zero to Hero",
    excerpt: "Complete guide to TypeScript - from basic types to advanced features like generics and decorators...",
    content: `<p>TypeScript has become the standard for large-scale JavaScript applications...</p>`,
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Programming", "Frontend", "Backend"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    author: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Full-stack developer with 8+ years of experience"
    },
    date: "2024-01-20",
    readTime: "10 min read",
    likes: 678,
    views: 4560,
    comments: 56,
    featured: true,
    trending: true
  },
  {
    id: 6,
    title: "UI/UX Design Principles for Developers",
    excerpt: "Essential design principles every developer should know to create beautiful, user-friendly interfaces...",
    content: `<p>Great developers understand design...</p>`,
    category: "Design",
    tags: ["UI/UX", "Design", "Frontend", "Accessibility", "CSS"],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800",
    author: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Full-stack developer with 8+ years of experience"
    },
    date: "2024-01-15",
    readTime: "6 min read",
    likes: 345,
    views: 2340,
    comments: 28,
    featured: false,
    trending: false
  },
  {
    id: 7,
    title: "Database Design Best Practices",
    excerpt: "Learn how to design efficient, scalable database schemas for your applications...",
    content: `<p>Good database design is crucial for application performance...</p>`,
    category: "Database",
    tags: ["Database", "SQL", "MongoDB", "Backend", "Architecture"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    author: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Full-stack developer with 8+ years of experience"
    },
    date: "2024-01-10",
    readTime: "9 min read",
    likes: 234,
    views: 1670,
    comments: 19,
    featured: false,
    trending: false
  },
  {
    id: 8,
    title: "DevOps for Frontend Developers",
    excerpt: "Essential DevOps concepts and tools every frontend developer should know...",
    content: `<p>Frontend developers increasingly need to understand DevOps practices...</p>`,
    category: "DevOps",
    tags: ["DevOps", "CI/CD", "Docker", "Cloud", "Deployment"],
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
    author: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Full-stack developer with 8+ years of experience"
    },
    date: "2024-01-05",
    readTime: "7 min read",
    likes: 198,
    views: 1430,
    comments: 15,
    featured: false,
    trending: false
  }
];

export const categories = ['all', ...new Set(blogPosts.map(post => post.category))];
export const allTags = [...new Set(blogPosts.flatMap(p => p.tags))];