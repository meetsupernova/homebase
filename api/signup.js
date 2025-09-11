import { Pool } from 'pg';

// Rate limiting storage (in-memory for simplicity)
const rateLimitMap = new Map();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Rate limiting function
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;
  
  // Clean up old entries
  for (const [key, data] of rateLimitMap.entries()) {
    if (now - data.firstRequest > windowMs) {
      rateLimitMap.delete(key);
    }
  }
  
  const userData = rateLimitMap.get(ip);
  
  if (!userData) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }
  
  if (now - userData.firstRequest > windowMs) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }
  
  userData.count++;
  return userData.count > maxRequests;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Main handler function
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Get client IP for rate limiting - FIXED VERSION
    let clientIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   '127.0.0.1';

    // Handle multiple IPs (take the first one)
    if (typeof clientIP === 'string' && clientIP.includes(',')) {
      clientIP = clientIP.split(',')[0].trim();
    }

    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return res.status(429).json({
        success: false,
        message: 'Too many signup attempts, please try again later.'
      });
    }

    // Get email from request body
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (email.length > 255) {
      return res.status(400).json({
        success: false,
        message: 'Email is too long'
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    const userAgent = req.headers['user-agent'] || '';

    // Insert email into database
    const query = `
      INSERT INTO email_signups (email, ip_address, user_agent, created_at) 
      VALUES ($1, $2, $3, NOW()) 
      RETURNING id, email, created_at
    `;
    
    const result = await pool.query(query, [normalizedEmail, clientIP, userAgent]);
    const signup = result.rows[0];

    console.log(`New signup: ${normalizedEmail} from ${clientIP}`);

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
    // ENHANCED ERROR LOGGING
    console.error('Detailed signup error:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
      envCheck: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV
      }
    });

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