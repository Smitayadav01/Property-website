import express from 'express';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// In-memory property storage
let properties = [
  {
    id: '1',
    title: '5BHK Apartment',
    location: 'Vasai',
    price: '10.0 Cr',
    type: 'Apartment',
    bedrooms: 5,
    bathrooms: 3,
    area: '1400 sq ft',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    status: 'For sale',
    description: 'Luxurious 5BHK apartment with modern amenities in prime Vasai location.',
    amenities: ['Parking', 'Security', 'Gym', 'Swimming Pool'],
    createdAt: new Date()
  },
  {
    id: '2',
    title: '3BHK Villa',
    location: 'Virar',
    price: '8.5 Cr',
    type: 'Villa',
    bedrooms: 3,
    bathrooms: 3,
    area: '1800 sq ft',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    status: 'For sale',
    description: 'Beautiful villa with garden and premium finishes in Virar.',
    amenities: ['Garden', 'Parking', 'Security', 'Power Backup'],
    createdAt: new Date()
  },
  {
    id: '3',
    title: '2BHK Flat',
    location: 'Palghar',
    price: '4.2 Cr',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: '900 sq ft',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    status: 'For sale',
    description: 'Cozy 2BHK flat perfect for small families in Palghar.',
    amenities: ['Lift', 'Parking', 'Security'],
    createdAt: new Date()
  }
];

// Get all properties
router.get('/', (req, res) => {
  res.json(properties);
});

// Get property by ID
router.get('/:id', (req, res) => {
  const property = properties.find(p => p.id === req.params.id);
  if (!property) {
    return res.status(404).json({ message: 'Property not found' });
  }
  res.json(property);
});

// Add property (admin only)
router.post('/', authenticateAdmin, (req, res) => {
  try {
    // Set default image if none provided
    const defaultImage = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';
    
    const property = {
      id: Date.now().toString(),
      ...req.body,
      image: req.body.image || defaultImage,
      createdAt: new Date()
    };
    properties.push(property);
    res.status(201).json({ message: 'Property added successfully', property });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update property (admin only)
router.put('/:id', authenticateAdmin, (req, res) => {
  try {
    const index = properties.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Set default image if none provided during update
    const defaultImage = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';
    const updatedData = {
      ...req.body,
      image: req.body.image || defaultImage
    };
    
    properties[index] = { ...properties[index], ...updatedData };
    res.json({ message: 'Property updated successfully', property: properties[index] });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete property (admin only)
router.delete('/:id', authenticateAdmin, (req, res) => {
  try {
    const index = properties.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    properties.splice(index, 1);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;