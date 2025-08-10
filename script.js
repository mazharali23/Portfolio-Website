// Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Profile Photo Interactions
document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.querySelector('.profile-image-container');
    const profileImage = document.querySelector('.profile-image');
    
    if (profileContainer && profileImage) {
        // Add click handler for photo modal
        profileContainer.addEventListener('click', openPhotoModal);
        
        // Add touch/hover interactions for mobile
        profileContainer.addEventListener('touchstart', () => {
            profileContainer.classList.add('touch-active');
        });
        
        // Parallax effect on mouse move
        profileContainer.addEventListener('mousemove', (e) => {
            const rect = profileContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / 10;
            const deltaY = (e.clientY - centerY) / 10;
            
            profileImage.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
        });
        
        profileContainer.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'translate(0, 0) scale(1)';
        });
    }
});

// Photo Modal Functionality
function openPhotoModal() {
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="photo-modal-content">
            <img src="linkedinPP.jpg" alt="Mazhar Ali Mansuri">
        </div>
        <button class="photo-close">&times;</button>
    `;
    
    document.body.appendChild(modal);
    
    // Trigger animation
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Close handlers
    const closeBtn = modal.querySelector('.photo-close');
    closeBtn.addEventListener('click', closePhotoModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePhotoModal();
    });
    
    // Escape key handler
    document.addEventListener('keydown', handleEscapeKey);
    
    function closePhotoModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscapeKey);
        }, 300);
    }
    
    function handleEscapeKey(e) {
        if (e.key === 'Escape') closePhotoModal();
    }
}

// Dynamic status updates
function updateProfileStatus() {
    const statusText = document.querySelector('.status-text');
    const statusIndicator = document.querySelector('.status-indicator');
    
    if (statusText && statusIndicator) {
        const statuses = [
            { text: 'Available for Work', color: '#10b981' },
            { text: 'Open to Opportunities', color: '#6366f1' },
            { text: 'Ready to Collaborate', color: '#f59e0b' }
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % statuses.length;
            statusText.textContent = statuses[currentIndex].text;
            statusIndicator.style.background = statuses[currentIndex].color;
        }, 3000);
    }
}

// Initialize status updates
updateProfileStatus();


// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .education-card, .award-item, .contact-item, .exp-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// Observe skill progress bars
document.querySelectorAll('.skill-progress').forEach(el => {
    observer.observe(el);
});

// Fixed typing animation for hero text
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalHTML = heroTitle.innerHTML;
    const textContent = heroTitle.textContent; // Get just the text content
    heroTitle.innerHTML = '';
    
    let i = 0;
    let isInsideTag = false;
    let currentHTML = '';
    
    const typeWriter = () => {
        if (i < originalHTML.length) {
            const char = originalHTML.charAt(i);
            
            if (char === '<') {
                isInsideTag = true;
            }
            
            currentHTML += char;
            
            if (char === '>') {
                isInsideTag = false;
            }
            
            if (!isInsideTag && char !== '<' && char !== '>') {
                heroTitle.innerHTML = currentHTML;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(typeWriter, 10);
            }
            
            i++;
        }
    };
    
    setTimeout(typeWriter, 1000);
}


// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.float-item');
    const speed = 0.5;

    parallax.forEach(element => {
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Initialize AOS (Animate On Scroll) alternative
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements as they come into view
    const elements = document.querySelectorAll('.about-text, .skills-grid, .projects-grid, .education-content, .contact-content');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        intersectionObserver.observe(element);
    });
});

// Tech stack animation
const techItems = document.querySelectorAll('.float-item');
techItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.2) translateY(-10px)';
        item.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) translateY(0px)';
        item.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
});

// Stats counter animation
const statsNumbers = document.querySelectorAll('.stat-number');
const startCounting = (element) => {
    const target = parseFloat(element.textContent);
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current.toFixed(current >= 1 ? 0 : 2);
    }, 20);
};

// Trigger stats counter when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
});

statsNumbers.forEach(stat => {
    statsObserver.observe(stat);
});
