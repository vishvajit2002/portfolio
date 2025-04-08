/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


// certificate section filter and show more button functionality
$(document).ready(function() {
  // Initialize Isotope
  var $portfolioContainer = $('.certificate-container').isotope({
    itemSelector: '.certificate-item',
    layoutMode: 'fitRows' // Adjust as per your needs
  });

  // Initially hide "more-certificates"
  $('.more-certificates').hide();

  // When a filter is clicked
  $('#certificate-flters li').click(function() {
    var filterValue = $(this).attr('data-filter');
    
    // Remove the "filter-active" class from all filter buttons
    $('#certificate-flters li').removeClass('filter-active');
    // Add the "filter-active" class to the clicked filter
    $(this).addClass('filter-active');

    // Fade out all items before filtering (smooth transition)
    $portfolioContainer.children('.certificate-item').fadeOut(300, function() {
      // After fade out, apply the Isotope filter
      $portfolioContainer.isotope({
        filter: filterValue
      });

      // If "All" filter is selected, show all certificates, including "more-certificates"
      if (filterValue === '*') {
        // First, fade in the hidden certificates
        $('.more-certificates').fadeIn(300, function() {
          // After showing hidden certificates, refresh Isotope layout
          $portfolioContainer.isotope('layout');
        });
      }

      // Fade in the filtered items after applying filter
      $portfolioContainer.children(filterValue).fadeIn(300);
    });
  });
  

  // Show More button functionality
  $('#show-more-btn').click(function() {
    // Show all hidden certificates with the class "more-certificates"
    $('.more-certificates').fadeIn(300, function() {
      // After fading in, refresh Isotope layout
      $portfolioContainer.isotope('layout');
    });
    // Hide the "Show More" button after clicking
    $(this).hide();
  });
});
$(window).on('resize', function () {
  $portfolioContainer.isotope('layout');
});

$portfolioContainer.imagesLoaded().progress(function () {
  $portfolioContainer.isotope('layout');
});


// Show the speech bubble after a short delay (only in mobile view)
$(document).ready(function() {
  setTimeout(function() {
    // Check if the viewport width is mobile-sized (below 768px)
    if ($(window).width() <= 767) {
      $('#speech-bubble').fadeIn(500); // Fade in the speech bubble
    }
  }, 500); // Wait for 0.5s after page load

  // Hide the speech bubble when the user clicks the mobile nav toggle
  $('.mobile-nav-toggle').click(function() {
    $('#speech-bubble').fadeOut(300); // Hide the speech bubble when the toggle button is clicked
  });
});

// Function to show/hide the speech bubble based on scroll position
function checkScrollPosition() {
  // Get the current scroll position
  const scrollPosition = window.scrollY || window.pageYOffset;

  // Get the speech bubble element
  const speechBubble = document.querySelector('.speech-bubble');

  // If the scroll position is at the top of the page, show the bubble
  if (scrollPosition === 0) {
    speechBubble.classList.remove('hide-speech-bubble');
  } else {
    speechBubble.classList.add('hide-speech-bubble');
  }
}

// When the page loads or user scrolls, check the scroll position
window.addEventListener('load', checkScrollPosition);
window.addEventListener('scroll', checkScrollPosition);

// Show the speech bubble after a delay when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const speechBubble = document.querySelector('.speech-bubble');
  setTimeout(function() {
    speechBubble.classList.remove('hide-speech-bubble');
  }, 1000); // Delay showing the bubble by 1 second
});



$(window).on('resize', function () {
  setTimeout(function() {
    $portfolioContainer.isotope('layout');
  }, 300); // Slight delay to wait for resize reflow
});
