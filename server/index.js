import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/properties.js';
import wishlistRoutes from './routes/wishlist.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://vasaiproperty.co.in',
    'https://www.vasaiproperty.co.in',
    'http://vasaiproperty.co.in',
    'http://www.vasaiproperty.co.in'
  ],
  credentials: true
}));
// ✅ CORS Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// ✅ Handle preflight
app.options('*', cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Vasai Properties API Server Running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});