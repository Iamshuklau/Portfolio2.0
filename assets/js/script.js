'use strict';
// element toggle function
const elementToggleFunc = (elem) => {
    elem.classList.toggle("active");
};
// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", () => {
    elementToggleFunc(sidebar);
});
// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
// modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
// modal toggle function
const testimonialsModalFunc = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};
// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
        const avatar = this.querySelector("[data-testimonials-avatar]");
        const title = this.querySelector("[data-testimonials-title]");
        const text = this.querySelector("[data-testimonials-text]");
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
        modalTitle.innerHTML = title.innerHTML;
        modalText.innerHTML = text.innerHTML;
    testimonialsModalFunc();
  });
}
// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);
// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
select.addEventListener("click", function () {
    elementToggleFunc(this);
});
// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
        const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}
// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterFunc = (selectedValue) => {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
        }
        else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
        }
        else {
      filterItems[i].classList.remove("active");
    }
  }
};
// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
        const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}
// Contact form submission with Resend API
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", () => {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
        }
        else {
      formBtn.setAttribute("disabled", "");
    }
  });
}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(form);
    const contactData = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    // Disable form button and show loading state
    formBtn.setAttribute("disabled", "");
    const originalBtnText = formBtn.querySelector('span')?.textContent || 'Send Message';
    const btnSpan = formBtn.querySelector('span');
    btnSpan.textContent = 'Sending...';
    try {
            // Send email using your backend endpoint
    const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData)
        });
        if (response.ok) {
            // Success - show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            formBtn.setAttribute("disabled", "");
            
            // Track contact form submission
            if (typeof window.va !== 'undefined') {
                window.va('track', 'Contact Form Submitted');
            }
        }
        else {
            throw new Error('Failed to send message');
        }
    }
    catch (error) {
        console.error('Error sending email:', error);
        showNotification('Failed to send message. Please try again or contact me directly.', 'error');
    }
    finally {
        // Reset button state
        btnSpan.textContent = originalBtnText;
        // Re-check form validity to enable/disable button properly
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        }
    }
});
// Notification function
const showNotification = (message, type) => {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      max-width: 400px;
      animation: slideIn 0.3s ease-out;
    }
    .notification.success {
      background: #10b981;
    }
    .notification.error {
      background: #ef4444;
    }
    .notification-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .notification-close {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @media (max-width: 600px) {
      .notification {
        left: 20px;
        right: 20px;
        max-width: none;
      }
    }
  `;
    // Add styles to head if not already added
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    // Add to body
    document.body.appendChild(notification);
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
};
// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.innerHTML.toLowerCase();
    for (let i = 0; i < pages.length; i++) {
      if (pageName === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
        
        // Track page navigation
        if (typeof window.va !== 'undefined') {
          window.va('track', `Page View: ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`);
        }
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
    
    // Update liquid glass animation for mobile
    updateLiquidGlassAnimation();
  });
}

// Simple Fixed Glass Animation for Mobile Navigation
function updateLiquidGlassAnimation() {
  // Only run on mobile devices
  if (window.innerWidth > 768) {
    return;
  }
  
  const navbarList = document.querySelector('.navbar-list');
  const activeNavLink = document.querySelector('.navbar-link.active');
  
  if (!navbarList || !activeNavLink) return;
  
  const left = activeNavLink.offsetLeft;
  const width = activeNavLink.offsetWidth;

  navbarList.style.setProperty('--liquid-glass-left', `${left}px`);
  navbarList.style.setProperty('--liquid-glass-width', `${width}px`);
  navbarList.style.setProperty('--liquid-glass-opacity', '1');
}

// Enhanced initialization with better timing
document.addEventListener('DOMContentLoaded', function() {
  // Wait for layout to be ready
  setTimeout(() => {
    updateLiquidGlassAnimation();
    
    // Pre-warm the animation
    const navbarList = document.querySelector('.navbar-list');
    if (navbarList && window.innerWidth <= 768) {
      navbarList.style.willChange = 'transform';
      
      // Clean up will-change after animations
      setTimeout(() => {
        navbarList.style.willChange = 'auto';
      }, 1000);
    }
  }, 200);
  
  // Debounced resize handler with improved performance
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateLiquidGlassAnimation();
    }, 100);
  });
});

// Enhanced mobile touch interactions with better timing
if ('ontouchstart' in window) {
  navigationLinks.forEach((link, index) => {
    let touchStartTime;
    
    link.addEventListener('touchstart', function(e) {
      touchStartTime = Date.now();
      // Smoother touch feedback
      this.style.transform = 'scale(0.98)';
      this.style.transition = 'transform 0.1s ease-out';
    }, { passive: true });
    
    link.addEventListener('touchend', function(e) {
      const touchDuration = Date.now() - touchStartTime;
      
      // Restore transform with appropriate timing
      this.style.transition = `transform ${touchDuration < 150 ? '0.2s' : '0.3s'} cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
      this.style.transform = '';
      
      // Clean up transition after animation
      setTimeout(() => {
        this.style.transition = '';
      }, 300);
    }, { passive: true });
    
    // Prevent unwanted hover states on touch devices
    link.addEventListener('touchcancel', function(e) {
      this.style.transform = '';
      this.style.transition = '';
    }, { passive: true });
  });
}

