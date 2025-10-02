'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  threshold = 0.1,
  delay = 200
}: AnimatedSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const element = elementRef.current // Copy to local variable
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )
    
    if (element) {
      observer.observe(element)
    }
    
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold])
  
  useEffect(() => {
    if (isVisible && elementRef.current) {
      const animatedElements = elementRef.current.querySelectorAll(
        '.hero-heading, .hero-text, .community, .hero2-heading, .hero2-text, .box, .event-head, .event-text, .session, .expect-head, .expect-text, .footer-heading, .footer-text1, .footer-text2, .footer-join'
      )
      
      animatedElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('slide-in')
        }, index * delay)
      })
      
      // Handle glow animation
      const glowElement = elementRef.current.querySelector('.home-glow')
      if (glowElement) {
        (glowElement as HTMLElement).style.animationPlayState = 'running'
      }
    }
  }, [isVisible, delay])
  
  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}