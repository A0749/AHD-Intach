// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Smooth Vertical Scrolling
function enableSmoothVerticalScroll() {
    const scrollContainer = document.querySelector("body");

    // Smooth scrolling logic
    gsap.to(scrollContainer, {
        scrollTrigger: {
            trigger: scrollContainer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5, // Smooth scrubbing
        },
        ease: "power1.inOut",
    });

    // Ensure ScrollTrigger tracks body scroll
    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            return arguments.length
                ? (scrollContainer.scrollTop = value)
                : scrollContainer.scrollTop;
        },
    });

    scrollContainer.addEventListener("scroll", ScrollTrigger.update);
}

// Horizontal Scroll for Thumbnails
const thumbnailsContainer = document.querySelector(".scrollable-thumbnails");

if (thumbnailsContainer) {
    let isScrolling = false;
    let scrollTimeout;

    function handleWheelScroll(event) {
        if (isScrolling) return; // Prevent rapid scrolling
        isScrolling = true;
        event.preventDefault();

        const scrollDistance = event.deltaY * 5; // Adjust scroll speed

        gsap.to(thumbnailsContainer, {
            scrollLeft: "+=" + scrollDistance,
            duration: 1.5,
            ease: "power2.inOut",
        });

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 500);
    }

    thumbnailsContainer.addEventListener("wheel", handleWheelScroll);
}

function animateElement(selector, { xValue = 0, yValue = -30, opacity = 0, duration = 1, delay = 0.5 } = {}) {
    gsap.from(selector, {
        x: xValue,
        y: yValue,
        opacity: opacity,
        duration: duration,
        delay: delay,
    });
}


function applyAnimations() {
    // Navbar animations
    animateElement(".navbar", { yValue: -30, duration: 1 });
    animateElement(".hero-content", { xValue: -30, duration: 0.8, delay: 0.8});
    animateElement(".bottom-content", { yValue: 30, opacity: 0, duration: 1.5 });
    animateElement(".left-gallery", { yValue: -30, duration: 1, delay: 0.6 });

    // Hero section animations
    animateElement(".text-content h2", { yValue: 30, duration: 0.8 });
    animateElement(".text-content h4", { yValue: 30, duration: 0.8 });
    
    animateElement(".right-gallery", { yValue: 30, opacity: 0, delay: 1.5  });

    animateElement(".listing-container", { yValue: 30, opacity: 0, delay: 1 });
    animateElement(".heritage-home", { yValue: 30, opacity: 0, delay: 1 });



  
}


// Display Dynamic Page Name
function displayPageName() {
    const pageName = document.title; // Fetch page title
    const excludedPhrases = ["Architectural Heritage Division", "INTACH", "-", ","]; // Phrases to exclude

    // Filter out excluded phrases
    let filteredTitle = pageName;
    excludedPhrases.forEach((phrase) => {
        filteredTitle = filteredTitle.replace(phrase, "").trim(); // Remove excluded phrases and trim whitespace
    });

    const pageNameElement = document.querySelector(".page-name");
    if (pageNameElement) {
        pageNameElement.textContent = filteredTitle; // Display dynamic text
    }
}

// Offcanvas Menu Animations
function setupOffcanvasMenu() {
    const fullPageMenu = document.getElementById("offcanvasDarkNavbar");
    const navbarToggler = document.querySelector(".navbar-toggler");

    // Toggle navbar-toggler icon
    const toggleNavbarTogglerIcon = (showCloseIcon) => {
        navbarToggler.classList.toggle("active", showCloseIcon);
    };

    fullPageMenu.addEventListener("show.bs.offcanvas", () => {
        gsap.fromTo(
            fullPageMenu,
            { opacity: 0 },
            { duration: 1, opacity: 1, backgroundColor: "rgba(0, 0, 0, 1)", ease: "power2.out" }
        );
        toggleNavbarTogglerIcon(true);
    });

    fullPageMenu.addEventListener("hide.bs.offcanvas", () => {
        gsap.to(fullPageMenu, {
            duration: 1,
            opacity: 0,
            ease: "power2.in",
            onComplete: () => {
                fullPageMenu.style.removeProperty("background-color");
            },
        });
        toggleNavbarTogglerIcon(false);
    });
}



// Initialize Everything on Page Load
document.addEventListener("DOMContentLoaded", () => {
    enableSmoothVerticalScroll();
    applyAnimations();
    displayPageName();
    setupOffcanvasMenu();
});


