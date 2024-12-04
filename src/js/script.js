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
    animateElement(".bottom-nav", { yValue: 30, opacity: 0, delay: 1 });
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

  const cursorImage = document.createElement('img');
  cursorImage.className = 'cursor-image';
  cursor.appendChild(cursorImage);

  // Default state of cursor (no text, no image)
  cursorText.textContent = '';
  cursorImage.src = '';

  document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
  });

  // Loop through all elements that may have custom cursor behavior
  document.querySelectorAll('[data-text], [data-img], [data-bgcolor]').forEach((el) => {
      el.addEventListener('mouseenter', (e) => {
          // Get attributes for text, image, and background color
          const dataText = el.getAttribute('data-text');
          const dataImg = el.getAttribute('data-img');
          const dataBgColor = el.getAttribute('data-bgcolor');
          
          // If background color is defined, change the cursor's background color
          if (dataBgColor) {
              cursor.style.backgroundColor = dataBgColor;
              cursorText.textContent = '';  // No text when using background color
              cursorImage.src = '';  // No image when using background color
              cursorImage.style.display = 'none';  // Hide image
          } else {
              cursor.style.backgroundColor = '';  // Reset background color

              // If image is set
              if (dataImg) {
                  cursorImage.src = dataImg;  // Set the cursor's image
                  cursorImage.style.display = 'block';  // Show the image
                  cursorText.textContent = '';  // Clear text when showing an image
              } else {
                  cursorImage.src = '';  // Clear image if no image is set
                  cursorImage.style.display = 'none';  // Hide image
              }

              // If text is set
              if (dataText) {
                  cursorText.textContent = dataText;  // Set the cursor's text
                  cursorImage.style.display = 'none';  // Hide image if text is shown
              }
          }

          cursor.classList.add('hover');
      });

      el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hover');
          cursorText.textContent = '';  // Clear text
          cursorImage.src = '';  // Clear image
          cursorImage.style.display = 'none';  // Hide image
          cursor.style.backgroundColor = '';  // Reset background color
      });

      // Handle child elements with data-no-cursor (if any)
      el.querySelectorAll('[data-no-cursor]').forEach((child) => {
          child.addEventListener('mouseenter', () => {
              cursor.classList.remove('hover');
              cursorText.textContent = '';  // Clear text
              cursorImage.src = '';  // Clear image
              cursorImage.style.display = 'none';  // Hide image
              cursor.style.backgroundColor = '';  // Reset background color
          });
      });

      el.querySelectorAll('[data-no-cursor]').forEach((child) => {
          child.addEventListener('mouseleave', () => {
              cursor.classList.add('hover');
              const dataText = el.getAttribute('data-text');
              const dataImg = el.getAttribute('data-img');
              const dataBgColor = el.getAttribute('data-bgcolor');

              if (dataBgColor) {
                  cursor.style.backgroundColor = dataBgColor;
                  cursorText.textContent = '';  // No text when using background color
                  cursorImage.src = '';  // No image when using background color
              } else {
                  cursor.style.backgroundColor = '';  // Reset background color
                  if (dataImg) {
                      cursorImage.src = dataImg;  // Set the cursor's image
                      cursorImage.style.display = 'block';
                      cursorText.textContent = '';  // No text with image
                  } else {
                      cursorImage.src = '';  // No image
                      cursorImage.style.display = 'none';
                  }

                  if (dataText) {
                      cursorText.textContent = dataText;  // Set the cursor's text
                      cursorImage.style.display = 'none';  // Hide image if text is present
                  }
              }
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
  