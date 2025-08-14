import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/User.js';

const router = express.Router();

// JWT Secret (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Email transporter setup (using Gmail - user should configure their own)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your app password
  }
});

// Temporary store for verification codes (in production, use Redis)
const verificationCodes = new Map();

// Generate 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send verification email
async function sendVerificationEmail(email, code, name) {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'LocalShop <noreply@localshop.ph>',
    to: email,
    subject: 'Verify Your LocalShop Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Welcome to LocalShop, ${name}! 🛍️</h2>
        <p>Thanks for joining our marketplace community! To complete your registration, please use this verification code:</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <h1 style="color: #1e40af; font-size: 32px; margin: 0; letter-spacing: 4px;">${code}</h1>
        </div>
        
        <p>This code will expire in 10 minutes. If you didn't create an account, please ignore this email.</p>
        
        <p>Happy selling and shopping! 🎉</p>
        <p><strong>The LocalShop Team</strong></p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 Verification email sent to:', email);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
}

// POST /api/auth/signup - Initial signup (sends verification code)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email: email.toLowerCase() }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email or phone already exists' 
      });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    
    // Store verification data temporarily (expires in 10 minutes)
    const verificationKey = email.toLowerCase();
    verificationCodes.set(verificationKey, {
      code: verificationCode,
      userData: { name, email: email.toLowerCase(), phone, password },
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationCode, name);
    
    if (!emailSent) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send verification email. Please try again.' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Verification code sent to your email. Please check your inbox.',
      email: email.toLowerCase()
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during signup' 
    });
  }
});

// POST /api/auth/verify - Verify email and create account
router.post('/verify', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and verification code are required' 
      });
    }

    const verificationKey = email.toLowerCase();
    const verificationData = verificationCodes.get(verificationKey);

    if (!verificationData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Verification code expired or not found' 
      });
    }

    // Check if expired
    if (Date.now() > verificationData.expiresAt) {
      verificationCodes.delete(verificationKey);
      return res.status(400).json({ 
        success: false, 
        message: 'Verification code has expired' 
      });
    }

    // Check if code matches
    if (verificationData.code !== code.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid verification code' 
      });
    }

    // Create the user
    const { name, email: userEmail, phone, password } = verificationData.userData;
    
    const user = await User.create({
      name,
      email: userEmail,
      phone,
      password, // Will be hashed by pre-save middleware
      verified: true,
      verificationMethod: 'email'
    });

    // Clean up verification data
    verificationCodes.delete(verificationKey);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      success: true, 
      message: 'Account created successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified
      }
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during verification' 
    });
  }
});

// POST /api/auth/login - User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user and include password for comparison
    const user = await User.findByEmail(email);
    
    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // Update last active
    await user.updateActivity();

    res.json({ 
      success: true, 
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// POST /api/auth/resend - Resend verification code
router.post('/resend', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const verificationKey = email.toLowerCase();
    const existingData = verificationCodes.get(verificationKey);

    if (!existingData) {
      return res.status(400).json({ 
        success: false, 
        message: 'No pending verification found for this email' 
      });
    }

    // Generate new code
    const verificationCode = generateVerificationCode();
    existingData.code = verificationCode;
    existingData.expiresAt = Date.now() + 10 * 60 * 1000; // Reset expiry to 10 minutes

    // Send new verification email
    const emailSent = await sendVerificationEmail(email, verificationCode, existingData.userData.name);
    
    if (!emailSent) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send verification email. Please try again.' 
      });
    }

    res.json({ 
      success: true, 
      message: 'New verification code sent to your email!' 
    });

  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Middleware to verify JWT token
export function requireAuth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
}

export default router;
