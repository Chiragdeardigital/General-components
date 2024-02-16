class ImageComparisonSlider extends HTMLElement {
  constructor() {
    super();

    this.thumbSlider = this.querySelector("[data-thumb-slider]");
    if (!this.thumbSlider) {
      console.error("No thumb slider found in custom element");
      return;
    }
  }

  connectedCallback() {
    if (this.thumbSlider) {
      this.thumbSlider.addEventListener("input", this.handleInput);
    }
  }

  disconnectedCallback() {
    if (this.thumbSlider) {
      this.thumbSlider.removeEventListener("input", this.handleInput);
    }
  }

  handleInput = (event) => {
    const value = event.target.value;
    this.style.setProperty("--thumb-slider", `${value}%`);
  };
}

customElements.define("image-comparison-slider", ImageComparisonSlider);
