/**
 * NDE Q&A Main JavaScript
 * Handles general site functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    initFaqAccordion();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Create necessary directories if they don't exist
    createDirectories();
});

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Toggle icon
            const icon = question.querySelector('.faq-toggle i');
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
            
            // Toggle visibility of answer
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a.scroll-to, a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's a real anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    const menuToggle = document.querySelector('.menu-toggle');
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                    
                    // Scroll to element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function createDirectories() {
    // This function would normally create necessary directories server-side
    // For a static website on GitHub Pages, this isn't needed as directories should be created manually
    // This is just a placeholder to show where you would include such functionality in a full application
    
    console.log("Website initialized. In a server environment, this function would create necessary directories.");
}

// Handle page visibility for analytics and optimization
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page is visible - potential place to resume resources, reconnect, etc.
        console.log('Page is now visible');
    } else {
        // Page is hidden - potential place to pause resources, save state, etc.
        console.log('Page is now hidden');
    }
});

// Add CSS class to body when page is fully loaded for potential loading animations
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
}); 