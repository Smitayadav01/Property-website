import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendWelcomeEmail, sendAdminNotification } from '../config/email.js';

const router = express.Router();

// In-memory user storage (replace with database in production)
let users = [];

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email = '', phone, password } = req.body;

    // Check if user already exists by phone
    const existingUser = users.find(user => user.phone === phone);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password: hashedPassword,
      isAdmin: false,
      createdAt: new Date()
    };

    users.push(user);

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, phone: user.phone, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send welcome email to user if email provided
    if (email) {
      await sendWelcomeEmail(email, name);
    }

    // Notify admin
    await sendAdminNotification('new_user', { name, email, phone });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Find user by phone
    const user = users.find(user => user.phone === phone);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, phone: user.phone, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Login
router.post('/admin-login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Check if it's the admin phone number
    if (phone !== process.env.ADMIN_PHONE) {
      return res.status(400).json({ message: 'Invalid admin credentials' });
    }

    // Check if it's the admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json({ message: 'Invalid admin credentials' });
    }

    // Create admin user object
    const adminUser = {
      id: 'admin',
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      phone: process.env.ADMIN_PHONE,
      isAdmin: true
    };

    // Generate JWT
    const token = jwt.sign(
      { id: adminUser.id, email: adminUser.email, name: adminUser.name, phone: adminUser.phone, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      user: adminUser
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;