// Configuration
const API_BASE_URL = 'https://homebase-livid.vercel.app/';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handling
    initEmailSignup();
    
    // Initialize scroll animations (existing functionality)
    initScrollAnimations();
});

// Email signup functionality - KEEP THIS IN FRONTEND
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

// Email validation - KEEP THIS IN FRONTEND
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form state management - KEEP THIS IN FRONTEND
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

// Message display - KEEP THIS IN FRONTEND
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
    // Intersection Observer for fade-in animations (boxes)
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

    // Observe all boxes
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(el => observer.observe(el));

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
            }, index * 200); // 200ms delay between each element
        }
    });
}