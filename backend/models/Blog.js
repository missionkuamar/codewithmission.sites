// models/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxLength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Web Development', 'React', 'JavaScript', 'TypeScript', 'Node.js', 'UI/UX Design', 'Database', 'DevOps', 'Security', 'AI/ML', 'Mobile Development', 'Other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    url: String,
    publicId: String
  },
  images: [{
    url: String,
    publicId: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  author: {
    name: {
      type: String,
      required: true
    },
    avatar: String,
    bio: String
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Generate slug from title - with proper error handling
blogSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    // Create slug from title
    let slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-') // Replace multiple - with single -
      .replace(/^-|-$/g, ''); // Remove leading/trailing -
    
    // Add random suffix if slug is empty
    if (!slug) {
      slug = 'post-' + Date.now();
    }
    
    this.slug = slug;
  }
  next();
});

// Add index for search
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text' });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;