'use strict';

// Type definitions for DOM elements
interface HTMLElementWithDataset extends HTMLElement {
  dataset: DOMStringMap;
}

// Contact form data interface
interface ContactFormData {
  fullname: string;
  email: string;
  message: string;
}

// Notification type
type NotificationType = 'success' | 'error';

// Mouse interface for constellation
interface Mouse {
  x: number;
  y: number;
}

// Star interface for constellation
interface Star {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  twinkle: number;
}

// element toggle function
const elementToggleFunc = (elem: HTMLElement): void => { 
  elem.classList.toggle("active"); 
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]") as HTMLElement;
const sidebarBtn = document.querySelector("[data-sidebar-btn]") as HTMLElement;

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", (): void => { 
  elementToggleFunc(sidebar); 
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]") as NodeListOf<HTMLElement>;
const modalContainer = document.querySelector("[data-modal-container]") as HTMLElement;
const modalCloseBtn = document.querySelector("[data-modal-close-btn]") as HTMLElement;
const overlay = document.querySelector("[data-overlay]") as HTMLElement;

// modal variables
const modalImg = document.querySelector("[data-modal-img]") as HTMLImageElement;
const modalTitle = document.querySelector("[data-modal-title]") as HTMLElement;
const modalText = document.querySelector("[data-modal-text]") as HTMLElement;

