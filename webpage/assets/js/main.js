document.addEventListener('DOMContentLoaded', function() {
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
    
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // Modal functionality
    const modals = {
        about: document.getElementById('aboutModal'),
        calendar: document.getElementById('calendarModal')
    };

    function openModal(modalId) {
        const modal = modals[modalId];
        if (modal) {
            modal.style.display = 'block';
            body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            body.style.overflow = '';
        }
    }

    // About modal trigger
    document.querySelector('.about-trigger').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('about');
    });

    // Calendar modal triggers
    const calendarTrigger = document.querySelector('.view-schedule');
    if (calendarTrigger) {
        calendarTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('calendar');
        });
    }

    // Event cards trigger calendar modal
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            openModal('calendar');
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
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });

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

// // Function to initialize Google Maps
// function initMap() {
//     const location = { lat: 52.5200, lng: 13.4050 }; // Berlin coordinates
//     const map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 15,
//         center: location,
//         styles: [
//             {
//                 featureType: 'all',
//                 elementType: 'geometry',
//                 stylers: [{ color: '#F1F1FF' }]
//             },
//             {
//                 featureType: 'all',
//                 elementType: 'labels.text.fill',
//                 stylers: [{ color: '#1a237e' }]
//             }
//         ]
//     });

//     const marker = new google.maps.Marker({
//         position: location,
//         map: map,
//         title: 'Singh Sabha Gurudwara Berlin'
//     });

//     const infoWindow = new google.maps.InfoWindow({
//         content: '<div style="padding: 10px;"><h3>Singh Sabha Gurudwara Berlin</h3><p>Alt-Biesdorf 71, Berlin, Germany</p></div>'
//     });

//     marker.addListener('click', () => {
//         infoWindow.open(map, marker);
//     });
// }

// Add mobile navigation toggle functionality if needed
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
