/* Send email to backend */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#join-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#join-email").value;

    try {
      const res = await fetch("/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      alert(data.msg);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Error saving email.");
    }
  });
});

/* Animations */

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const footer = document.querySelectorAll(".footer")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // optional: only animate once
      }
    });
  }, {
    threshold: 0.2 // triggers when 20% of the element is visible
  });

  boxes.forEach(box => observer.observe(box));
  footer.forEach(footer => observer.observe(footer));
});

// Configuration
const API_BASE_URL = 'http://localhost:3000'; // Update this for production

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handling
    initEmailSignup();
    
    // Initialize scroll animations (existing functionality)
    initScrollAnimations();
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

// Existing scroll animations (keeping your current functionality)
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
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

    // Observe all boxes and footer
    const animatedElements = document.querySelectorAll('.box, .footer');
    animatedElements.forEach(el => observer.observe(el));
}