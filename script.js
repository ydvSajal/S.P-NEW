// Loading Animation
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile menu toggle with slide animation
document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const isHidden = mobileMenu.classList.contains('mobile-menu-hidden');
    
    if (isHidden) {
        mobileMenu.classList.remove('mobile-menu-hidden');
        mobileMenu.classList.add('mobile-menu-visible');
    } else {
        mobileMenu.classList.remove('mobile-menu-visible');
        mobileMenu.classList.add('mobile-menu-hidden');
    }
});

// Enhanced smooth scrolling with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.remove('mobile-menu-visible');
        mobileMenu.classList.add('mobile-menu-hidden');
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = 64; // Height of fixed navigation
        
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
    const navHeight = 64;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update desktop nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // Update mobile nav links
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Listen for scroll events with throttling
window.addEventListener('scroll', throttledScrollHandler, { passive: true });
window.addEventListener('load', updateActiveNavLink);

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('mobile-menu-visible');
        mobileMenu.classList.add('mobile-menu-hidden');
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (window.innerWidth >= 768) {
        mobileMenu.classList.remove('mobile-menu-visible');
        mobileMenu.classList.add('mobile-menu-hidden');
    }
});

// Resume download now handled directly by HTML link to Sajal-Resume.pdf

// Enhanced animation on scroll with better performance
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '50px 0px -50px 0px'
});

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Throttled scroll handler for better performance
let scrollTimeout;
function throttledScrollHandler() {
    if (scrollTimeout) {
        return;
    }
    
    scrollTimeout = setTimeout(() => {
        updateActiveNavLink();
        scrollTimeout = null;
    }, 16); // ~60fps
}

// Contact form submission handling
const contactForm = document.querySelector('#contact form');

// Load EmailJS SDK
const script = document.createElement('script');
script.src = 'https://cdn.emailjs.com/sdk/3.2/email.min.js';
document.head.appendChild(script);

script.onload = () => {
    emailjs.init('uf3qqppcMkQa6dPSF'); // Replace with your EmailJS user ID

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields before sending your message.');
            return;
        }

        const templateParams = {
            to_email: 'sajalkumar1765@gmail.com',
            from_name: name,
            from_email: email,
            message: message
        };

        emailjs.send('service_ymmyeld', 'template_ufcrd0g', templateParams)
            .then(() => {
                alert(`Thank you, ${name}! Your message has been sent.`);
                contactForm.reset();
            }, (error) => {
                alert('Failed to send message. Please try again later.');
                console.error('EmailJS error:', error);
            });
    });
};