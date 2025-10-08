'use client'

import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
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

export default function Footer_Newsletter() {
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
      <footer>
        <section className="footer">
          <AnimatedSection className="footer-desc">
            <p className="footer-heading">
              Stay in the loop
            </p>
            <p className="footer-text">
              Don't miss future events -- Join our newsletter and get
              notified when new sessions drop and startup insights.
            </p>
            <div className="footer-join">
              <form className="join-email" onSubmit={handleSubmit}>
                <input
                  id="footer-email"
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
                  {isSubmitting ? 'Subscribing...' : '+ Subscribe to newsletter'}
                </button>
              </form>
              <p className="join-text"> 
                No spam, just event and community updates and startup insights.
              </p>
            </div>
            <div className="extension"></div>
          </AnimatedSection>
          
          <div className="footer-imgs">
            <Image 
              src="/images/landing/footing-two.png" 
              className="footing-two"
              width={183}
              height={365}
              alt="Footer decoration"
            />
            <Image 
              src="/images/hexagon-circles.png" 
              className="footer-hex1"
              width={95}
              height={108}
              alt="Hexagon decoration"
            />
            <Image 
              src="/images/hexagon-circles.png" 
              className="footer-hex2"
              width={95}
              height={108}
              alt="Hexagon decoration"
            />
            <Image 
              src="/images/landing/footing-one.png" 
              className="footing-one"
              width={250}
              height={250}
              alt="Footer decoration"
            />
          </div>
        </section>
      </footer>
    </>
  )
}