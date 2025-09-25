'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

export default function DescriptionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const boxes = entry.target.querySelectorAll('.box')
          boxes.forEach((box, index) => {
            setTimeout(() => {
              box.classList.add('fade-in')
            }, index * 200)
          })
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])
  
  const boxData = [
    {
      number: '01',
      heading: 'Select your funding preferences',
      text: 'You set your own preferences for the types of opportunities you\'re looking for.',
      image: '/public/images/landing-page/one-img.png',
      className: 'box-1'
    },
    {
      number: '02',
      heading: 'Tell us about your setup',
      text: 'We learn about your business, stage, goals, and founder background in minutes.',
      image: '/public/images/landing-page/two-img.png',
      className: 'box-2'
    },
    {
      number: '03',
      heading: 'Get matched with opportunities',
      text: 'Supernova scans thousands of funding sources—grants, accelerators, pitch competitions—and filters the best ones for you.',
      image: '/public/images/landing-page/three-img.png',
      className: 'box-3'
    },
    {
      number: '04',
      heading: 'Search Entire Funding Database',
      text: 'Prefer to browse on your own? Dive into our full database of grants, accelerators, and pitch competitions—filter by your industry, traction level, or locations. Curiosity welcome.',
      image: '/public/images/landing-page/four-img.png',
      className: 'box-4'
    },
    {
      number: '05',
      heading: 'AI-Powered Application Support',
      text: 'No more blank pages. We\'ll help you write compelling applications, prep your pitch, and generate business docs that make you stand out.',
      image: '/public/images/landing-page/five-img.png',
      className: 'box-5'
    }
  ]
  
  return (
    <div className="description" ref={containerRef}>
      <h1 className="description-heading">
        How it works
      </h1>
      <div className="description-boxes">
        {boxData.map((box, index) => (
          <div
            key={index}
            className={`box ${box.className}`}
          >
            <div className="box-number">
              <Image 
                className="hexagon" 
                src="/images/hexagon-circles.png" 
                alt="hexagon background" 
                width={95} 
                height={108}
              />
              <p className="circle">
                {box.number}
              </p>
            </div>
            <div className="desc">
              <div>
                <h2 className="desc-heading">
                  {box.heading}
                </h2>
                <h3 className="desc-text">
                  {box.text}
                </h3>
              </div>
            </div>
            <div className="desc-img">
              <Image 
                src={box.image} 
                className={`${['one-img', 'two-img', 'three-img', 'four-img', 'five-img'][index]}`}
                width={800}
                height={600}
                alt={`Step ${box.number} illustration`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}