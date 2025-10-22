'use client'
import EmailSignup from '@/components/EmailSignup'
import DescriptionSection from '@/components/DescriptionSection'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Image from 'next/image'
import './landing/landing-page.css'
import '@/components/footer.css'

export default function HomePage() {
  const scrollToEvents = () => {
  if (window.location.pathname === '/') {
    window.location.href = '/community#event'
  } else if (window.location.pathname === '/community') {
    const joinSection = document.getElementById('event')
    if (joinSection) {
      joinSection.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    window.location.href = '/community#event'
  }
}

  return (
    <main>
      {/* Hero Section */}
      <AnimatedSection className="hero">
        <h1 className="hero-heading" data-animate>
          Supercharge your
        </h1>
        <h2 className="hero-sub" data-animate>
          Non-VC Funding
        </h2>
        <p className="hero-text" data-animate>
          Every founder&apos;s dream deserves a chance. We help these dreams 
          come true by intelligently matching them with non-VC funding.
        </p>
        <div className="home" data-animate>
          <Image 
            className="home-img" 
            src="/images/landing/home-img.png" 
            alt="Supernova dashboard preview" 
            width={2100} 
            height={1800}
            priority
          />
          <div className="home-glow"></div>
        </div>
      </AnimatedSection>
      
      <EmailSignup />
      <DescriptionSection />
      <AnimatedSection className="events">
        <h1 className="events-heading" data-animate>
          Community Events
        </h1>
        <div className="events-section" data-animate>
          <div className="events-left">
            <div className="events-img" data-animate>
              <Image src="/images/community/videocam.png" width={24} height={24} alt="Globe icon" />
            </div>
            <p className="events-head" data-animate>
              Find a Co-Founder Pitch Event
            </p>
            <p className="events-sub" data-animate>
              Helping startup founders build dream teams
            </p>
            <p className="events-desc" data-animate>
              We are hosting our very first virtual community event, where founders pitch 
              what they&apos;re building and connect with potential co-founders, early 
              team members, and collaborators. Whether you&apos;re looking for a technical 
              partner, a business lead, or just curious to join a startup from the 
              ground floor, this is where connections spark.
            </p>
            <button className="events-btn" onClick={scrollToEvents} data-animate>See upcoming events</button>
          </div>
          <div className="events-right" data-animate>
            <Image src="/images/landing/community-ex.png" width={500} height={327} alt="events-ex" className="events-ex"/>
          </div>
        </div>
      </AnimatedSection>
      <Footer />
    </main>
  )
}