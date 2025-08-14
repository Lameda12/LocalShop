import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'localshop-secret-key-2024';

// POST /api/auth/signup - Simple signup (no email verification)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required' 
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ email: email.toLowerCase() }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists with this email or phone' 
      });
    }

    // Create user directly (no email verification)
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      password, // Will be hashed by pre-save middleware
      verified: true, // Auto-verified for simplicity
      verificationMethod: 'email'
    });

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({ 
      success: true, 
      message: 'Account created successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        verified: user.verified
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message.includes('duplicate key') ? 'Email already exists' : 'Signup failed'
    });
  }
});

// POST /api/auth/login - Simple login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user
    const user = await User.findByEmail(email);
    
    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30d' });

    // Update last active
    user.lastActiveAt = new Date();
    await user.save();

    res.json({ 
      success: true, 
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        verified: user.verified
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed' 
    });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        verified: user.verified,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
});

// Middleware to verify JWT token
export function requireAuth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '') || 
                req.body.token || 
                req.query.token;

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Please login.' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token. Please login again.' 
    });
  }
}

export default router;
