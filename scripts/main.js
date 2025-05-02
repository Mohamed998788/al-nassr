/**
 * Main JavaScript file for the School Website
 */

// Ensure text visibility on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add page-loaded class to body to trigger fade-in animation
    document.body.classList.add('page-loaded');
    
    // Force visibility of important text elements after a short delay
    setTimeout(function() {
        document.querySelectorAll('h1, h2, h3, p, .section-title, .hero-title, .hero-description').forEach(function(el) {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
    }, 500);
    
    // Initialize all components
    init();
});

// Mobile Navigation Toggle - Enhanced
function setupMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    
    if (menuToggle && mainNav) {
        // Open menu function
        menuToggle.addEventListener('click', function() {
            mainNav.classList.add('active');
            document.body.classList.add('nav-open');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            // Focus on the close button for better accessibility
            if (closeMenuBtn) {
                setTimeout(() => closeMenuBtn.focus(), 100);
            }
        });
        
        // Close menu function
        function closeMenu() {
            mainNav.classList.remove('active');
            document.body.classList.remove('nav-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            // Return focus to menu toggle
            menuToggle.focus();
        }
        
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', closeMenu);
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target) && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu when clicking on a nav link (for mobile)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });
    }
}

// Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mainNav = document.querySelector('.main-nav');
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            }
        });
    });
}

// Highlight Active Navigation Item
function setupActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Enhanced Testimonial Slider
function setupTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    if (testimonials.length > 1) {
        // Make sure all testimonials are visible in the DOM but hidden with CSS
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = index === 0 ? '1' : '0';
            testimonial.style.display = index === 0 ? 'block' : 'none';
            // Ensure text content is visible
            const content = testimonial.querySelector('.testimonial-content p');
            if (content) {
                content.style.opacity = '1';
                content.style.visibility = 'visible';
            }
        });
        
        // Create navigation dots
        const sliderContainer = document.querySelector('.testimonials-slider');
        if (!sliderContainer) return; // Exit if slider container doesn't exist
        
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });
        
        // Create navigation arrows
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-nav slider-prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        prevButton.setAttribute('aria-label', 'السابق');
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        const nextButton = document.createElement('button');
        nextButton.className = 'slider-nav slider-next';
        nextButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        nextButton.setAttribute('aria-label', 'التالي');
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        sliderContainer.appendChild(prevButton);
        sliderContainer.appendChild(nextButton);
        sliderContainer.appendChild(dotsContainer);
        
        // Auto-rotate testimonials
        let autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
        
        // Pause auto-rotation when hovering over slider
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        // Resume auto-rotation when mouse leaves
        sliderContainer.addEventListener('mouseleave', () => {
            clearInterval(autoRotate); // Clear existing interval first
            autoRotate = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            }, 5000);
        });
    } else if (testimonials.length === 1) {
        // If there's only one testimonial, make sure it's visible
        testimonials[0].style.opacity = '1';
        testimonials[0].style.display = 'block';
        testimonials[0].classList.add('active');
        
        // Ensure text content is visible
        const content = testimonials[0].querySelector('.testimonial-content p');
        if (content) {
            content.style.opacity = '1';
            content.style.visibility = 'visible';
        }
    }
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = 'none';
            testimonial.classList.remove('active');
            testimonial.style.opacity = '0';
        });
        
        testimonials[index].style.display = 'block';
        
        // Add fade-in animation
        setTimeout(() => {
            testimonials[index].classList.add('active');
            testimonials[index].style.opacity = '1';
            
            // Ensure text content is visible
            const content = testimonials[index].querySelector('.testimonial-content p');
            if (content) {
                content.style.opacity = '1';
                content.style.visibility = 'visible';
            }
        }, 50);
        
        const dots = document.querySelectorAll('.slider-dots .dot');
        dots.forEach((dot, i) => {
            dot.className = i === index ? 'dot active' : 'dot';
        });
        
        currentIndex = index;
    }
}

