// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle for mobile nav
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.navbar__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }

  // Optionally close menu when a link is clicked (mobile UX)
  document.querySelectorAll('.navbar__item a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 700) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  });

  // Initialize case study cards expand/collapse functionality
  initCaseStudyCards();

  // Initialize slider hover pause
  initSliderHover();

  // Initialize navigation for case studies
  initCaseStudiesNav();
});

// Case study cards expand/collapse
function initCaseStudyCards() {
  const readMoreButtons = document.querySelectorAll('.read-more-btn');

  readMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const card = button.closest('.case-card');

      // Toggle expanded class
      card.classList.toggle('expanded');

      // Change button text
      if (card.classList.contains('expanded')) {
        button.textContent = 'Read less';
      } else {
        button.textContent = 'Read more';
      }
    });
  });
}

// Initialize slider hover pause
function initSliderHover() {
  const sliderItems = document.querySelectorAll('.slider-item');

  sliderItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Pause the animation on hover
      const sliderTrack = document.querySelector('.slider-track');
      if (sliderTrack) {
        sliderTrack.style.animationPlayState = 'paused';
      }
    });

    item.addEventListener('mouseleave', () => {
      // Resume the animation when mouse leaves
      const sliderTrack = document.querySelector('.slider-track');
      if (sliderTrack) {
        sliderTrack.style.animationPlayState = 'running';
      }
    });
  });
}

// Initialize navigation for case studies
function initCaseStudiesNav() {
  const navArrow = document.querySelector('.navigation-arrow');

  if (navArrow) {
    navArrow.addEventListener('click', () => {
      // Simple manual scroll for now
      const caseStudiesGrid = document.querySelector('.case-studies-grid');
      if (caseStudiesGrid) {
        // Scroll to the right by 220px (card width + gap)
        caseStudiesGrid.scrollBy({
          left: 220,
          behavior: 'smooth'
        });
      }
    });
  }
}