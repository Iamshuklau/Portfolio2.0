// Portfolio Website - HTML Includes Loader
// This script loads modular HTML files into the main page

document.addEventListener('DOMContentLoaded', function() {
    
    // Function to load HTML content into a container
    async function loadHTML(file, containerId) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
        }
    }

    // Load all the HTML includes
    const includes = [
        { file: 'includes/sidebar.html', container: 'sidebar-container' },
        { file: 'includes/navigation.html', container: 'navigation-container' },
        { file: 'pages/about.html', container: 'about-container' },
        { file: 'pages/resume.html', container: 'resume-container' },
        { file: 'pages/portfolio.html', container: 'portfolio-container' },
        { file: 'pages/blog.html', container: 'blog-container' },
        { file: 'pages/contact.html', container: 'contact-container' },
        { file: 'includes/service-modal.html', container: 'service-modal-container' }
    ];

    // Load all includes
    includes.forEach(include => {
        loadHTML(include.file, include.container);
    });

    // Load scripts after content is loaded
    setTimeout(() => {
        loadHTML('includes/footer-scripts.html', 'scripts-container');
    }, 500);
}); 