import EmailSignup from '@/components/EmailSignup'
import DescriptionSection from '@/components/DescriptionSection'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Image from 'next/image'
import './landing/landing-page.css'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <AnimatedSection className="hero">
        <h1 className="hero-heading">
          Smarter Funding for Early-Stage Founders
        </h1>
        <p className="hero-text">
          We&apos;re your AI co-pilot for fundraising - matching you with the 
          best fit grants, accelerators, and pitch opportunities, and 
          helping you actually win them.
        </p>
        <div className="home">
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
      <Footer />
    </main>
  )
}