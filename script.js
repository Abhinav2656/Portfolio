// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                section.classList.add('fade-in');
                
                // Add animations to specific elements in visible sections
                const items = section.querySelectorAll('.timeline-item, .skill-item, .education-item, .project-card');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('slide-up');
                    }, 150 * index);
                });
            }
        });
    }
    
    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Skill bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }
    
    // Initialize skill bar animation when skills section is visible
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateSkillBars();
                observer.disconnect(); // Only run once
            }
        });
        
        observer.observe(skillsSection);
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    const popupModal = document.getElementById('popup-modal');
    const popupMessage = document.getElementById('popup-message');
    const closePopup = document.querySelector('.close-popup');
    
    if (contactForm) {
      const emailField = document.getElementById('email');
      const replyToField = document.getElementById('replyTo');
      const messageField = document.getElementById('message');
      const subjectField = document.getElementById('dynamicSubject');
    
      // Sync email
      emailField?.addEventListener('input', () => {
        replyToField.value = emailField.value;
      });
    
      // Dynamic subject from message
      messageField?.addEventListener('input', () => {
        const msg = messageField.value;
        const preview = msg.length > 60 ? msg.substring(0, 57) + '...' : msg;
        subjectField.value = `New message: ${preview}`;
      });
    
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        const formData = new FormData(contactForm);
    
        fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            popupMessage.innerText = "✅ Thanks for your message! I'll get back to you soon.";
            contactForm.reset();
          } else {
            popupMessage.innerText = "❌ Oops! Something went wrong. Please try again.";
          }
          popupModal.style.display = 'flex';
        })
        .catch(() => {
          popupMessage.innerText = "❌ Network error. Please try again.";
          popupModal.style.display = 'flex';
        });
      });
    }
    
    // Close modal on click
    closePopup?.addEventListener('click', () => {
      popupModal.style.display = 'none';
    });
    
    // Optional: auto-close after 5s
    setTimeout(() => {
      popupModal.style.display = 'none';
    }, 5000);
    


    
    // Newsletter subscription handling
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Example: subscription logic (would be replaced with actual API call)
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }
    
    // Header scroll effect
    function updateHeader() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Run once on page load
});

// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
  
    if (savedTheme) {
      root.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });
  