// Smooth scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            }
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('header').offsetHeight + 20),
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking a link
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        });
    });

    // No header background change on scroll for this design
    // The navbar itself has a fixed translucent background.
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .gradient-blob {
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translate(-50%, -50%) translateY(0px);
            }
            50% {
                transform: translate(-50%, -50%) translateY(-20px);
            }
        }
        
        .hero-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    `;
    document.head.appendChild(style);
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Newsletter form handler
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! We\'ll keep you updated on Alpen developments.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
    
    // Add hover effects for cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animate gradient blob
    const gradientBlob = document.querySelector('.gradient-blob');
    if (gradientBlob) {
        let mouseX = 0;
        let mouseY = 0;
        let blobX = 0;
        let blobY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateBlob() {
            blobX += (mouseX - blobX) * 0.01;
            blobY += (mouseY - blobY) * 0.01;
            
            gradientBlob.style.transform = `translate(${blobX - window.innerWidth/2}px, ${blobY - window.innerHeight/2}px)`;
            
            requestAnimationFrame(animateBlob);
        }
        
        animateBlob();
    }
});
