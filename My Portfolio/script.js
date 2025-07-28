document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the height of the sticky navbar to offset scroll position
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active class for nav links
                updateNavLinkActiveState(targetId);
            }
        });
    });

    // Function to update active state of nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section'); // All sections

    function updateNavLinkActiveState(currentSectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // Intersection Observer for "on-scroll" animations
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once it's visible if animation only happens once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove is-visible class if you want animation to reset on scroll out
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // Hero section text and button staggered animation on page load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtn = document.querySelector('.hero-section .btn');

    // Use a small delay for staggered effect
    setTimeout(() => {
        heroTitle.classList.add('is-visible');
    }, 100);
    setTimeout(() => {
        heroSubtitle.classList.add('is-visible');
    }, 300);
    setTimeout(() => {
        heroBtn.classList.add('is-visible');
    }, 500);


    // Navbar sticky and background change on scroll
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero-section');
    const initialNavbarBg = window.getComputedStyle(navbar).backgroundColor; // Get initial BG

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroSection.offsetHeight - navbar.offsetHeight) {
            navbar.style.backgroundColor = '#212529'; // Slightly darker when scrolled
        } else {
            navbar.style.backgroundColor = initialNavbarBg; // Original color
        }

        // Update active nav link based on scroll position
        let currentActiveSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 50; // Add some offset
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentActiveSection = '#' + section.id;
            }
        });
        updateNavLinkActiveState(currentActiveSection);
    });

    // Initialize active state on page load based on URL hash (if any)
    if (window.location.hash) {
        updateNavLinkActiveState(window.location.hash);
        // Also scroll to the hash if page reloaded there
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
             const navbarHeight = document.querySelector('.navbar').offsetHeight;
             const offsetTop = targetElement.offsetTop - navbarHeight;
             window.scrollTo({ top: offsetTop, behavior: 'instant' }); // Use 'instant' to avoid double scroll
        }
    } else {
        // Set 'About' as active if no hash
        updateNavLinkActiveState('#about');
    }

});