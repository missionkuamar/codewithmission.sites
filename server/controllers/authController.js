import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

// Verify Google token and get user info
const verifyGoogleToken = async (credential) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      emailVerified: payload.email_verified
    };
  } catch (error) {
    console.error('Google token verification failed:', error);
    throw new Error('Invalid Google token');
  }
};

// Generate a unique username from email
const generateUsername = (email) => {
  const baseUsername = email.split('@')[0];
  // Remove special characters and spaces
  const cleanUsername = baseUsername.replace(/[^a-zA-Z0-9]/g, '');
  // Add random number to ensure uniqueness if needed
  return `${cleanUsername}_${Math.floor(Math.random() * 10000)}`;
};

// Google OAuth - Handles both Login and Registration
export const googleAuthCallback = async (req, res) => {
  try {
    const { credential } = req.body;
    
    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential is required'
      });
    }

    // Verify the Google token
    const googleUser = await verifyGoogleToken(credential);
    
    // Check if user exists by email
    let user = await User.findOne({ email: googleUser.email });

    if (user) {
      // LOGIN EXISTING USER
      console.log(`Existing user logged in: ${user.email}`);
      
      // Update user info if needed
      user.lastLogin = Date.now();
      user.name = googleUser.name;
      user.picture = googleUser.picture;
      
      // If user registered with email/password before, link Google account
      if (!user.googleId) {
        user.googleId = googleUser.googleId;
        user.provider = 'google';
      }
      
      await user.save();
      
      // Generate JWT token
      const token = generateToken(user._id);
      
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          username: user.username,
          role: user.role
        }
      });
    } else {
      // REGISTER NEW USER WITH GOOGLE
      console.log(`New user registering with Google: ${googleUser.email}`);
      
      // Generate a unique username
      let username = generateUsername(googleUser.email);
      let usernameExists = await User.findOne({ username });
      
      // Ensure username is unique
      while (usernameExists) {
        username = generateUsername(googleUser.email);
        usernameExists = await User.findOne({ username });
      }
      
      // Create new user
      user = await User.create({
        googleId: googleUser.googleId,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        username: username,
        emailVerified: googleUser.emailVerified,
        provider: 'google',
        lastLogin: Date.now()
      });
      
      // Generate JWT token for new user
      const token = generateToken(user._id);
      
      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          username: user.username,
          role: user.role
        }
      });
    }
  } catch (error) {
    console.error('Google auth error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
        error: 'Duplicate email'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-__v -password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        username: user.username,
        role: user.role,
        provider: user.provider
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Logout
export const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

// Optional: Link Google account to existing email/password user
export const linkGoogleAccount = async (req, res) => {
  try {
    const { credential, email, password } = req.body;
    const googleUser = await verifyGoogleToken(credential);
    
    // Find existing user by email and password
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with provided credentials'
      });
    }
    
    // Link Google account
    user.googleId = googleUser.googleId;
    user.provider = 'google';
    await user.save();
    
    res.json({
      success: true,
      message: 'Google account linked successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to link Google account',
      error: error.message
    });
  }
};