/**
 * SpeedyPharma — Animation Controller
 * ====================================
 * 
 * Vanilla JS, zero dependencies, ~2KB minifié.
 * 
 * Fonctionnalités :
 * - Intersection Observer pour les reveals
 * - Ripple effect sur les boutons
 * - Header scroll state
 * - Carousel avec inertie native
 */

(function() {
  'use strict';

  // ===========================================
  // 1. INTERSECTION OBSERVER — Staggered Reveals
  // ===========================================

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Ajoute la classe visible
          entry.target.classList.add('visible');
          
          // Si c'est un conteneur stagger, révèle aussi les enfants
          if (entry.target.classList.contains('reveal-stagger')) {
            const children = entry.target.querySelectorAll('.reveal');
            children.forEach((child) => {
              child.classList.add('visible');
            });
          }
          
          // Optionnel : arrête d'observer après la première apparition
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Déclenche quand 15% de l'élément est visible
      rootMargin: '0px 0px -50px 0px' // Déclenche un peu avant le bas du viewport
    }
  );

  // Observe tous les éléments avec la classe .reveal
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
    
    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // ===========================================
  // 2. RIPPLE EFFECT — Boutons
  // ===========================================

  function createRipple(event) {
    const button = event.currentTarget;
    
    // Retire l'ancienne animation
    button.classList.remove('ripple');
    
    // Force reflow pour reset l'animation
    void button.offsetWidth;
    
    // Relance l'animation
    button.classList.add('ripple');
    
    // Cleanup après l'animation
    setTimeout(() => {
      button.classList.remove('ripple');
    }, 600);
  }

  function initRippleEffect() {
    const buttons = document.querySelectorAll('.button--primary');
    
    buttons.forEach((button) => {
      button.addEventListener('click', createRipple);
    });
  }

  // ===========================================
  // 3. HEADER SCROLL STATE
  // ===========================================

  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    ticking = false;
  }

  function onScroll() {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  function initHeaderScroll() {
    window.addEventListener('scroll', onScroll, { passive: true });
    // Check initial state
    updateHeader();
  }

  // ===========================================
  // 4. ADD TO CART — Bounce Animation
  // ===========================================

  function handleAddToCart(event) {
    const button = event.currentTarget;
    
    // Ajoute la classe pour l'animation
    button.classList.add('added');
    
    // Optionnel : change le texte temporairement
    const originalText = button.textContent;
    button.textContent = '✓ Ajouté';
    
    // Reset après l'animation
    setTimeout(() => {
      button.classList.remove('added');
      button.textContent = originalText;
    }, 1500);
  }

  function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.button--add-cart');
    
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', handleAddToCart);
    });
  }

  // ===========================================
  // 5. CAROUSEL — Pagination Dots
  // ===========================================

  function initCarousel() {
    const carousel = document.querySelector('.products-carousel');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!carousel || !dotsContainer) return;
    
    const items = carousel.querySelectorAll('.product-card');
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    if (items.length === 0 || dots.length === 0) return;
    
    // Calcule quel item est visible
    function updateActiveDot() {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = items[0].offsetWidth + 24; // width + gap
      const activeIndex = Math.round(scrollLeft / itemWidth);
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    }
    
    // Écoute le scroll du carousel
    carousel.addEventListener('scroll', updateActiveDot, { passive: true });
    
    // Click sur les dots pour naviguer
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const itemWidth = items[0].offsetWidth + 24;
        carousel.scrollTo({
          left: itemWidth * index,
          behavior: 'smooth'
        });
      });
    });
    
    // État initial
    updateActiveDot();
  }

  // ===========================================
  // 6. SMOOTH SCROLL — Navigation Links
  // ===========================================

  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ===========================================
  // 7. PROBLEM CARDS — Touch Feedback Mobile
  // ===========================================

  function initTouchFeedback() {
    const cards = document.querySelectorAll('.problem-card, .product-card');
    
    cards.forEach((card) => {
      card.addEventListener('touchstart', () => {
        card.style.transform = 'scale(0.98)';
      }, { passive: true });
      
      card.addEventListener('touchend', () => {
        card.style.transform = '';
      }, { passive: true });
      
      card.addEventListener('touchcancel', () => {
        card.style.transform = '';
      }, { passive: true });
    });
  }

  // ===========================================
  // INIT — Lance tout au DOM ready
  // ===========================================

  function init() {
    // Respecte prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Montre tout sans animation
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
        el.classList.add('visible');
      });
      return;
    }
    
    // Lance les initialisations
    initRevealAnimations();
    initRippleEffect();
    initHeaderScroll();
    initAddToCartButtons();
    initCarousel();
    initSmoothScroll();
    initTouchFeedback();
    
    console.log('🚀 SpeedyPharma animations initialized');
  }

  // Lance quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
