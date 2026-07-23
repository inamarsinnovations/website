// ==========================================
// Inamars - Website JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Counter animation
    const counters = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            counter.dataset.animated = 'true';

            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    };

    // Intersection Observer for animations
    const observerOptions = { threshold: 0.2 };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in to animatable elements
    document.querySelectorAll('.service-card, .why-card, .about-grid, .contact-grid, .hero-content, .section-header, .cta-content, .page-header .container')
        .forEach(el => {
            el.classList.add('fade-in');
            fadeObserver.observe(el);
        });

    // Counter observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) counterObserver.observe(statsSection);

    // Contact form handling
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                form.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 2500);
            }, 1200);
        });
    }

    // Booking form handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Booking...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Appointment Booked!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                bookingForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Indian phone number validation & formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let val = e.target.value.replace(/[^0-9]/g, '');
            if (val.length > 10) val = val.slice(0, 10);
            e.target.value = val;
        });

        input.addEventListener('blur', (e) => {
            const val = e.target.value;
            const hint = e.target.closest('.form-group')?.querySelector('.phone-hint');
            if (val.length === 10 && /^[6-9]/.test(val)) {
                if (hint) { hint.style.color = '#10b981'; hint.textContent = 'Valid Indian mobile number'; }
            } else if (val.length > 0) {
                if (hint) { hint.style.color = '#ef4444'; hint.textContent = 'Please enter a valid 10-digit Indian number starting with 6-9'; }
            }
        });

        input.addEventListener('focus', (e) => {
            const hint = e.target.closest('.form-group')?.querySelector('.phone-hint');
            if (hint) { hint.style.color = ''; hint.textContent = '10-digit Indian mobile number starting with 6, 7, 8, or 9'; }
        });
    });

    // Smooth scroll for anchor links (same page only)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
