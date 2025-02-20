document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const header = document.querySelector('header');
    const goToTop = document.getElementById('goToTop');

    // Modals
    const modals = {
        about: document.getElementById('aboutModal'),
        calendar: document.getElementById('calendarModal'),
        donate: document.getElementById('donateModal')
    };

    // Sticky Header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove sticky class
        if (currentScroll > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Show/hide go to top button
        if (currentScroll > 500) {
            goToTop.classList.add('visible');
        } else {
            goToTop.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });

    // Go to top functionality
    goToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Modal functionality
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            body.style.overflow = 'hidden';
            
            // Add animation class to modal content
            const content = modal.querySelector('.modal-content');
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            
            // Force reflow
            content.offsetHeight;
            
            // Add animation
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }
    }

    function closeModal(modal) {
        if (modal) {
            const content = modal.querySelector('.modal-content');
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                modal.style.display = 'none';
                body.style.overflow = '';
            }, 300);
        }
    }

    // Modal triggers
    document.querySelector('.about-trigger').addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modals.about);
    });

    document.querySelector('.donate-btn').addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modals.donate);
    });

    const calendarTrigger = document.querySelector('.view-schedule');
    if (calendarTrigger) {
        calendarTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(modals.calendar);
        });
    }

    // Event cards trigger calendar modal
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            openModal(modals.calendar);
        });
    });

    // Close buttons for modals
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    Object.values(modals).forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            Object.values(modals).forEach(modal => {
                if (modal && modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });

    // Prevent default for # links
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => e.preventDefault());
    });

    // Hero Slider functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Show first slide and start slideshow
    showSlide(0);
    setInterval(nextSlide, 5000);

    // Initialize Google Maps
    initMap();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#about') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                        body.style.overflow = '';
                    }
                }
            }
        });
    });
});

// Function to initialize Google Maps
function initMap() {
    const location = { lat: 52.5200, lng: 13.4050 }; // Berlin coordinates
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#F1F1FF' }]
            },
            {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#1a237e' }]
            }
        ]
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Singh Sabha Gurudwara Berlin'
    });

    const infoWindow = new google.maps.InfoWindow({
        content: '<div style="padding: 10px;"><h3>Singh Sabha Gurudwara Berlin</h3><p>Alt-Biesdorf 71, Berlin, Germany</p></div>'
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Add mobile navigation toggle functionality if needed
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
