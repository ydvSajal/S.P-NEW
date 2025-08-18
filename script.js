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

// Resume Download Functionality
document.getElementById('resume-download').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create a simple PDF content (you can replace this with actual resume data)
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add content to PDF
    doc.setFontSize(20);
    doc.text('Sajal Kumar', 20, 30);
    
    doc.setFontSize(12);
    doc.text('Computer Science Student | Bennett University', 20, 45);
    doc.text('Email: sajalkumar1765@gmail.com', 20, 55);
    doc.text('GitHub: github.com/ydvSajal', 20, 65);
    
    doc.setFontSize(16);
    doc.text('Education', 20, 85);
    doc.setFontSize(12);
    doc.text('B.Tech in Computer Science Engineering', 20, 95);
    doc.text('Bennett University (2024 - 2028)', 20, 105);
    
    doc.setFontSize(16);
    doc.text('Skills', 20, 125);
    doc.setFontSize(12);
    doc.text('• Programming: Python, Java, JavaScript', 20, 135);
    doc.text('• Web Development: HTML, CSS, JavaScript', 20, 145);
    doc.text('• Database: SQL, Database Design', 20, 155);
    doc.text('• Game Development: Pygame, Game Logic', 20, 165);
    
    doc.setFontSize(16);
    doc.text('Projects', 20, 185);
    doc.setFontSize(12);
    doc.text('• BU_Basket - Campus marketplace platform', 20, 195);
    doc.text('• 10 CGPA Educational Website - Study materials platform', 20, 205);
    doc.text('• Student-Life-OS - Academic management application', 20, 215);
    doc.text('• Gym Log App - Fitness tracking application', 20, 225);
    doc.text('• Snake Game - Classic game implementation', 20, 235);
    
    // Save the PDF
    doc.save('Sajal_Kumar_Resume.pdf');
});

// Load jsPDF library
const jsPDFScript = document.createElement('script');
jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
document.head.appendChild(jsPDFScript);

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