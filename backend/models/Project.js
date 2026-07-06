// backend/models/Product.js
import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['github', 'live-demo', 'youtube', 'instagram', 'twitter', 'facebook', 'linkedin'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  }
});

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  isThumbnail: {
    type: Boolean,
    default: false
  }
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  mrp: {
    type: Number,
    default: 0,
    min: [0, 'MRP cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  category: {
    type: String,
    enum: ['web-development', 'mobile-app', 'e-commerce', 'ai-ml', 'blockchain', 'iot', 'cloud-services', 'design', 'other'],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  images: [imageSchema],
  thumbnail: {
    type: imageSchema,
    required: true
  },
  type: {
    type: String,
    enum: ['single', 'gallery'],
    default: 'gallery'
  },
  socialLinks: [socialLinkSchema],
  zipFile: {
    url: {
      type: String
    },
    publicId: {
      type: String
    },
    fileName: {
      type: String
    },
    fileSize: {
      type: Number
    }
  },
  liveDemoUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  purchasedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: true 
});

// Index for search
productSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);