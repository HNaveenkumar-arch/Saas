
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        once: true
    });
});

window.addEventListener('scroll', function () {
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    if (window.scrollY > 50) {
        navbarWrapper.classList.add('scrolled');
    } else {
        navbarWrapper.classList.remove('scrolled');
    }
});

const hamburgerMenu = document.getElementById('hamburgerMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const navLinks = document.getElementById('navLinks');

function openMenu() {
    navLinks.classList.add('mobile-active');
    document.body.classList.add('no-scroll');
}

function closeMenu() {
    navLinks.classList.remove('mobile-active');
    document.body.classList.remove('no-scroll');
}

hamburgerMenu.addEventListener('click', openMenu);
closeMobileMenu.addEventListener('click', closeMenu);

function setActive(element) {
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => item.classList.remove('active'));

    element.classList.add('active');

    closeMenu();
}

document.addEventListener("DOMContentLoaded", function () {
    const features = document.querySelectorAll(".dynamic-feature");
    let currentIndex = 0;

    if (features.length > 0) {
        setInterval(() => {
            features[currentIndex].classList.remove("active");

            currentIndex = (currentIndex + 1) % features.length;

            features[currentIndex].classList.add("active");
        }, 3000);
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const metricsSection = document.querySelector('.metrics-section');
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    if (!metricsSection) return;

    function startCountUp() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                metricsSection.classList.add('animate-start');
                startCountUp();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.2 });

    observer.observe(metricsSection);
});


document.addEventListener("DOMContentLoaded", function () {
    let currentActiveIdx = 1;
    const slides = document.querySelectorAll('.stacked-card-slide');
    const nextBtn = document.getElementById('nextCardBtn');
    const prevBtn = document.getElementById('prevCardBtn');

    if (slides.length === 0) return;

    function renderStackedCarousel() {
        const totalSlidesCount = slides.length;
        const isMobileView = window.innerWidth <= 768;

        slides.forEach((slide, index) => {
            slide.className = 'stacked-card-slide';

            if (index === currentActiveIdx) {
                slide.classList.add('active-front');
            } else if (index === (currentActiveIdx - 1 + totalSlidesCount) % totalSlidesCount) {

                slide.classList.add('stack-left');
            } else if (index === (currentActiveIdx + 1) % totalSlidesCount) {

                slide.classList.add('stack-right');
            } else {
                slide.classList.add('hidden-back');
            }
        });
    }

    window.snapToSlide = function (targetIndex) {
        currentActiveIdx = targetIndex;
        renderStackedCarousel();
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            currentActiveIdx = (currentActiveIdx + 1) % slides.length;
            renderStackedCarousel();
        });

        prevBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            currentActiveIdx = (currentActiveIdx - 1 + slides.length) % slides.length;
            renderStackedCarousel();
        });
    }

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
        const swipeThresholdDist = 50;
        if (touchStartX - touchEndX > swipeThresholdDist) {

            currentActiveIdx = (currentActiveIdx + 1) % slides.length;
            renderStackedCarousel();
        } else if (touchEndX - touchStartX > swipeThresholdDist) {

            currentActiveIdx = (currentActiveIdx - 1 + slides.length) % slides.length;
            renderStackedCarousel();
        }
    }

    window.addEventListener('resize', renderStackedCarousel);

    renderStackedCarousel();
});


document.addEventListener("DOMContentLoaded", function () {
    const faqQuestionButtons = document.querySelectorAll('.faq-question-btn');

    faqQuestionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const currentFaqItemCard = this.parentElement;
            const currentAnswerPanel = currentFaqItemCard.querySelector('.faq-answer-panel');

            const isCardActiveAlready = currentFaqItemCard.classList.contains('faq-active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('faq-active');
                item.querySelector('.faq-answer-panel').style.maxHeight = null;
            });

            if (!isCardActiveAlready) {
                currentFaqItemCard.classList.add('faq-active');

                currentAnswerPanel.style.maxHeight = currentAnswerPanel.scrollHeight + "px";
            } else {
                currentFaqItemCard.classList.remove('faq-active');
                currentAnswerPanel.style.maxHeight = null;
            }
        });
    });
});



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
            nlInput.classList.remove('error');
            const originalText = nlBtn.innerText;
            nlBtn.innerText = 'WAIT...';

            setTimeout(() => {
                window.location.href = '404page.html';
            }, 1000);
        }
    });
}

window.addEventListener("load", () => {
    const loader = document.getElementById("premiumLoaderPro");

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.remove();
        }, 700);

    }, 2000);
});