// modal toggle function
const testimonialsModalFunc = (): void => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function(): void {
    const avatar = this.querySelector("[data-testimonials-avatar]") as HTMLImageElement;
    const title = this.querySelector("[data-testimonials-title]") as HTMLElement;
    const text = this.querySelector("[data-testimonials-text]") as HTMLElement;
    
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
const select = document.querySelector("[data-select]") as HTMLElement;
const selectItems = document.querySelectorAll("[data-select-item]") as NodeListOf<HTMLElement>;
const selectValue = document.querySelector("[data-selecct-value]") as HTMLElement;
const filterBtn = document.querySelectorAll("[data-filter-btn]") as NodeListOf<HTMLElement>;

select.addEventListener("click", function(): void { 
  elementToggleFunc(this); 
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function(): void {
    const selectedValue: string = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]") as NodeListOf<HTMLElementWithDataset>;

const filterFunc = (selectedValue: string): void => {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn: HTMLElement = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function(): void {
    const selectedValue: string = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Contact form submission with Resend API
const form = document.querySelector("[data-form]") as HTMLFormElement;
const formInputs = document.querySelectorAll("[data-form-input]") as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
const formBtn = document.querySelector("[data-form-btn]") as HTMLButtonElement;

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", (): void => {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

form.addEventListener("submit", async (e: Event): Promise<void> => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(form);
  const contactData: ContactFormData = {
    fullname: formData.get('fullname') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string
  };
  
  // Disable form button and show loading state
  formBtn.setAttribute("disabled", "");
  const originalBtnText = formBtn.querySelector('span')?.textContent || 'Send Message';
  const btnSpan = formBtn.querySelector('span') as HTMLElement;
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
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error: any) {
    console.error('Error sending email:', error);
    showNotification('Failed to send message. Please try again or contact me directly.', 'error');
  } finally {
    // Reset button state
    btnSpan.textContent = originalBtnText;
    // Re-check form validity to enable/disable button properly
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    }
  }
});

// Notification function
const showNotification = (message: string, type: NotificationType): void => {
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
  const closeBtn = notification.querySelector('.notification-close') as HTMLElement;
  closeBtn.addEventListener('click', (): void => {
    notification.remove();
  });
  
  // Auto remove after 5 seconds
  setTimeout((): void => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]") as NodeListOf<HTMLElement>;
const pages = document.querySelectorAll("[data-page]") as NodeListOf<HTMLElementWithDataset>;

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function(): void {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Service modal functionality
const serviceItems = document.querySelectorAll("[data-service-item]") as NodeListOf<HTMLElement>;
const serviceModalContainer = document.querySelector("[data-service-modal-container]") as HTMLElement;
const serviceModalCloseBtn = document.querySelector("[data-service-modal-close-btn]") as HTMLElement;
const serviceOverlay = document.querySelector("[data-service-overlay]") as HTMLElement;

// service modal elements
const serviceModalImg = document.querySelector("[data-service-modal-img]") as HTMLImageElement;
const serviceModalTitle = document.querySelector("[data-service-modal-title]") as HTMLElement;
const serviceModalText = document.querySelector("[data-service-modal-text]") as HTMLElement;

// service modal toggle function
const toggleServiceModal = (): void => {
  serviceModalContainer.classList.toggle("active");
  serviceOverlay.classList.toggle("active");
}

// add click event to all service items
for (let i = 0; i < serviceItems.length; i++) {
  serviceItems[i].addEventListener("click", function(): void {
    const serviceIcon = this.querySelector(".service-icon-box img") as HTMLImageElement;
    const serviceTitle = this.querySelector(".service-item-title") as HTMLElement;
    const serviceDetailedContent = this.querySelector(".service-modal-content") as HTMLElement;

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
const blogItems = document.querySelectorAll(".blog-post-item .blog-card") as NodeListOf<HTMLElement>;
const blogModalContainer = document.querySelector("[data-blog-modal-container]") as HTMLElement;
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]") as HTMLElement;
const blogOverlay = document.querySelector("[data-blog-overlay]") as HTMLElement;

// blog modal elements
const blogModalImg = document.querySelector("[data-blog-modal-img]") as HTMLImageElement;
const blogModalTitle = document.querySelector("[data-blog-modal-title]") as HTMLElement;
const blogModalText = document.querySelector("[data-blog-modal-text]") as HTMLElement;
const blogModalCategory = document.querySelector("[data-blog-modal-category]") as HTMLElement;
const blogModalDate = document.querySelector("[data-blog-modal-date]") as HTMLTimeElement;

// blog modal toggle function
const blogModalFunc = (): void => {
  blogModalContainer.classList.toggle("active");
  blogOverlay.classList.toggle("active");
}

// add click event to all blog cards only
for (let i = 0; i < blogItems.length; i++) {
  blogItems[i].addEventListener("click", function(e: Event): void {
    e.preventDefault();
    const parent = this.closest(".blog-post-item") as HTMLElement;
    const blogImg = this.querySelector(".blog-banner-box img") as HTMLImageElement;
    const blogTitle = this.querySelector(".blog-item-title") as HTMLElement;
    const blogContent = parent.querySelector(".blog-modal-content") as HTMLElement;
    const blogCategory = this.querySelector(".blog-category") as HTMLElement;
    const blogDateElement = this.querySelector("time") as HTMLTimeElement;
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
const titles: string[] = [
  "Software Developer",
  "AI/ML Enthusiast", 
  "Full Stack Engineer",
  "Cloud Developer",
  "Problem Solver",
  "Tech Innovator"
];

let currentTitleIndex: number = 0;
let currentCharIndex: number = 0;
let isDeleting: boolean = false;
let typeSpeed: number = 100;

const typeWriter = (): void => {
  const animatedTitle = document.getElementById('animated-title') as HTMLElement;
  if (!animatedTitle) return;

  const currentTitle: string = titles[currentTitleIndex];
  
  if (isDeleting) {
    // Removing characters
    animatedTitle.textContent = currentTitle.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    typeSpeed = 50; // Faster when deleting
  } else {
    // Adding characters
    animatedTitle.textContent = currentTitle.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    typeSpeed = 100; // Normal speed when typing
  }

  // When word is complete
  if (!isDeleting && currentCharIndex === currentTitle.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  }
  // When word is completely deleted
  else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
    typeSpeed = 500; // Pause before next word
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start the animation when page loads
document.addEventListener('DOMContentLoaded', (): void => {
  setTimeout(typeWriter, 1000); // Start after 1 second
  
  // Initialize Vercel Analytics
  if (typeof (window as any).va !== 'undefined') {
    (window as any).va('page_view');
  }
});

// Constellation Canvas Animation
const initConstellation = (): (() => void) | void => {
  const canvas = document.getElementById('constellation-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  let animationId: number;
  const mouse: Mouse = { x: 0, y: 0 };
  
  // Set canvas size
  const resizeCanvas = (): void => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Mouse tracking
  document.addEventListener('mousemove', (e: MouseEvent): void => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  // Stars array
  const stars: Star[] = [];
  const numStars: number = Math.min(window.innerWidth < 768 ? 80 : 120, 150);
  const maxDistance: number = window.innerWidth < 768 ? 100 : 150;
  const mouseInteractionDistance: number = 200;
  
  // Create stars
  for (let i = 0; i < numStars; i++) {
    const star: Star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      originalX: 0,
      originalY: 0,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.4 + 0.7,
      twinkle: Math.random() * Math.PI * 2
    };
    
    // Store original position
    star.originalX = star.x;
    star.originalY = star.y;
    stars.push(star);
  }
  
  // Animation function
  const animate = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw stars
    stars.forEach((star: Star): void => {
      // Update twinkle effect
      star.twinkle += 0.02;
      const twinkleOpacity: number = Math.sin(star.twinkle) * 0.3 + 0.7;
      
      // Mouse interaction
      const dx: number = mouse.x - star.x;
      const dy: number = mouse.y - star.y;
      const distance: number = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouseInteractionDistance) {
        const force: number = (mouseInteractionDistance - distance) / mouseInteractionDistance;
        star.x -= dx * force * 0.01;
        star.y -= dy * force * 0.01;
      } else {
        // Return to original position slowly
        star.x += (star.originalX - star.x) * 0.02;
        star.y += (star.originalY - star.y) * 0.02;
      }
      
      // Update position with drift
      star.originalX += star.vx;
      star.originalY += star.vy;
      
      // Wrap around edges
      if (star.originalX < 0) star.originalX = canvas.width;
      if (star.originalX > canvas.width) star.originalX = 0;
      if (star.originalY < 0) star.originalY = canvas.height;
      if (star.originalY > canvas.height) star.originalY = 0;
      
      // Draw star with twinkle effect and enhanced glow
      ctx.save();
      ctx.shadowColor = 'rgba(255, 255, 255, 1)';
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      
      // Create gradient for glow effect
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 4);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${Math.min(star.opacity * twinkleOpacity * 1.2, 1)})`);
      gradient.addColorStop(0.1, `rgba(255, 255, 255, ${star.opacity * twinkleOpacity * 0.9})`);
      gradient.addColorStop(0.3, `rgba(255, 255, 255, ${star.opacity * twinkleOpacity * 0.6})`);
      gradient.addColorStop(0.6, `rgba(255, 255, 255, ${star.opacity * twinkleOpacity * 0.3})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add extra bright core
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(star.opacity * twinkleOpacity * 1.5, 1)})`;
      ctx.fill();
      
      ctx.restore();
    });
    
    // Draw constellation lines
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx: number = stars[i].x - stars[j].x;
        const dy: number = stars[i].y - stars[j].y;
        const distance: number = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity: number = (maxDistance - distance) / maxDistance;
          
          ctx.save();
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowBlur = 3;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    
    // Draw lines to mouse cursor with enhanced glow
    if (mouse.x && mouse.y) {
      stars.forEach((star: Star): void => {
        const dx: number = mouse.x - star.x;
        const dy: number = mouse.y - star.y;
        const distance: number = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseInteractionDistance) {
          const opacity: number = (mouseInteractionDistance - distance) / mouseInteractionDistance;
          
          ctx.save();
          ctx.shadowColor = 'rgba(255, 192, 37, 1)';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 192, 37, ${opacity * 0.6})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.restore();
        }
      });
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  animate();
  
  // Cleanup function
  return (): void => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}

// Initialize constellation when DOM is loaded
document.addEventListener('DOMContentLoaded', (): void => {
  // Small delay to ensure other animations are set up
  setTimeout(initConstellation, 500);
}); 