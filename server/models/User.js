import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
    sparse: true  // Allows null values but maintains uniqueness
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    unique: true,
    sparse: true,  // Allows null/undefined values
    default: null
  },
  password: {
    type: String,
    default: null
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  provider: {
    type: String,
    enum: ['google', 'local'],
    default: 'google'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a compound index for better query performance
userSchema.index({ email: 1, provider: 1 });

const User = mongoose.model('User', userSchema);
export default User;