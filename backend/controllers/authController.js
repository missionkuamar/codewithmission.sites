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
   // console.log('Verifying Google token...');
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
   // console.log('Google token verified for:', payload.email);
    
    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      emailVerified: payload.email_verified
    };
  } catch (error) {
    console.error('Google token verification failed:', error.message);
    throw new Error('Invalid Google token: ' + error.message);
  }
};

// Generate a unique username from email
const generateUsername = (email) => {
  const baseUsername = email.split('@')[0];
  const cleanUsername = baseUsername.replace(/[^a-zA-Z0-9]/g, '');
  return `${cleanUsername}_${Math.floor(Math.random() * 10000)}`;
};

// Google OAuth - Handles both Login and Registration
export const googleAuthCallback = async (req, res) => {
  //console.log('Google auth callback received');
  
  try {
    const { credential } = req.body;
    ////console.log('Credential received:', credential ? 'Yes' : 'No');
    
    if (!credential) {
      console.log('No credential provided');
      return res.status(400).json({
        success: false,
        message: 'Google credential is required'
      });
    }

    // Verify the Google token
    let googleUser;
    try {
      googleUser = await verifyGoogleToken(credential);
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid Google token',
        error: error.message
      });
    }
    
  //  // console.log('Google user data:', {
  //     email: googleUser.email,
  //     name: googleUser.name,
  //     googleId: googleUser.googleId
  //   });

    // Check if user exists by email
    let user = await User.findOne({ email: googleUser.email });

    if (user) {
      // LOGIN EXISTING USER
      //console.log(`✅ Existing user logged in: ${user.email}`);
      
      // Update user info if needed
      user.lastLogin = Date.now();
      user.name = googleUser.name;
      user.picture = googleUser.picture;
      
      if (!user.googleId) {
        user.googleId = googleUser.googleId;
        user.provider = 'google';
      }
      
      await user.save();
      
      const token = generateToken(user._id);
      
     // console.log('✅ Token generated for existing user');
      
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
          role: user.role,
          isPaid: user.isPaid || false,
          purchasedCodes: user.purchasedCodes || []
        }
      });
    } else {
      // REGISTER NEW USER WITH GOOGLE
      //console.log(`🆕 New user registering with Google: ${googleUser.email}`);
      
      let username = generateUsername(googleUser.email);
      let usernameExists = await User.findOne({ username });
      
      while (usernameExists) {
        username = generateUsername(googleUser.email);
        usernameExists = await User.findOne({ username });
      }
      
      user = await User.create({
        googleId: googleUser.googleId,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        username: username,
        emailVerified: googleUser.emailVerified || false,
        provider: 'google',
        lastLogin: Date.now(),
        role: 'user',
        isPaid: false,
        purchasedCodes: []
      });
      
     // console.log('✅ New user created:', user.email);
      
      const token = generateToken(user._id);
      
      //console.log('✅ Token generated for new user');
      
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
          role: user.role,
          isPaid: user.isPaid || false,
          purchasedCodes: user.purchasedCodes || []
        }
      });
    }
  } catch (error) {
    console.error('❌ Google auth error:', error.message);
  //  console.error('Stack:', error.stack);
    
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
 // console.log('Get current user:', req.user?._id);
  
  try {
    const user = await User.findById(req.user._id).select('-__v');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
 //   console.log('✅ User found:', user.email);
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        username: user.username,
        role: user.role,
        provider: user.provider,
        isPaid: user.isPaid || false,
        purchasedCodes: user.purchasedCodes || []
      }
    });
  } catch (error) {
    console.error('Get current user error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Logout
export const logout = (req, res) => {
  console.log('User logged out:', req.user?.email);
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};