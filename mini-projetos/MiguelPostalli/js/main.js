// ========================================
// STREAMING FIGHT - JavaScript Principal
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 2000);

  // Header Scroll Effect
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
  });

  // Mobile Menu
  const mobileMenu = document.getElementById('mobileMenu');
  const nav = document.getElementById('nav');
  
  mobileMenu.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // Active Navigation Link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - 200) {
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

  // Counter Animation
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;
  
  function animateCounters() {
    if (countersAnimated) return;
    
    const heroSection = document.querySelector('.hero-stats');
    if (!heroSection) return;
    
    const rect = heroSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
      countersAnimated = true;
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
      });
    }
  }
  
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Card Hover Effect
  const cards = document.querySelectorAll('.modalidade-card, .lutador-card, .video-card, .plano-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function(e) {
      this.style.transform = '';
    });
  });

  // Form Submission
  const contactForm = document.querySelector('.contato-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      const inputs = this.querySelectorAll('input, select, textarea');
      let isValid = true;
      
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#e63946';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // Show success message
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-circle"></i> Mensagem Enviada!';
        btn.style.background = '#4caf50';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          this.reset();
        }, 3000);
      }
    });
  }

  // Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const input = this.querySelector('input');
      const btn = this.querySelector('button');
      
      if (input.value.trim()) {
        btn.innerHTML = '<i class="bi bi-check"></i>';
        btn.style.background = '#4caf50';
        
        setTimeout(() => {
          btn.innerHTML = '<i class="bi bi-send"></i>';
          btn.style.background = '';
          input.value = '';
        }, 2000);
      }
    });
  }

  // Lazy Loading for images
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // Parallax Effect for Hero
  const heroBg = document.querySelector('.hero-bg');
  
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  }

  // Typing Effect for Hero Title
  const heroTitle = document.querySelector('.hero-title');
  
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    // Start typing after preloader
    setTimeout(typeWriter, 2200);
  }

  // Event Reminder Buttons
  document.querySelectorAll('.evento-cta .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const originalText = this.textContent;
      this.textContent = 'Lembrete Configurado!';
      this.style.background = '#4caf50';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
      }, 2000);
    });
  });

  // Video Play Button Effect
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      const iframe = this.querySelector('iframe');
      if (iframe) {
        iframe.style.transform = 'scale(1.02)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const iframe = this.querySelector('iframe');
      if (iframe) {
        iframe.style.transform = '';
      }
    });
  });

  // Scroll Reveal Animation
  function reveal() {
    const reveals = document.querySelectorAll('.modalidade-card, .lutador-card, .video-card, .plano-card, .evento-item, .diferencial-item');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', reveal);
  reveal();

  // Add CSS for scroll reveal
  const style = document.createElement('style');
  style.textContent = `
    .modalidade-card, .lutador-card, .video-card, .plano-card, .evento-item, .diferencial-item {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .modalidade-card.active, .lutador-card.active, .video-card.active, .plano-card.active, .evento-item.active, .diferencial-item.active {
      opacity: 1;
      transform: translateY(0);
    }
    
    .nav.active {
      display: block;
    }
    
    .mobile-menu.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  `;
  document.head.appendChild(style);

  // Stats Counter with Intersection Observer
  const statsSection = document.querySelector('.hero-stats');
  
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // Add loading state to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.type === 'submit') {
        this.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Carregando...';
      }
    });
  });

  // Add spin animation
  const spinStyle = document.createElement('style');
  spinStyle.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .spin {
      animation: spin 1s linear infinite;
    }
  `;
  document.head.appendChild(spinStyle);

  // Console welcome message
  console.log('%c🥊 STREAMING FIGHT', 'color: #e63946; font-size: 24px; font-weight: bold;');
  console.log('%cA Arena Definitiva das Lutas', 'color: #a0a0a0; font-size: 14px;');
});
