import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

// Rate limiting storage (in-memory for simplicity)
const rateLimitMap = new Map()

// Rate limiting function
function isRateLimited(ip: string) {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 5
  
  // Clean up old entries
  for (const [key, data] of rateLimitMap.entries()) {
    if (now - data.firstRequest > windowMs) {
      rateLimitMap.delete(key)
    }
  }
  
  const userData = rateLimitMap.get(ip)
  
  if (!userData) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now })
    return false
  }
  
  if (now - userData.firstRequest > windowMs) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now })
    return false
  }
  
  userData.count++
  return userData.count > maxRequests
}

// Email validation
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1'

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many signup attempts, please try again later.'
        },
        { status: 429 }
      )
    }

    // Get email from request body
    const { email } = await request.json()

    // Validate email
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email is required'
        },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide a valid email address'
        },
        { status: 400 }
      )
    }

    if (email.length > 255) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email is too long'
        },
        { status: 400 }
      )
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()
    const userAgent = request.headers.get('user-agent') || ''

    // Insert email into database
    const query = `
      INSERT INTO email_signups (email, ip_address, user_agent, created_at) 
      VALUES ($1, $2, $3, NOW()) 
      RETURNING id, email, created_at
    `
    
    const result = await pool.query(query, [normalizedEmail, ip, userAgent])
    const signup = result.rows[0]

    console.log(`New signup: ${normalizedEmail} from ${ip}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined the waitlist!',
        data: {
          id: signup.id,
          email: signup.email,
          joinedAt: signup.created_at
        }
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Signup error:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    })

    // Handle duplicate email
    if (error.code === '23505') {
      return NextResponse.json(
        {
          success: false,
          message: 'This email is already on the waitlist!'
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.'
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}