// Back to Top Button with Smooth Animation
function setupBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'العودة إلى الأعلى');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animation with fallback for text visibility
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // First make sure all text is visible regardless of animation
    document.querySelectorAll('.animate-on-scroll h1, .animate-on-scroll h2, .animate-on-scroll h3, .animate-on-scroll p').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
    });
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in view
            if (
                (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) ||
                (elementTopPosition <= windowBottomPosition && elementBottomPosition >= windowTopPosition)
            ) {
                element.classList.add('animated');
                
                // Ensure text content is visible
                const textElements = element.querySelectorAll('h1, h2, h3, p');
                textElements.forEach(el => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                });
            }
        });
    }
    
    // Check on load
    window.addEventListener('load', checkIfInView);
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Initial check
    setTimeout(checkIfInView, 100);
}

// Enhanced Floating Icons Effect
function setupFloatingIcons() {
    const floatingIconsContainer = document.querySelector('.floating-icons-container');
    
    if (floatingIconsContainer) {
        function createFloatingIcon() {
            const icons = ['📚', '✏️', '🎨', '🔬', '🎯', '📐', '🎵', '🏆', '🧠', '🌟'];
            const icon = document.createElement('span');
            icon.textContent = icons[Math.floor(Math.random() * icons.length)];
            icon.style.left = Math.random() * 100 + 'vw';
            icon.style.animationDuration = Math.random() * 3 + 2 + 's';
            icon.className = 'floating-icon';
            floatingIconsContainer.appendChild(icon);
            
            // Remove icon after animation completes
            setTimeout(() => {
                icon.remove();
            }, 5000);
        }
        
        // Create initial set of icons
        for (let i = 0; i < 10; i++) {
            setTimeout(createFloatingIcon, i * 300);
        }
        
        // Continue creating icons at intervals
        setInterval(createFloatingIcon, 800);
    }
}

// Ensure Why Al-Nasr section is visible
function ensureWhyAlNasrVisible() {
    const whyAlNasrSection = document.getElementById('why-alnasr');
    
    if (whyAlNasrSection) {
        // Make the section itself visible
        whyAlNasrSection.style.opacity = '1';
        whyAlNasrSection.style.visibility = 'visible';
        
        // Make all important elements inside the section visible
        const elementsToShow = whyAlNasrSection.querySelectorAll('.section-title, .section-description, .feature-card, .feature-icon, h3, p, .features-cta, .btn');
        
        elementsToShow.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
        
        // Add a class to highlight the section
        whyAlNasrSection.classList.add('highlighted-section');
    }
}

// Initialize all functions
function init() {
    // Make sure body has page-loaded class
    document.body.classList.add('page-loaded');
    
    // Initialize components
    setupMobileNav();
    setupSmoothScrolling();
    setupActiveNavHighlighting();
    setupTestimonialSlider();
    setupBackToTopButton();
    setupScrollAnimations();
    setupFloatingIcons();
    ensureWhyAlNasrVisible(); // Add the new function
    
    // Ensure text visibility after a delay
    setTimeout(function() {
        document.querySelectorAll('h1, h2, h3, p, .section-title, .hero-title, .hero-description').forEach(function(el) {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
        
        // Make sure testimonials are visible
        document.querySelectorAll('.testimonial').forEach(function(testimonial, index) {
            if (index === 0 || testimonial.classList.contains('active')) {
                testimonial.style.opacity = '1';
                testimonial.style.display = 'block';
            }
        });
        
        // Ensure Why Al-Nasr section is visible again after a delay
        ensureWhyAlNasrVisible();
    }, 1000);
}

// Add an additional event listener to ensure the section is visible
window.addEventListener('load', function() {
    // Short delay to ensure DOM is fully processed
    setTimeout(ensureWhyAlNasrVisible, 500);
    
    // Another check after a longer delay
    setTimeout(ensureWhyAlNasrVisible, 2000);
});