class Carousel {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    this.track = this.container.querySelector('.carousel-track');
    this.slides = Array.from(this.track.children);
    this.nextButton = this.container.querySelector('.carousel-button--right');
    this.prevButton = this.container.querySelector('.carousel-button--left');
    this.dotsNav = this.container.querySelector('.carousel-nav');
    this.dots = Array.from(this.dotsNav.children);
    this.slideWidth = this.slides[0].getBoundingClientRect().width;
    this.currentIndex = 0;

    this.setSlidePositions();
    this.updateButtons();
    this.addEventListeners();
  }

  setSlidePositions() {
    this.slides.forEach((slide, index) => {
      slide.style.left = this.slideWidth * index + 'px';
    });
  }

  moveToSlide(index) {
    this.track.style.transform = 'translateX(-' + this.slides[index].style.left + ')';
    this.currentIndex = index;
    this.updateButtons();
    this.updateDots();
  }

  updateButtons() {
    if (this.currentIndex === 0) {
      this.prevButton.disabled = true;
    } else {
      this.prevButton.disabled = false;
    }
    if (this.currentIndex === this.slides.length - 1) {
      this.nextButton.disabled = true;
    } else {
      this.nextButton.disabled = false;
    }
  }

  updateDots() {
    this.dots.forEach(dot => dot.classList.remove('current-slide'));
    this.dots[this.currentIndex].classList.add('current-slide');
  }

  addEventListeners() {
    this.nextButton.addEventListener('click', () => {
      if (this.currentIndex < this.slides.length - 1) {
        this.moveToSlide(this.currentIndex + 1);
      }
    });

    this.prevButton.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        this.moveToSlide(this.currentIndex - 1);
      }
    });

    this.dotsNav.addEventListener('click', e => {
      const targetDot = e.target.closest('button');
      if (!targetDot) return;
      const targetIndex = this.dots.findIndex(dot => dot === targetDot);
      this.moveToSlide(targetIndex);
    });

    window.addEventListener('resize', () => {
      this.slideWidth = this.slides[0].getBoundingClientRect().width;
      this.setSlidePositions();
      this.moveToSlide(this.currentIndex);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const galleryCarousel = new Carousel('#gallery-carousel', {});
  const testimonialsCarousel = new Carousel('#testimonials-carousel', {});

  window.addEventListener('load', () => {
    galleryCarousel.slideWidth = galleryCarousel.slides[0].getBoundingClientRect().width;
    galleryCarousel.setSlidePositions();
    galleryCarousel.moveToSlide(galleryCarousel.currentIndex);

    testimonialsCarousel.slideWidth = testimonialsCarousel.slides[0].getBoundingClientRect().width;
    testimonialsCarousel.setSlidePositions();
    testimonialsCarousel.moveToSlide(testimonialsCarousel.currentIndex);
  });
});
