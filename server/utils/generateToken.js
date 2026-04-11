import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import RefreshToken from '../models/RefreshToken.js';

// Generate JWT access token
export const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Generate refresh token
export const generateRefreshToken = async (userId, deviceInfo = {}) => {
  // Generate a unique token string
  const tokenString = crypto.randomBytes(40).toString('hex');
  
  // Calculate expiry date (default: 30 days)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + (parseInt(process.env.JWT_REFRESH_EXPIRE) || 30));
  
  // Create refresh token in database
  const refreshToken = await RefreshToken.create({
    token: tokenString,
    user: userId,
    expiresAt,
    deviceInfo: {
      userAgent: deviceInfo.userAgent,
      ipAddress: deviceInfo.ipAddress,
    },
  });
  
  return refreshToken.token;
};

// Verify refresh token
export const verifyRefreshToken = async (tokenString, deviceInfo = {}) => {
  try {
    // Find token in database
    const refreshToken = await RefreshToken.findOne({ token: tokenString })
      .populate('user', '-password');
    
    if (!refreshToken) {
      throw new Error('Invalid refresh token');
    }
    
    // Check if token is revoked
    if (refreshToken.isRevoked) {
      throw new Error('Refresh token has been revoked');
    }
    
    // Check if token is expired
    if (refreshToken.isExpired()) {
      await refreshToken.revoke();
      throw new Error('Refresh token has expired');
    }
    
    // Update device info if provided
    if (deviceInfo.userAgent || deviceInfo.ipAddress) {
      refreshToken.deviceInfo = {
        ...refreshToken.deviceInfo,
        ...deviceInfo,
      };
      await refreshToken.save();
    }
    
    return refreshToken;
  } catch (error) {
    throw error;
  }
};

// Revoke refresh token
export const revokeRefreshToken = async (tokenString) => {
  const refreshToken = await RefreshToken.findOne({ token: tokenString });
  if (refreshToken) {
    await refreshToken.revoke();
  }
};

// Revoke all refresh tokens for a user
export const revokeAllUserTokens = async (userId) => {
  await RefreshToken.updateMany(
    { user: userId, isRevoked: false },
    { isRevoked: true }
  );
};

// Clean up expired tokens (can be run periodically)
export const cleanupExpiredTokens = async () => {
  const result = await RefreshToken.deleteMany({
    expiresAt: { $lt: new Date() }
  });
  return result;
};

// Generate both tokens
export const generateTokens = async (userId, deviceInfo = {}) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId, deviceInfo);
  
  return {
    accessToken,
    refreshToken,
  };
};

// Refresh access token using refresh token
export const refreshAccessToken = async (refreshTokenString, deviceInfo = {}) => {
  try {
    const refreshToken = await verifyRefreshToken(refreshTokenString, deviceInfo);
    const newAccessToken = generateAccessToken(refreshToken.user._id);
    
    return {
      accessToken: newAccessToken,
      user: refreshToken.user,
    };
  } catch (error) {
    throw error;
  }
};