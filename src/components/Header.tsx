'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }
  
  const scrollToJoin = () => {
    if (pathname !== '/') {
      // Navigate to home page first, then scroll
      window.location.href = '/#join'
    } else {
      const joinSection = document.getElementById('join')
      if (joinSection) {
        joinSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
    closeMobileMenu()
  }
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="title">
          <div className="logo">
            <Image src="/public/images/icon.png" alt="Supernova logo" width={25} height={25} />
          </div>
          <div className="company-name">
            <p>Supernova</p>
          </div>
        </div>
        
        <div className={`navbar ${mobileMenuOpen ? 'active' : ''}`}>
          <div>
            <Link 
              href="/"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </div>
          <div>
            <Link 
              href="/community"
              className={`nav-link ${pathname === '/community' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Events
            </Link>
          </div>
          {mobileMenuOpen && (
            <div className="mobile-join">
              <span onClick={scrollToJoin}>
                Join Waitlist
              </span>
            </div>
          )}
        </div>
        
        <div className="join">
          <span className="btn-join" onClick={scrollToJoin}>
            Join Waitlist
          </span>
        </div>
        
        <button 
          className="mobile-menu"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      {mobileMenuOpen && (
        <div 
          className="mobile-backdrop" 
          onClick={closeMobileMenu}
          style={{
            position: 'fixed',
            top: '170px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: -1,
          }}
        />
      )}
    </header>
  )
}