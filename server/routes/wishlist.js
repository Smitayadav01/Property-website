import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { sendAdminNotification } from '../config/email.js';

const router = express.Router();

// In-memory wishlist storage
let wishlists = {};

// Get user wishlist
router.get('/', authenticateToken, (req, res) => {
  const userWishlist = wishlists[req.user.id] || [];
  res.json(userWishlist);
});

// Add to wishlist
router.post('/:propertyId', authenticateToken, async (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;
    
    if (!wishlists[userId]) {
      wishlists[userId] = [];
    }
    
    if (!wishlists[userId].includes(propertyId)) {
      wishlists[userId].push(propertyId);
      
      // Get property details for email
      const properties = (await import('./properties.js')).default;
      // This is a simplified approach - in real app, you'd import the properties array
      const propertyInfo = {
        title: 'Property',
        location: 'Vasai-Virar',
        price: 'Contact for price',
        type: 'Residential'
      };
      
      // Notify admin
      await sendAdminNotification('wishlist_update', {
        name: req.user.name,
        email: req.user.email,
        phone: 'N/A'
      }, propertyInfo);
    }
    
    res.json({ message: 'Added to wishlist successfully' });
  } catch (error) {
    console.error('Wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from wishlist
router.delete('/:propertyId', authenticateToken, (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;
    
    if (wishlists[userId]) {
      wishlists[userId] = wishlists[userId].filter(id => id !== propertyId);
    }
    
    res.json({ message: 'Removed from wishlist successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;