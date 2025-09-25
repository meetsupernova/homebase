import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Image from 'next/image'
import './community.css'

export const metadata = {
  title: 'Community Events - Supernova',
  description: 'Join our community events where funders and future teammates connect.',
}

export default function CommunityPage() {
  const communityBoxData = [
    {
      icon: '/public/images/community/lightbulb.png',
      heading: 'For Founders',
      text: 'Pitch your startup and meet co-founders, designers, engineers, and operators who can help you scale.',
      className: 'founders-box'
    },
    {
      icon: '/public/images/community/tools_wrench.png',
      heading: 'For Builders',
      text: 'Get a front-row seat to innovative startups and join your dream team.',
      className: 'builders-box'
    },
    {
      icon: '/public/images/community/groups.png',
      heading: 'For Everyone',
      text: 'Network with ambitious people building the next generation of companies.',
      className: 'everyone-box'
    }
  ]

  const expectBoxData = [
    {
      icon: '/public/images/community/lightbulb.png',
      heading: 'Shorter Founder Pitches',
      text: 'Quick, impactful presentations where founders share their vision and what they\'re looking for in teammates.',
      className: 'expect-box-1'
    },
    {
      icon: '/public/images/community/lightbulb.png',
      heading: 'Breakout Networking',
      text: 'Small group sessions designed to facilitate deeper conversations and meaningful connections.',
      className: 'expect-box-2'
    },
    {
      icon: '/public/images/community/lightbulb.png',
      heading: 'Team Matching',
      text: 'Structured opportunities to find your perfect co-founder or join an exciting early-stage startup.',
      className: 'expect-box-3'
    }
  ]

  return (
    <main>
      {/* Hero Section */}
      <AnimatedSection className="hero">
        <h1 className="hero-heading">
          Community Events
        </h1>
        <p className="hero-text">
          Where funders and future teammates connect.
        </p>
        <div className="community">
          <Image 
            className="community-img" 
            src="/public/images/community/community-img.png" 
            alt="Community event photo" 
            width={700} 
            height={400}
          />
        </div>
        <p className="hero2-heading">
          Why Join?
        </p>
        <p className="hero2-text">
          Connect with likeminded individuals and build the next generation of companies.
        </p>
        <div className="hero-boxes">
          {communityBoxData.map((box, index) => (
            <div
              key={index}
              className={`box community-box ${box.className}`}
            >
              <div className="box-icon">
                <Image src={box.icon} width={24} height={24} alt="icon" />
              </div>
              <div className="box-heading">
                {box.heading}
              </div>
              <div className="box-text">
                {box.text}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
      
      {/* Event Section */}
      <section className="event">
        <p className="event-head">
          Upcoming Event
        </p>
        <p className="event-text">
          Join our next virtual co-founder matching session!
        </p>
        <div className="session">
          <div className="session-icon">
            <Image src="/public/images/community/videocam.png" width={44} height={44} alt="Video call icon" />
          </div>
          <p className="session-head">
            Next Session
          </p>
          <div className="session-date">
            <Image src="/public/images/community/calendar_today.png" width={24} height={24} alt="Calendar icon" />
            <p className="session-date-text">October 9, 2025 at 5:00pm PST</p>
          </div>
          <div className="session-link">
            <Image src="/public/images/community/globe.png" width={24} height={24} alt="Globe icon" />
            <p className="session-link-text">Virtual (zoom link after registration)</p>
          </div>
          <div className="session-money">
            <Image src="/public/images/community/payments.png" width={24} height={24} alt="Payment icon" />
            <p className="session-money-text">Free to attend</p>
          </div>
          <div className="session-register">
            <button className="register-btn">
              <Image src="/public/images/community/open_in_new.png" width={20} height={20} alt="External link" />
              Register on Eventbrite
            </button>
          </div>
        </div>
      </section>
      
      {/* Expectation Section */}
      <section className="expectation">
        <div className="expect-head">
          What to Expect
        </div>
        <div className="expect-text">
          A structured, yet casual environment designed for meaningful conversations
        </div>
        <div className="expect-boxes">
          {expectBoxData.map((box, index) => (
            <div
              key={index}
              className={`box expect-box ${box.className}`}
            >
              <div className="box-icon">
                <Image src={box.icon} width={30} height={30} alt="icon" />
              </div>
              <div className="box-heading">
                {box.heading}
              </div>
              <div className="box-text">
                {box.text}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </main>
  )
}