// Service modal functionality
const serviceItems = document.querySelectorAll("[data-service-item]");
const serviceModalContainer = document.querySelector("[data-service-modal-container]");
const serviceModalCloseBtn = document.querySelector("[data-service-modal-close-btn]");
const serviceOverlay = document.querySelector("[data-service-overlay]");
// service modal elements
const serviceModalImg = document.querySelector("[data-service-modal-img]");
const serviceModalTitle = document.querySelector("[data-service-modal-title]");
const serviceModalText = document.querySelector("[data-service-modal-text]");
// service modal toggle function
const toggleServiceModal = () => {
  serviceModalContainer.classList.toggle("active");
  serviceOverlay.classList.toggle("active");
};
// add click event to all service items
for (let i = 0; i < serviceItems.length; i++) {
    serviceItems[i].addEventListener("click", function () {
        const serviceIcon = this.querySelector(".service-icon-box img");
        const serviceTitle = this.querySelector(".service-item-title");
        const serviceDetailedContent = this.querySelector(".service-modal-content");
        serviceModalImg.src = serviceIcon.src;
        serviceModalImg.alt = serviceTitle.innerHTML;
        serviceModalTitle.innerHTML = serviceTitle.innerHTML;
        serviceModalText.innerHTML = serviceDetailedContent.innerHTML;
    toggleServiceModal();
  });
}
// add click event to service modal close button and overlay
if (serviceModalCloseBtn) {
  serviceModalCloseBtn.addEventListener("click", toggleServiceModal);
}
if (serviceOverlay) {
  serviceOverlay.addEventListener("click", toggleServiceModal);
}
// Blog modal functionality
const blogItems = document.querySelectorAll(".blog-post-item .blog-card");
const blogModalContainer = document.querySelector("[data-blog-modal-container]");
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogOverlay = document.querySelector("[data-blog-overlay]");
// blog modal elements
const blogModalImg = document.querySelector("[data-blog-modal-img]");
const blogModalTitle = document.querySelector("[data-blog-modal-title]");
const blogModalText = document.querySelector("[data-blog-modal-text]");
const blogModalCategory = document.querySelector("[data-blog-modal-category]");
const blogModalDate = document.querySelector("[data-blog-modal-date]");
// blog modal toggle function
const blogModalFunc = () => {
  blogModalContainer.classList.toggle("active");
  blogOverlay.classList.toggle("active");
};
// add click event to all blog cards only
for (let i = 0; i < blogItems.length; i++) {
    blogItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    const parent = this.closest(".blog-post-item");
        const blogImg = this.querySelector(".blog-banner-box img");
        const blogTitle = this.querySelector(".blog-item-title");
        const blogContent = parent.querySelector(".blog-modal-content");
        const blogCategory = this.querySelector(".blog-category");
    const blogDateElement = this.querySelector("time");
    const blogDate = blogDateElement.innerHTML;
        const blogDateTime = blogDateElement.getAttribute("datetime") || "";
        blogModalImg.src = blogImg.src;
        blogModalImg.alt = blogTitle.innerHTML;
        blogModalTitle.innerHTML = blogTitle.innerHTML;
        blogModalText.innerHTML = blogContent.innerHTML;
    if (blogModalCategory) {
            blogModalCategory.innerHTML = blogCategory.innerHTML;
    }
    if (blogModalDate) {
      blogModalDate.innerHTML = blogDate;
      blogModalDate.setAttribute("datetime", blogDateTime);
    }
    blogModalFunc();
  });
}
// add click event to blog modal close button and overlay
if (blogModalCloseBtn) {
  blogModalCloseBtn.addEventListener("click", blogModalFunc);
}
if (blogOverlay) {
  blogOverlay.addEventListener("click", blogModalFunc);
}
// Animated title functionality
const titles = [
  "Software Developer",
  "AI/ML Enthusiast", 
  "Full Stack Engineer",
  "Cloud Developer",
  "Problem Solver",
  "Tech Innovator"
];
let currentTitleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typeSpeed = 50; // OPTIMIZED: Faster typing for better UX
const typeWriter = () => {
  const animatedTitle = document.getElementById('animated-title');
    if (!animatedTitle)
        return;
  const currentTitle = titles[currentTitleIndex];
  if (isDeleting) {
    // Removing characters
    animatedTitle.textContent = currentTitle.substring(0, currentCharIndex - 1);
    currentCharIndex--;
        typeSpeed = 25; // OPTIMIZED: Much faster deletion
    }
    else {
    // Adding characters
    animatedTitle.textContent = currentTitle.substring(0, currentCharIndex + 1);
    currentCharIndex++;
        typeSpeed = 50; // OPTIMIZED: Faster typing
  }
  // When word is complete
  if (!isDeleting && currentCharIndex === currentTitle.length) {
        typeSpeed = 1500; // OPTIMIZED: Shorter pause
    isDeleting = true;
  }
  // When word is completely deleted
  else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        typeSpeed = 200; // OPTIMIZED: Much shorter pause
    }
    setTimeout(typeWriter, typeSpeed);
};
// Helper function to get star color for dark theme
const getStarColor = () => {
    return Math.random() > 0.8 ? 'rgba(255, 215, 100, 1)' : '#ffffff'; // White/golden for dark mode
};



