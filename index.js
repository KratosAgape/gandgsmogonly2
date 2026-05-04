const swiper = new Swiper('.swiper.swiper-one', {
  loop: true,
  spaceBetween: 0,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
    pagination: { el: '.swiper-pagination' },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  // Essential events to make AOS work with Swiper
  on: {
    beforeInit: function() {
      // Initialize AOS before Swiper starts
      AOS.init();
    },
    slideChangeTransitionStart: function () {
      // Hide all animated elements when moving to a new slide
      const animatedElements = this.el.querySelectorAll('[data-aos]');
      animatedElements.forEach(el => {
        el.classList.remove('aos-animate');
      });
    },
    slideChangeTransitionEnd: function () {
      // Re-trigger AOS animations on the active slide
      const activeSlide = this.slides[this.activeIndex];
      const animatedElements = activeSlide.querySelectorAll('[data-aos]');
      animatedElements.forEach(el => {
        el.classList.add('aos-animate');
      });
    },
  },
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const target = entry.target;

    if (entry.isIntersecting) {
      const countTo = parseInt(target.getAttribute('data-target'));
      let currentCount = 0;
      
      const updateCount = () => {
        const increment = Math.ceil(countTo / 1000000); 
        if (currentCount < countTo) {
          currentCount += increment;
          target.innerText = currentCount > countTo ? countTo : currentCount;
          // Store the frame ID so we can cancel it if the user scrolls away
          target.counterID = requestAnimationFrame(updateCount);
        }
      };
      
      updateCount();
    } else {
      // 1. Stop any current animation
      cancelAnimationFrame(target.counterID);
      // 2. Reset the display
      target.innerText = "0";
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => observer.observe(el));




const swiperTwo = new Swiper('.swiper.swiper-two', {
      grabCursor: false, // Disables the grab hand cursor
      allowTouchMove: false, // Disables dragging and swiping entirely
      slidesPerView: 3,
      spaceBetween: 0,
  // Responsive breakpoints
      breakpoints: {
        640: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
      },
      loop: true,
      centeredSlides: true,   // Centers the active slide
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      navigation: {
            nextEl: '.modal-swiper-button-next',
            prevEl: '.modal-swiper-button-prev',
      },
});