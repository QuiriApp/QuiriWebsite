document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Device-specific CTA button text
    const ctaBtn = document.getElementById('ctaBtn');
    if (ctaBtn) {
        const userAgent = navigator.userAgent.toLowerCase();
        
        if (/iphone|ipad|ipod/.test(userAgent)) {
            ctaBtn.textContent = 'Coming Soon to App Store';
        } else if (/android/.test(userAgent)) {
            ctaBtn.textContent = 'Coming Soon to Play Store';
        } else {
            ctaBtn.textContent = 'Coming Soon to App Store and Play Store';
        }
    }

    // Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });
}

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (navLinks) navLinks.classList.remove('active');
            }
        });
    });

    // FAQ Toggle
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });

    // Modal Logic
    const modal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');

    const hideModal = () => {
        if (modal) modal.style.display = 'none';
    };

    if (closeModal) closeModal.addEventListener('click', hideModal);
    if (modalBtn) modalBtn.addEventListener('click', hideModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const scriptURL = 'https://script.google.com/macros/s/AKfycbybjgCZ7BB97DnVj2YPRDBR4EKKr1SP-cHp7Qg2QOP3BGYPKnb7wIeiCNoqCwxReiPn2A/exec';

            fetch(scriptURL, { method: 'POST', body: new FormData(contactForm)})
                .then(response => {
                    if (modal) modal.style.display = 'flex';
                    contactForm.reset();
                })
                .catch(error => console.error('Error!', error.message))
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.step-card, .feature-card, .pricing-card, .testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});