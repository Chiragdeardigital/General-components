if (!customElements.get("cards-slider")) {
  customElements.define(
    "cards-slider",
    class CardsSlider extends HTMLElement {
      constructor() {
        super();
        this.sliderRef = this.querySelector("[data-slider]");
        this.nextRef = this.querySelector('[data-navigation="next"]') || null;
        this.previousRef = this.querySelector('[data-navigation="previous"]') || null;
        this.paginationRef = this.querySelector("[data-pagination]") || null;
        this.scrollbarRef = this.querySelector("[data-scrollbar]") || null;

        this.slidersToShowOnDesktop = parseInt(this.dataset.slidersToShowOnDesktop);
        this.slidersToShowOnTablet = parseInt(this.dataset.slidersToShowOnTablet);
        this.slidersToShowOnMobile = parseInt(this.dataset.slidersToShowOnMobile);

        this.infiniteLoop = this.dataset.infiniteLoop === "true" ? true : false;

        this.initSwiper = this.initSwiper.bind(this);
        this.childElements = this.querySelectorAll(".swiper-slide");
      }

      connectedCallback() {
        if (!this.sliderRef) {
          return;
        }
        if (this.childElements.length < 4 || this.childElements.length < this.slidersToShowOnDesktop) {
          return;
        }
        this.initSwiper();
      }

      initSwiper() {
        const slider = new Swiper(this.sliderRef, {
          spaceBetween: 24,
          loop: this.infiniteLoop,

          keyboard: {
            enabled: true,
          },

          navigation: {
            nextEl: this.nextRef,
            prevEl: this.previousRef,
          },

          pagination: {
            el: this.paginationRef,
            clickable: true,
          },

          scrollbar: {
            el: this.scrollbarRef,
          },

          breakpoints: {
            0: {
              slidesPerView: this.slidersToShowOnMobile,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
            992: {
              slidesPerView: this.slidersToShowOnTablet,
              slidesPerGroup: this.slidersToShowOnTablet,
            },
            1280: {
              slidesPerView: this.slidersToShowOnDesktop,
              slidesPerGroup: this.slidersToShowOnDesktop,
            },
          },
          a11y: false,
        });
      }
    }
  );
}
