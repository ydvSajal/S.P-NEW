// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('mobile-menu').classList.add('hidden');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

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