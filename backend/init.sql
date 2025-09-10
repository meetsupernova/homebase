-- Create database (run this first)
-- CREATE DATABASE supernova_db;

-- Connect to the database and run the following:

-- Create email_signups table
CREATE TABLE IF NOT EXISTS email_signups (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_signups_email ON email_signups(email);

-- Create index on created_at for analytics
CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at);

-- Optional: Create a view for analytics
CREATE OR REPLACE VIEW signup_stats AS
SELECT 
    DATE(created_at) as signup_date,
    COUNT(*) as daily_signups,
    COUNT(*) OVER (ORDER BY DATE(created_at)) as cumulative_signups
FROM email_signups 
GROUP BY DATE(created_at)
ORDER BY signup_date DESC;