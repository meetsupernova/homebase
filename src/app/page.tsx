import EmailSignup from '@/components/EmailSignup'
import DescriptionSection from '@/components/DescriptionSection'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Image from 'next/image'
import './landing/landing-page.css'
import '@/components/footer.css'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <AnimatedSection className="hero">
        <h1 className="hero-heading">
          Supercharge your Non-VC Funding
        </h1>
        <p className="hero-text">
          Every founder&apos;s dream deserves a change. We help these dreams 
          come true by intelligently matching them with non-VC funding.
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