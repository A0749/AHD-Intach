// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);



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

// Animation for elements using GSAP
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
    animateElement(".hero-content", { xValue: -30, duration: 0.8, delay: 0.8 });
    animateElement(".bottom-content", { yValue: 30, opacity: 0, duration: 1.5 });
    animateElement(".left-gallery", { yValue: -30, duration: 1, delay: 0.6 });

    // Hero section animations
    animateElement(".text-content h2", { yValue: 30, duration: 0.8 });
    animateElement(".text-content h4", { yValue: 30, duration: 0.8 });
    animateElement(".right-gallery", { yValue: 30, opacity: 0, delay: 1.5 });

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

// Mouse Enter/Leave for Video Play/Pause in .block
function setupVideoPlayPause() {
    document.querySelectorAll('.block').forEach(block => {
        block.addEventListener('mouseenter', () => {
            const video = block.querySelector('video');
            if (video) {
                video.play();
            }
        });
        block.addEventListener('mouseleave', () => {
            const video = block.querySelector('video');
            if (video) {
                video.pause();
            }
        });
    });
}

// Initialize Everything on Page Load
document.addEventListener("DOMContentLoaded", () => {
    applyAnimations();
    displayPageName();
    setupOffcanvasMenu();
    setupVideoPlayPause();  // Add this to initialize video mouseenter/mouseleave
});

// Initialize Swup.js (for page transitions)
document.addEventListener("DOMContentLoaded", () => {
    const swup = new Swup({
        plugins: [new SwupSlideTheme()] // Optional slide animation
    });
});


// New stuffs for Listings 
document.addEventListener("DOMContentLoaded", function () {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.registerPlugin(ScrollTrigger);

    gsap.ticker.lagSmoothing(0);

    // Independent paragraph animations
    const animateParagraphs = () => {
        const paragraphs = gsap.utils.toArray("p, h1, h3, img");
        paragraphs.forEach((paragraph) => {
            gsap.set(paragraph, { opacity: 0, y: 50 }); // Initially hide paragraphs

            ScrollTrigger.create({
                trigger: paragraph,
                start: "top 80%", // Adjust trigger position based on viewport
                end: "top 60%",
                toggleActions: "play none none reverse",
                onEnter: () => {
                    gsap.to(paragraph, {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power3.out",
                    });
                },
                onLeaveBack: () => {
                    gsap.to(paragraph, {
                        opacity: 0,
                        y: 50,
                        duration: 1.5,
                        ease: "power3.out",
                    });
                },
            });
        });
    };

    
    // Initialize animations
    animateParagraphs();

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();
});

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
  
    const cursorText = document.createElement('div');
    cursorText.className = 'cursor-text';
    cursor.appendChild(cursorText);
  
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  
    // Loop through elements with data-cursor attribute
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', (e) => {
        // Ensure that if the target or any ancestor has data-no-cursor, we don't show the text
        if (!e.target.closest('[data-no-cursor]')) {
          cursor.classList.add('hover');
          cursorText.textContent = el.getAttribute('data-cursor');
        }
      });
  
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorText.textContent = '';
      });
  
      // Handle hovering over the child elements
      el.querySelectorAll('[data-no-cursor]').forEach((child) => {
        child.addEventListener('mouseenter', () => {
          cursor.classList.remove('hover');
          cursorText.textContent = ''; // Clear the text when hovering over elements with data-no-cursor
        });
      });
  
      el.querySelectorAll('[data-no-cursor]').forEach((child) => {
        child.addEventListener('mouseleave', () => {
          cursor.classList.add('hover');
          cursorText.textContent = el.getAttribute('data-cursor'); // Restore the parent cursor text
        });
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const scrollCircle = document.querySelector(".scroll-circle");
  
    let isScrolling; // To detect if scrolling is happening
    let previousScroll = window.scrollY;
  
    // Function to check if the user is at the bottom of the page
    const isAtBottom = () => {
      return (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 5
      );
    };
  
    // Function to check if the user is at the top of the page
    const isAtTop = () => {
      return window.scrollY <= 0;
    };
  
    // Function to hide the scroll circle
    const hideScrollCircle = () => {
      scrollCircle.classList.add("hidden");
    };
  
    // Function to show the scroll circle
    const showScrollCircle = () => {
      scrollCircle.classList.remove("hidden");
    };
  
    // Scroll event listener
    window.addEventListener("scroll", () => {
      clearTimeout(isScrolling);
  
      // Detect upward scrolling or when user stops scrolling at top/bottom
      const currentScroll = window.scrollY;
  
      // Show scroll circle only if the user reaches the top
      if (isAtTop()) {
        showScrollCircle();
      } else {
        hideScrollCircle();
      }
  
      // Store the current scroll position
      previousScroll = currentScroll;
  
      // Wait for scrolling to stop, then check if we need to show the circle
      isScrolling = setTimeout(() => {
        if (!isAtBottom() && !isAtTop()) {
          showScrollCircle(); // Show it when the scroll stops, except when at the bottom
        }
      }, 500); // Timeout to detect scrolling stop
    });
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.expandable-image');
    const modal = document.querySelector('.fullscreen-modal');
    const fullscreenImage = document.querySelector('.fullscreen-image');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const allImages = Array.from(images); // All images across the page
    let currentIndex = 0;
  
    // Function to open the full-screen modal with the clicked image
    const openModal = (index) => {
      modal.style.display = 'flex';
      fullscreenImage.src = allImages[index].src; // Set the clicked image to the modal
      currentIndex = index;
  
      // Animate modal appearance
      gsap.from(modal, { opacity: 0, duration: 0.5, ease: "power3.out" });
      gsap.from(fullscreenImage, { scale: 0.8, duration: 0.5, ease: "power3.out" });
    };
  
    // Close the modal when clicked outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        gsap.to(modal, { opacity: 0, duration: 0.3, ease: "power3.in" });
        gsap.to(fullscreenImage, { scale: 0.8, duration: 0.3, ease: "power3.in", onComplete: () => modal.style.display = 'none' });
      }
    });
  
    // Add click event to images to open the modal
    images.forEach((image, index) => {
      image.addEventListener('click', () => openModal(index));
    });
  
    // Navigation buttons for slider
    const updateImage = (direction) => {
      if (direction === 'prev') {
        currentIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
      } else if (direction === 'next') {
        currentIndex = currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
      }
      fullscreenImage.src = allImages[currentIndex].src;
  
      // Animate image transition
      gsap.from(fullscreenImage, { scale: 0.8, duration: 0.5, ease: "power3.out" });
    };
  
    prevButton.addEventListener('click', () => updateImage('prev'));
    nextButton.addEventListener('click', () => updateImage('next'));
  });
  