// Start the animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeWriter, 1000); // Start after 1 second
    initConstellation();
    initScrollAnimations();
    initEnhancedInteractions();
    
    // Initialize Vercel Analytics
    if (typeof window.va !== 'undefined') {
        window.va('page_view');
    }
});
// Constellation Canvas Animation - OPTIMIZED: Disable on mobile for better performance
const initConstellation = () => {
    // Skip animation on mobile devices for better performance
    if (window.innerWidth < 768) {
        return;
    }
    
  const canvas = document.getElementById('constellation-canvas');
    if (!canvas)
        return;
  const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
  let animationId;
    const mouse = { x: 0, y: 0 };
  // Set canvas size
    const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  // Mouse tracking
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
      // Stars array - OPTIMIZED: Reduced number of stars for better performance
  const stars = [];
  const numStars = Math.min(window.innerWidth < 768 ? 30 : 50, 60); // Reduced from 80-120 to 30-50
  const maxDistance = window.innerWidth < 768 ? 80 : 120; // Reduced connection distance
  const mouseInteractionDistance = 150; // Reduced interaction range
    // Create stars - IMPROVED: Better variety and brightness
  for (let i = 0; i < numStars; i++) {
        const star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      originalX: 0,
      originalY: 0,
            vx: (Math.random() - 0.5) * 0.2, // Slower movement
            vy: (Math.random() - 0.5) * 0.2,
            radius: Math.random() * 2 + 1.5, // More consistent size
            opacity: Math.random() * 0.3 + 0.8, // BRIGHTER range (0.8-1.1)
            twinkle: Math.random() * Math.PI * 2,
            brightness: Math.random() * 0.5 + 1.0, // Extra brightness factor
            color: getStarColor() // Dynamic color based on theme
        };
    // Store original position
        star.originalX = star.x;
        star.originalY = star.y;
        stars.push(star);
    }
    // Animation function - HEAVILY OPTIMIZED
    let frameCount = 0;
    const animate = () => {
        frameCount++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Update and draw stars - OPTIMIZED: Simplified rendering
        stars.forEach((star) => {
            // Update twinkle effect - OPTIMIZED: Less frequent updates
            if (frameCount % 3 === 0) { // Update every 3rd frame
                star.twinkle += 0.01; // Reduced from 0.02
            }
            const twinkleOpacity = 0.8 + Math.sin(star.twinkle) * 0.2; // Simplified calculation
            
            // Mouse interaction - OPTIMIZED: Simplified distance calculation
      const dx = mouse.x - star.x;
      const dy = mouse.y - star.y;
            const distanceSquared = dx * dx + dy * dy; // Avoid sqrt for performance
            
            if (distanceSquared < mouseInteractionDistance * mouseInteractionDistance) {
                const force = 0.005; // Simplified force calculation
                star.x -= dx * force;
                star.y -= dy * force;
      } else {
                // Return to original position - OPTIMIZED: Simpler calculation
                star.x += (star.originalX - star.x) * 0.01; // Reduced from 0.02
                star.y += (star.originalY - star.y) * 0.01;
            }
            
            // Update position with drift - OPTIMIZED: Less frequent updates
            if (frameCount % 5 === 0) { // Update every 5th frame
      star.originalX += star.vx;
      star.originalY += star.vy;
      
      // Wrap around edges
      if (star.originalX < 0) star.originalX = canvas.width;
      if (star.originalX > canvas.width) star.originalX = 0;
      if (star.originalY < 0) star.originalY = canvas.height;
      if (star.originalY > canvas.height) star.originalY = 0;
            }
            
            // Draw star - OPTIMIZED: Bright stars with simple glow
            const brightness = star.opacity * twinkleOpacity * star.brightness;
            
            // Draw outer glow (bigger, dimmer)
            ctx.globalAlpha = brightness * 0.3;
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw main star (bright and solid)
            ctx.globalAlpha = brightness * 1.2; // MUCH BRIGHTER
            ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
            
            // Draw bright core
            ctx.globalAlpha = 1; // Maximum brightness for core
            const coreColor = star.color === '#ffffff' ? '#ffffff' : 'rgba(255, 255, 255, 0.9)';
            ctx.fillStyle = coreColor;
      ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
      
            ctx.globalAlpha = 1; // Reset alpha
        });
        // Draw constellation lines - OPTIMIZED: Brighter lines, better visibility
        if (frameCount % 2 === 0) { // Draw lines every other frame
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'; // White line colors for dark mode
            ctx.lineWidth = 1.5; // Slightly thicker
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.shadowBlur = 2;
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
                    const distanceSquared = dx * dx + dy * dy; // Avoid sqrt
                    
                    if (distanceSquared < maxDistance * maxDistance) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.stroke();
                    }
                }
            }
        }
        // Draw lines to mouse cursor - OPTIMIZED: Bright interactive lines
        if (mouse.x && mouse.y && frameCount % 2 === 0) { // Draw every other frame
            ctx.strokeStyle = 'rgba(255, 192, 37, 0.7)'; // Orange interactive lines for dark mode
            ctx.lineWidth = 2; // Thicker lines
            ctx.shadowColor = 'rgba(255, 192, 37, 0.8)';
            ctx.shadowBlur = 3;
            stars.forEach((star) => {
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
                const distanceSquared = dx * dx + dy * dy; // Avoid sqrt
                
                if (distanceSquared < mouseInteractionDistance * mouseInteractionDistance) {
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
             
             // Reset shadow settings
             ctx.shadowColor = 'transparent';
             ctx.shadowBlur = 0;
    }
    
    animationId = requestAnimationFrame(animate);
     };
  animate();
    // Store cleanup function globally for theme switching
    window.constellationCleanup = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
        window.removeEventListener('resize', resizeCanvas);
        document.removeEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
    };
    
    // Return cleanup function
    return window.constellationCleanup;
};
// SCROLL-TRIGGERED ANIMATIONS
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.service-item, .testimonials-item, .project-item, .blog-post-item, .timeline-item, .content-card'
  );
  
  animateElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
}

// ENHANCED INTERACTIONS
function initEnhancedInteractions() {
  // REMOVED PARALLAX EFFECT - Keep sidebar and avatar stable

  // REMOVED IMAGE MOVEMENT EFFECTS - Keep images stable

  // ENHANCED BUTTON RIPPLE EFFECTS
  const buttons = document.querySelectorAll('button, .navbar-link');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 192, 37, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
          @keyframes ripple {
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}


