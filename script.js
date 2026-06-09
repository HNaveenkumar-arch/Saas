/* ========================================== */
/* script.js */
/* ========================================== */

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        once: true
    });
});

// Sticky Navbar & Glassmorphism Effect on Scroll
window.addEventListener('scroll', function () {
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    if (window.scrollY > 50) {
        navbarWrapper.classList.add('scrolled');
    } else {
        navbarWrapper.classList.remove('scrolled');
    }
});

// Mobile Menu Elements
const hamburgerMenu = document.getElementById('hamburgerMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const navLinks = document.getElementById('navLinks');

// Function to open mobile menu
function openMenu() {
    navLinks.classList.add('mobile-active');
    document.body.classList.add('no-scroll'); // Prevent background scrolling
}

// Function to close mobile menu
function closeMenu() {
    navLinks.classList.remove('mobile-active');
    document.body.classList.remove('no-scroll'); // Enable background scrolling
}

// Event Listeners for Mobile Menu
hamburgerMenu.addEventListener('click', openMenu);
closeMobileMenu.addEventListener('click', closeMenu);

// Function to handle Active Page state switching
function setActive(element) {
    // Remove active class from all items
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => item.classList.remove('active'));

    // Add active class to clicked item
    element.classList.add('active');

    // Close mobile menu if it was open
    closeMenu();
}

// Hero Section - 3 Seconds Cyclical Feature Change
document.addEventListener("DOMContentLoaded", function () {
    const features = document.querySelectorAll(".dynamic-feature");
    let currentIndex = 0;

    if (features.length > 0) {
        setInterval(() => {
            // Remove active class from current item
            features[currentIndex].classList.remove("active");

            // Move to next item (loop back to 0 if at the end)
            currentIndex = (currentIndex + 1) % features.length;

            // Add active class to new item
            features[currentIndex].classList.add("active");
        }, 3000); // 3000 milliseconds = 3 seconds
    }
});



// Success Metrics Section Count-Up & Circle Progress Trigger
document.addEventListener("DOMContentLoaded", function () {
    const metricsSection = document.querySelector('.metrics-section');
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false; // Prevents re-triggering animation loops

    if (!metricsSection) return;

    // Core Count-up Mechanic Functional Block
    function startCountUp() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000; // 2 seconds execution window runtime
            const increment = target / (duration / 16); // ~60fps layout frame calculations
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target; // Ensure exact final value matches target
                }
            };
            updateCount();
        });
    }

    // Intersection Observer to detect when user scrolls to this section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                metricsSection.classList.add('animate-start'); // Starts SVG loader wheel trace line
                startCountUp(); // Triggers numeric layout count loops
                hasAnimated = true; // Locks loop activity verification check
            }
        });
    }, { threshold: 0.2 }); // Triggers when 20% of section bounds appear visible

    observer.observe(metricsSection);
});


// ==========================================
// 3D STACKED CAROUSEL - FLUID SLIDER ENGINE
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    let currentActiveIdx = 1; // Default starts focus centered on slide 1
    const slides = document.querySelectorAll('.stacked-card-slide');
    const nextBtn = document.getElementById('nextCardBtn');
    const prevBtn = document.getElementById('prevCardBtn');

    if (slides.length === 0) return;

    // Core Active and Background Stack States Processing Matrix
    function renderStackedCarousel() {
        const totalSlidesCount = slides.length;
        const isMobileView = window.innerWidth <= 768;

        slides.forEach((slide, index) => {
            // Reset base class config mapping arrays cleanly
            slide.className = 'stacked-card-slide';

            if (index === currentActiveIdx) {
                // Front active highlighted card
                slide.classList.add('active-front');
            } else if (index === (currentActiveIdx - 1 + totalSlidesCount) % totalSlidesCount) {
                // Placed back left position layout tracker
                slide.classList.add('stack-left');
            } else if (index === (currentActiveIdx + 1) % totalSlidesCount) {
                // Placed back right position layout tracker
                slide.classList.add('stack-right');
            } else {
                // Rest of cards tucked clean behind plane depth bounds
                slide.classList.add('hidden-back');
            }
        });
    }

    // Direct Touch/Click Snap tracking mechanic mapping setup
    window.snapToSlide = function (targetIndex) {
        // Now works seamlessly on BOTH desktop and mobile views!
        currentActiveIdx = targetIndex;
        renderStackedCarousel();
    }

    // Controller navigation buttons triggers mapping settings 
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // Stops touch bubbling conflicts errors
            currentActiveIdx = (currentActiveIdx + 1) % slides.length;
            renderStackedCarousel();
        });

        prevBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            currentActiveIdx = (currentActiveIdx - 1 + slides.length) % slides.length;
            renderStackedCarousel();
        });
    }

    // Touch Swipe Support for Mobile Devices (Extra Premium Interaction Add-on)
    let touchStartX = 0;
    let touchEndX = 0;
    const stageContainer = document.querySelector('.stacked-carousel-stage');

    if (stageContainer) {
        stageContainer.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        stageContainer.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, { passive: true });
    }

    function handleSwipeGesture() {
        const swipeThresholdDist = 50; // Minimum sliding sweep radius pixels
        if (touchStartX - touchEndX > swipeThresholdDist) {
            // Swiped Left -> Load next card view frame
            currentActiveIdx = (currentActiveIdx + 1) % slides.length;
            renderStackedCarousel();
        } else if (touchEndX - touchStartX > swipeThresholdDist) {
            // Swiped Right -> Load previous card view frame
            currentActiveIdx = (currentActiveIdx - 1 + slides.length) % slides.length;
            renderStackedCarousel();
        }
    }

    // Window configuration size adjustment listeners tracking
    window.addEventListener('resize', renderStackedCarousel);

    // Initial runtime activation call tracking triggers
    renderStackedCarousel();
});


