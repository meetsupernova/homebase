/*
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/waitlist", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Schema + Model
const EmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
});
const Email = mongoose.model("Email", EmailSchema);

// Route to handle form submission
app.post("/join", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email is required" });

    const newEmail = new Email({ email });
    await newEmail.save();
    res.json({ msg: "Email saved successfully!" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
*/

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], // Add your Live Server port
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting - 5 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    error: 'Too many signup attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Email signup endpoint
app.post('/api/signup', 
  limiter,
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address')
      .isLength({ max: 255 })
      .withMessage('Email is too long')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email address',
          errors: errors.array()
        });
      }

      const { email } = req.body;
      const userAgent = req.get('User-Agent') || '';
      const ipAddress = req.ip || req.connection.remoteAddress;

      // Insert email into database
      const query = `
        INSERT INTO email_signups (email, ip_address, user_agent, created_at) 
        VALUES ($1, $2, $3, NOW()) 
        RETURNING id, email, created_at
      `;
      
      const result = await pool.query(query, [email, ipAddress, userAgent]);
      const signup = result.rows[0];

      console.log(`New signup: ${email} from ${ipAddress}`);

      res.status(201).json({
        success: true,
        message: 'Successfully joined the waitlist!',
        data: {
          id: signup.id,
          email: signup.email,
          joinedAt: signup.created_at
        }
      });

    } catch (error) {
      console.error('Signup error:', error);

      // Handle duplicate email
      if (error.code === '23505') { // PostgreSQL unique violation
        return res.status(409).json({
          success: false,
          message: 'This email is already on the waitlist!'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    }
  }
);

// Get signup count (optional - for admin dashboard)
app.get('/api/signups/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as count FROM email_signups');
    res.json({
      success: true,
      count: parseInt(result.rows[0].count)
    });
  } catch (error) {
    console.error('Count error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to get signup count'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Supernova backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});