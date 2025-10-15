'use client'
import AnimatedSection from '@/components/AnimatedSection'
import Footer_Newsletter from '@/components/Footer_Newsletter'
import Image from 'next/image'
import './community.css'
import '@/components/footer_newsletter.css'

export default function CommunityPage() {
  const scrollToJoin = () => {
    if (window.location.pathname !== '/community') {
      window.location.href = '/#footer-join'
    } else {
      const footerSection = document.querySelector('.footer-join')
      if (footerSection) {
        footerSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const communityBoxData = [
    {
      icon: '/images/community/lightbulb.png',
      heading: 'For Founders',
      text: 'Pitch your startup and meet co-founders, designers, engineers, and operators who can help you scale.',
      className: 'founders-box'
    },
    {
      icon: '/images/community/tools_wrench.png',
      heading: 'For Builders',
      text: 'Get a front-row seat to innovative startups and join your dream team.',
      className: 'builders-box'
    },
    {
      icon: '/images/community/groups.png',
      heading: 'For Everyone',
      text: 'Network with ambitious people building the next generation of companies.',
      className: 'everyone-box'
    }
  ]

  const expectBoxData = [
    {
      icon: '/images/community/lightbulb.png',
      heading: 'Shorter Founder Pitches',
      text: 'Quick, impactful presentations where founders share their vision and what they\'re looking for in teammates.',
      className: 'expect-box-1'
    },
    {
      icon: '/images/community/lightbulb.png',
      heading: 'Breakout Networking',
      text: 'Small group sessions designed to facilitate deeper conversations and meaningful connections.',
      className: 'expect-box-2'
    },
    {
      icon: '/images/community/lightbulb.png',
      heading: 'Team Matching',
      text: 'Structured opportunities to find your perfect co-founder or join an exciting early-stage startup.',
      className: 'expect-box-3'
    }
  ]

  return (
    <main>
      {/* Hero Section */}
      <AnimatedSection className="hero">
        <h1 className="hero-heading" data-animate>
          Community Events
        </h1>
        <p className="hero-text" data-animate>
          Where founders and future teammates connect.
        </p>
        <div className="community" data-animate>
          <Image 
            className="community-img" 
            src="/images/community/community-img.png" 
            alt="Community event photo" 
            width={700} 
            height={400}
          />
        </div>
        <p className="hero2-heading" data-animate>
          Why Join?
        </p>
        <p className="hero2-text" data-animate>
          Connect with likeminded individuals and build the next generation of companies.
        </p>
        <div className="hero-boxes" data-animate>
          {communityBoxData.map((box, index) => (
            <div
              key={index}
              className={`box community-box ${box.className}`}
              data-animate
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
      <AnimatedSection>
        <section className="event" id="event" data-animate>
          <p className="event-head" data-animate>
            Upcoming Event
          </p>
          <p className="event-text" data-animate>
            Join our next virtual co-founder matching session!
          </p>
          <div className="session" data-animate>
            <div className="session-icon">
              <Image src="/images/community/videocam.png" width={44} height={44} alt="Video call icon" />
            </div>
            <p className="session-head">
              Next Session
            </p>
            <div className="session-date">
              <Image src="/images/community/calendar_today.png" width={24} height={24} alt="Calendar icon" />
              <p className="session-date-text">TBD</p>
            </div>
            <div className="session-link">
              <Image src="/images/community/globe.png" width={24} height={24} alt="Globe icon" />
              <p className="session-link-text">Virtual (zoom link after registration)</p>
            </div>
            <div className="session-money">
              <Image src="/images/community/payments.png" width={24} height={24} alt="Payment icon" />
              <p className="session-money-text">Free to attend</p>
            </div>
            <div className="session-register">
              <button className="register-btn" onClick={scrollToJoin}>
                <Image src="/images/community/open_in_new.png" width={20} height={20} alt="External link" />
                Sign up to get a reminder.
              </button>
            </div>
          </div>
        </section>
      </AnimatedSection>
      
      {/* Expectation Section */}
      <AnimatedSection>
        <section className="expectation" data-animate>
          <div className="expect-head" data-animate>
            What to Expect
          </div>
          <div className="expect-text" data-animate>
            A structured, yet casual environment designed for meaningful conversations
          </div>
          <div className="expect-boxes" data-animate>
            {expectBoxData.map((box, index) => (
              <div
                key={index}
                className={`box expect-box ${box.className}`}
                data-animate
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
      </AnimatedSection>
      <Footer_Newsletter />
    </main>
  )
}