// ==========================================
// FAQ ACCORDION EXPANSION INTERACTION LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const faqQuestionButtons = document.querySelectorAll('.faq-question-btn');

    faqQuestionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const currentFaqItemCard = this.parentElement;
            const currentAnswerPanel = currentFaqItemCard.querySelector('.faq-answer-panel');

            // Check up verify if current panel targets are already active open
            const isCardActiveAlready = currentFaqItemCard.classList.contains('faq-active');

            // EXTRA CLOSE OTHERS TRACK: Closes any other opened tabs before triggering current active choice setup
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('faq-active');
                item.querySelector('.faq-answer-panel').style.maxHeight = null;
            });

            if (!isCardActiveAlready) {
                // Activate current card tags parameters toggle class
                currentFaqItemCard.classList.add('faq-active');

                // Calculates strict pixel height dimensions layout nodes scrolling heights perfectly dynamically
                currentAnswerPanel.style.maxHeight = currentAnswerPanel.scrollHeight + "px";
            } else {
                // Collapses down parameters values limits bounds if clicked closed again
                currentFaqItemCard.classList.remove('faq-active');
                currentAnswerPanel.style.maxHeight = null;
            }
        });
    });
});



// Newsletter Form Validation (Add this to script.js)
const nlForm = document.getElementById('newsletterForm');
const nlInput = document.getElementById('nlEmailInput');
const nlMessage = document.getElementById('nlMessage');
const nlBtn = document.getElementById('nlBtn');
const emailPatternNL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (nlForm) {
    nlInput.addEventListener('input', function () {
        nlInput.classList.remove('error');
        nlMessage.className = 'form-message';
    });

    nlForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailVal = nlInput.value.trim();

        if (emailVal === '') {
            nlInput.classList.add('error');
            nlMessage.textContent = 'Email address is required.';
            nlMessage.className = 'form-message error';
        } else if (!emailPatternNL.test(emailVal)) {
            nlInput.classList.add('error');
            nlMessage.textContent = 'Please enter a valid email address.';
            nlMessage.className = 'form-message error';
        } else {
            // Success
            nlInput.classList.remove('error');
            const originalText = nlBtn.innerText;
            nlBtn.innerText = 'WAIT...';

            // Simulate API call
            setTimeout(() => {
                nlMessage.textContent = 'Successfully joined the newsletter!';
                nlMessage.className = 'form-message success';
                nlBtn.innerText = 'JOINED';
                nlInput.value = '';

                // Reset button
                setTimeout(() => {
                    nlBtn.innerText = originalText;
                    nlMessage.className = 'form-message';
                }, 3000);
            }, 1000);
        }
    });
}

    window.addEventListener("load", () => {
        const loader = document.getElementById("premiumLoaderPro");
        
        // Exact 2 seconds delay
        setTimeout(() => {
            // Adds the 'hide' class which triggers the sleek CSS exit animation
            loader.classList.add("hide");
            
            // Wait for transition to finish before removing from DOM
            setTimeout(() => {
                loader.remove();
            }, 700); // 700ms matches the CSS transition time
            
        }, 2000);
    });
