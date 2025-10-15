'use client'

import Image from 'next/image'
import AnimatedSection from './AnimatedSection'

export default function Footer() {
  const scrollToJoin = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/#join'
    } else {
      const joinSection = document.getElementById('join')
      if (joinSection) {
        joinSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
  
  return (
    <footer>
      <section className="footer">
        <AnimatedSection className="footer-desc">
          <p className="footer-heading" data-animate>
            Ready to accelerate your funding?
          </p>
          <p className="footer-text1" data-animate>
            SUPERNOVA,
          </p>
          <p className="footer-text2" data-animate>
            BUILT FOR BUILDERS
          </p>
          <div className="footer-join" data-animate>
            <span className="btn-join" onClick={scrollToJoin}>
              Join our Waitlist
            </span>
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
  )
}