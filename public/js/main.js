// Configuration
const API_BASE_URL = '';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handling
    initEmailSignup();
    
    // Initialize scroll animations (existing functionality)
    initScrollAnimations();

    // Initialize glow animations
    initGlowAnimation();

    // Initialize Mobile menu
    initMobileMenu();
});

// Email signup functionality
function initEmailSignup() {
    const form = document.querySelector('.join-email');
    const emailInput = document.getElementById('join-email');
    const submitBtn = document.querySelector('.join-btn');
    
    if (!form || !emailInput || !submitBtn) {
        console.error('Email form elements not found');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showMessage('Please enter your email address', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Disable form during submission
        setFormState(false);
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showMessage('🎉 Welcome to the waitlist! We\'ll be in touch soon.', 'success');
                form.reset();
            } else {
                showMessage(result.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Signup error:', error);
            showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            // Re-enable form
            setFormState(true);
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form state management
function setFormState(enabled) {
    const emailInput = document.getElementById('join-email');
    const submitBtn = document.querySelector('.join-btn');
    
    emailInput.disabled = !enabled;
    submitBtn.disabled = !enabled;
    
    if (enabled) {
        submitBtn.textContent = 'Join';
        submitBtn.style.opacity = '1';
    } else {
        submitBtn.textContent = 'Joining...';
        submitBtn.style.opacity = '0.7';
    }
}

// Message display
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.signup-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `signup-message signup-message--${type}`;
    messageEl.textContent = message;
    
    // Style the message
    Object.assign(messageEl.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: '#fff',
        fontWeight: '500',
        zIndex: '10000',
        maxWidth: '400px',
        fontSize: '14px',
        lineHeight: '1.4',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out'
    });

    // Set background color based on type
    if (type === 'success') {
        messageEl.style.backgroundColor = '#16433C';
    } else if (type === 'error') {
        messageEl.style.backgroundColor = '#dc3545';
    } else {
        messageEl.style.backgroundColor = '#6c757d';
    }

    // Add to DOM
    document.body.appendChild(messageEl);

    // Animate in
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 300);
    }, 5000);
}

function initScrollAnimations() {
    // Intersection Observer for fade-in animations (boxes only)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all boxes (hero boxes and expect boxes)
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(el => observer.observe(el));

    // Separate observer for hero animations
    const heroObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger staggered animations for hero elements
                animateHeroElements();
                // Only observe once
                heroObserver.unobserve(entry.target);
            }
        });
    }, heroObserverOptions);

    // Observe the hero container
    const hero = document.querySelector('.hero');
    if (hero) {
        heroObserver.observe(hero);
    }

    // Event section animations
    const eventObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const eventObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateEventElements();
                eventObserver.unobserve(entry.target);
            }
        });
    }, eventObserverOptions);

    const eventSection = document.querySelector('.event');
    if (eventSection) {
        eventObserver.observe(eventSection);
    }

    // Expectation section animations
    const expectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateExpectElements();
                expectObserver.unobserve(entry.target);
            }
        });
    }, eventObserverOptions);

    const expectSection = document.querySelector('.expectation');
    if (expectSection) {
        expectObserver.observe(expectSection);
    }

    // Separate observer for footer text animations
    const footerObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger staggered animations for footer elements
                animateFooterElements();
                // Only observe once
                footerObserver.unobserve(entry.target);
            }
        });
    }, footerObserverOptions);

    // Observe the footer container
    const footer = document.querySelector('.footer');
    if (footer) {
        footerObserver.observe(footer);
    }
}

// Function to animate hero elements with stagger
function animateHeroElements() {
    const heroElements = [
        '.hero-heading',
        '.hero-text',
        '.community',
        '.hero2-heading',
        '.hero2-text'
    ];

    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            // Add a small delay for each element
            setTimeout(() => {
                element.classList.add('slide-in');
            }, index * 150);
        }
    });
}

// Function to animate event elements with stagger
function animateEventElements() {
    const eventElements = [
        '.event-head',
        '.event-text',
        '.session'
    ];

    eventElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.classList.add('slide-in');
            }, index * 150);
        }
    });
}

// Function to animate expectation elements with stagger
function animateExpectElements() {
    const expectElements = [
        '.expect-head',
        '.expect-text'
    ];

    expectElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.classList.add('slide-in');
            }, index * 150);
        }
    });
}

// Function to animate footer elements with stagger
function animateFooterElements() {
    const footerElements = [
        '.footer-heading',
        '.footer-text1', 
        '.footer-text2',
        '.footer-join'
    ];

    footerElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            // Add a small delay for each element
            setTimeout(() => {
                element.classList.add('slide-in');
            }, index * 100);
        }
    });
}

function initGlowAnimation() {
    const glowElement = document.querySelector('.home-glow');

    if (!glowElement) return;

    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '50px'
    });
    glowObserver.observe(glowElement);
}

function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    const joinBtn = document.querySelector('.join');

    if (!mobileToggle || !navbar) return;

    mobileToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        
        // Clone join button into mobile menu if not already there
        if (navbar.classList.contains('active') && !navbar.querySelector('.join')) {
            const joinClone = joinBtn.cloneNode(true);
            navbar.appendChild(joinClone);
        }
        
        // Remove join button if closing
        if (!navbar.classList.contains('active')) {
            const clonedJoin = navbar.querySelector('.join');
            if (clonedJoin) {
                clonedJoin.remove();
            }
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('header')) {
            navbar.classList.remove('active');
            const clonedJoin = navbar.querySelector('.join');
            if (clonedJoin) {
                clonedJoin.remove();
            }
        }
    });
    
    // Close menu when clicking on links
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const clonedJoin = navbar.querySelector('.join');
            if (clonedJoin) {
                clonedJoin.remove();
            }
        });
    });
}