import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate backup codes
const generateBackupCodes = () => {
  const codes = [];
  for (let i = 0; i < 10; i++) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    codes.push({ code, used: false });
  }
  return codes;
};

// Setup 2FA
export const setup2FA = async (req, res) => {
  try {
    console.log('Setup 2FA called for user:', req.user.userId);
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.twoFactorEnabled) {
      return res.status(400).json({
        success: false,
        message: '2FA is already enabled'
      });
    }
    
    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `AuthApp:${user.email}`,
      length: 20
    });
    
    // Generate QR code as data URL
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
    
    // Save secret temporarily
    user.twoFactorSecret = secret.base32;
    await user.save();
    
    res.json({
      success: true,
      secret: secret.base32,
      qrCode: qrCodeUrl,
      message: 'Scan QR code with Google Authenticator'
    });
  } catch (error) {
    console.error('2FA setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to setup 2FA',
      error: error.message
    });
  }
};

// Verify and enable 2FA
export const verifyAndEnable2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({
        success: false,
        message: '2FA not initialized'
      });
    }
    
    // Verify token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2
    });
    
    if (!verified) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }
    
    // Generate backup codes
    const backupCodes = generateBackupCodes();
    
    // Enable 2FA
    user.twoFactorEnabled = true;
    user.backupCodes = backupCodes;
    await user.save();
    
    res.json({
      success: true,
      message: '2FA enabled successfully',
      backupCodes: backupCodes.map(bc => bc.code)
    });
  } catch (error) {
    console.error('2FA verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify 2FA',
      error: error.message
    });
  }
};

// Disable 2FA
export const disable2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user || !user.twoFactorEnabled) {
      return res.status(400).json({
        success: false,
        message: '2FA is not enabled'
      });
    }
    
    // Verify token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2
    });
    
    if (!verified) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }
    
    // Disable 2FA
    user.twoFactorEnabled = false;
    user.twoFactorSecret = null;
    user.backupCodes = [];
    await user.save();
    
    res.json({
      success: true,
      message: '2FA disabled successfully'
    });
  } catch (error) {
    console.error('Disable 2FA error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to disable 2FA',
      error: error.message
    });
  }
};

// Verify 2FA during login
export const verify2FALogin = async (req, res) => {
  try {
    const { userId, token, backupCode } = req.body;
    
    console.log('Verifying 2FA for user:', userId);
    
    const user = await User.findById(userId);
    if (!user || !user.twoFactorEnabled) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request'
      });
    }
    
    // Check if account is locked
    if (user.isLocked && user.isLocked()) {
      return res.status(401).json({
        success: false,
        message: 'Account is locked. Please try again later.'
      });
    }
    
    let isValid = false;
    let usedBackupCode = false;
    
    // Check backup code
    if (backupCode) {
      const backupCodeIndex = user.backupCodes.findIndex(
        bc => bc.code === backupCode && !bc.used
      );
      if (backupCodeIndex !== -1) {
        isValid = true;
        user.backupCodes[backupCodeIndex].used = true;
        usedBackupCode = true;
      }
    } 
    // Check TOTP token
    else if (token) {
      isValid = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: token,
        window: 2
      });
    }
    
    if (!isValid) {
      // Increment failed attempts
      user.loginAttempts += 1;
      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // Lock for 30 min
      }
      await user.save();
      
      return res.status(401).json({
        success: false,
        message: 'Invalid 2FA code',
        attemptsLeft: 5 - user.loginAttempts
      });
    }
    
    // Reset login attempts on success
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();
    
    // Generate new JWT token
    const generateToken = (await import('../utils/generateToken.js')).default;
    const jwtToken = generateToken(user._id);
    
    res.json({
      success: true,
      message: usedBackupCode ? 'Login successful (backup code used)' : 'Login successful',
      token: jwtToken,
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
    console.error('2FA login error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify 2FA',
      error: error.message
    });
  }
};

// Regenerate backup codes
export const regenerateBackupCodes = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user || !user.twoFactorEnabled) {
      return res.status(400).json({
        success: false,
        message: '2FA is not enabled'
      });
    }
    
    // Verify 2FA token
    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2
    });
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }
    
    // Generate new backup codes
    const newBackupCodes = generateBackupCodes();
    user.backupCodes = newBackupCodes;
    await user.save();
    
    res.json({
      success: true,
      message: 'New backup codes generated',
      backupCodes: newBackupCodes.map(bc => bc.code)
    });
  } catch (error) {
    console.error('Regenerate backup codes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to regenerate backup codes',
      error: error.message
    });
  }
};