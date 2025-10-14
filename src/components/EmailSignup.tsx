'use client'

import { useState } from 'react'

interface MessageProps {
  message: string
  type: 'success' | 'error'
  visible: boolean
}

const Message = ({ message, type, visible }: MessageProps) => {
  if (!message) return null
  
  return (
    <div className={`message ${type} ${visible ? 'visible' : ''}`}>
      {message}
    </div>
  )
}

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [focused, setFocused] = useState(false)
  const [messageVisible, setMessageVisible] = useState(false)
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg)
    setMessageType(type)
    setMessageVisible(true)
    setTimeout(() => {
      setMessageVisible(false)
      setTimeout(() => {
        setMessage('')
      }, 300)
    }, 5000)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      showMessage('Please enter your email address', 'error')
      return
    }
    
    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address', 'error')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        showMessage('🎉 Welcome to the waitlist! We\'ll be in touch soon.', 'success')
        setEmail('')
        setFocused(false)
      } else {
        const errorData = await response.json()
        showMessage(errorData.message || 'Something went wrong. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Signup error:', error)
      showMessage('Network error. Please check your connection and try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <>
      <Message message={message} type={messageType} visible={messageVisible} />
      <span id="join" className="anchor"></span>
      <div className="join-content">
        <h1 className="join-heading">
          Join the Waitlist
        </h1>
        <p className="join-text">
          Join hundreds of founders waiting to unlock smarter, faster fundraising.
          You&apos;ll also gain access to our newsletter.
        </p>
        <form className="join-email" onSubmit={handleSubmit}>
          <input
            id="join-email"
            type="email"
            name="email"
            placeholder='Enter your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={(e) => setFocused(e.target.value !== '')}
            disabled={isSubmitting}
            required
          />

          <button 
            type="submit" 
            className={`join-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Joining...' : 'Join'}
          </button>
        </form>
      </div>
    </>
  )
}