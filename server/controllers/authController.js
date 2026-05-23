import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
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
  const cleanUsername = baseUsername.replace(/[^a-zA-Z0-9]/g, '');
  return `${cleanUsername}_${Math.floor(Math.random() * 10000)}`;
};

// Google OAuth - Handles both Login and Registration (WITH 2FA Support)
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
      
      if (!user.googleId) {
        user.googleId = googleUser.googleId;
        user.provider = 'google';
      }
      
      await user.save();
      
      // Check if 2FA is enabled
      if (user.twoFactorEnabled) {
        const tempToken = jwt.sign(
          { userId: user._id, twoFAPending: true },
          process.env.JWT_SECRET,
          { expiresIn: '5m' }
        );
        
        return res.json({
          success: true,
          requires2FA: true,
          tempToken,
          userId: user._id,
          message: '2FA verification required'
        });
      }
      
      // Normal login without 2FA
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
          role: user.role,
          twoFactorEnabled: user.twoFactorEnabled
        }
      });
    } else {
      // REGISTER NEW USER WITH GOOGLE
      console.log(`New user registering with Google: ${googleUser.email}`);
      
      // Generate a unique username
      let username = generateUsername(googleUser.email);
      let usernameExists = await User.findOne({ username });
      
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
        lastLogin: Date.now(),
        twoFactorEnabled: false // New users don't have 2FA enabled
      });
      
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
          role: user.role,
          twoFactorEnabled: false
        }
      });
    }
  } catch (error) {
    console.error('Google auth error:', error);
    
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

// Email/Password Login with 2FA Support
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(401).json({
        success: false,
        message: `Account locked. Try again after ${Math.ceil((user.lockUntil - Date.now()) / 60000)} minutes`
      });
    }
    
    // Check password (for email users)
    if (user.provider === 'local') {
      const bcrypt = await import('bcryptjs');
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        user.loginAttempts += 1;
        await user.save();
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    }
    
    // Reset login attempts on successful password verification
    user.loginAttempts = 0;
    await user.save();
    
    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      const tempToken = jwt.sign(
        { userId: user._id, twoFAPending: true },
        process.env.JWT_SECRET,
        { expiresIn: '5m' }
      );
      
      return res.json({
        success: true,
        requires2FA: true,
        tempToken,
        userId: user._id,
        message: '2FA verification required'
      });
    }
    
    // Normal login without 2FA
    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
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
        provider: user.provider,
        twoFactorEnabled: user.twoFactorEnabled
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
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

// Link Google account to existing email/password user
export const linkGoogleAccount = async (req, res) => {
  try {
    const { credential, email, password } = req.body;
    const googleUser = await verifyGoogleToken(credential);
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with provided credentials'
      });
    }
    
    // Verify password
    const bcrypt = await import('bcryptjs');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }
    
    // Link Google account
    user.googleId = googleUser.googleId;
    user.provider = 'google';
    user.picture = googleUser.picture;
    await user.save();
    
    res.json({
      success: true,
      message: 'Google account linked successfully'
    });
  } catch (error) {
    console.error('Link Google account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to link Google account',
      error: error.message
    });
  }
};