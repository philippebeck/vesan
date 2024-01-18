<template>
  <figure class="slider">
    <ul class="controls">
      <li>
        <button @click="goPrevious()"
          title="Previous (&larr;)">
          <i class="fas fa-step-backward fa-2x"></i>
        </button>
      </li>

      <li>
        <button v-if="random === true"
          @click="checkRandom()"
          id="slider-random" 
          title="Normal">
          <i class="fas fa-long-arrow-alt-right fa-2x"></i>
        </button>

        <button v-else 
          @click="checkRandom()"
          id="slider-random" 
          title="Random">
          <i class="fas fa-random fa-2x"></i>
        </button>
      </li>

      <li>
        <button v-if="auto === true" 
          @click="checkAuto()"
          id="slider-auto" 
          title="Pause">
          <i class="fas fa-pause fa-2x"></i>
        </button>

        <button v-else 
          @click="checkAuto()"
          id="slider-auto" 
          title="Play">
          <i class="fas fa-play fa-2x"></i>
        </button>
      </li>

      <li>
        <button @click="goNext()"
          title="Next">
          <i class="fas fa-step-forward fa-2x"></i>
        </button>
      </li>
    </ul>

    <ul class="slides">
      <li v-for="(slide, index) in slides"
        :key="index"
        :id="'slide-' + (index + 1)">
        <figure>

          <slot name="slide"
            :slide="slide"
            :index="index">
          </slot>

          <figcaption v-if="hasSlot('info')">
            <slot name="info"
              :slide="slide"
              :index="index">
            </slot>
          </figcaption>
        </figure>
      </li>
    </ul>

    <ul class="gallery">
      <li v-for="(slide, index) in slides"
        :key="index"
        @click="setSlide(index)">

        <slot name="gallery"
          :slide="slide"
          :index="index">
        </slot>
      </li>
    </ul>
  </figure>
</template>

<script>
export default {
  name: "SliderElt",
  props: {
    slides: { type: Array },
    delay: { type: Number, default: 5000 },
    auto: { type: Boolean, default: true },
    random: { type: Boolean, default: false }
  },
  data() {
    return {
      index: -1,
      intervalId: 0,
      autoElt: null,
      randomElt: null,
      autoState: this.auto,
      randomState: this.random
    }
  },

  beforeCreate() {
    for (let i = 0; i < 1000; i++) {
      clearTimeout(i);
    }
  },

  mounted() {
    this.autoElt    = document.getElementById("slider-auto");
    this.randomElt  = document.getElementById("slider-random");

    document.addEventListener("keydown", this.setKeyboard);

    const slide1 = document.getElementById("slide-1");
    if (slide1) slide1.classList.add("show");

    this.runSlider();
  },

  methods: {
    /**
     * ? GET RANDOM INTEGER
     * * Generates a random integer.
     * @param {number} min - The minimum value (inclusive) of the range.
     * @param {number} max - The maximum value (inclusive) of the range.
     * @return {number} - A random integer between the specified range.
     */
    getRandomInteger(min, max) {
      const range = max - min + 1;

      return Math.floor(Math.random() * range) + min;
    },

    /**
     * ? HAS SLOT
     * * Determines if the slot name is available in the component's slots.
     * @param {string} name - The name of the slot to check for.
     * @return {boolean} Returns true if the component has the specified slot, false otherwise.
     */
    hasSlot(name) {
      return Object.prototype.hasOwnProperty.call(this.$slots, name);
    },

    /**
     * ? REFRESH SLIDE
     * * Refreshes the slide display.
     */
    refreshSlide() {
      if (this.randomState) this.index = this.getRandomInteger(0, this.slides.length - 1);

      for (let i = 1; i <= this.slides.length; i++) {
        document.getElementById(`slide-${i}`).classList.remove("show");
      }

      const currentSlide = document.getElementById(`slide-${this.index + 1}`);
      if (currentSlide) currentSlide.classList.add("show");
    },

    /**
     * ? SET KEYBOARD
     * * Sets the keyboard event listener & performs actions based on the pressed key.
     * @param {object} event - The event object containing information about the key pressed.
     */
    setKeyboard(event) {
      const actions = {
        ArrowLeft: this.goPrevious,
        ArrowUp: this.checkRandom,
        ArrowDown: this.checkAuto,
        ArrowRight: this.goNext,
      };

      const action = actions[event.code];
      if (action) action.call(this);
    },

    /**
     * ? SET ICON
     * * Updates the CSS classes of an icon by adding a class & removing another.
     * @param {HTMLElement} icon - The icon element to update.
     * @param {string} add - The name of the class to add to the icon element.
     * @param {string} remove - The name of the class to remove from the icon element.
     */
    setIcon(icon, add, remove) {
      const classes = icon.classList;

      classes.add(add);
      classes.remove(remove);
    },
    
    /**
     * ? SET SLIDE
     * * Sets the current slide index and refreshes the slide.
     * @param {number} index - The index of the slide to set.
     */
    setSlide(index) {
      this.index = index;

      this.refreshSlide();
    },

    /**
     * ? SET AUTO
     * * Sets the auto state, title & icon of the element.
     * @param {any} state - The state to set.
     * @param {string} title - The title to set.
     * @param {string} add - The icon to add.
     * @param {string} remove - The icon to remove.
     */
    setAuto(state, title, add, remove) {
      const icon = this.autoElt.querySelector("i");

      this.autoState = state;
      this.autoElt.title = title;

      this.setIcon(icon, add, remove);
    },

    /**
     * ? SET RANDOM
     * * Updates the state & title of the random element & its icon.
     * @param {any} state - New state of the random element.
     * @param {string} title - New title of the random element.
     * @param {string} addIcon - Icon when adding.
     * @param {string} removeIcon - Icon when removing.
     */
    setRandom(state, title, addIcon, removeIcon) {
      const randomIcon = this.randomElt.querySelector("i");
      
      this.randomState      = state;
      this.randomElt.title  = title;
      
      this.setIcon(randomIcon, addIcon, removeIcon);
    },

    /**
     * ? CHECK AUTO
     * * Toggles the auto state of the slideshow.
     */
    checkAuto() {
      const { autoState, setAuto, intervalId, delay, goNext, refreshSlide } = this;

      if (autoState) {
        setAuto(false, "Play", "fa-play", "fa-pause");
        clearInterval(intervalId);

      } else {
        setAuto(true, "Pause", "fa-pause", "fa-play");
        this.intervalId = setInterval(goNext, delay);
      }

      refreshSlide();
    },

    /**
     * ? CHECK RANDOM
     * * Toggles the random state and updates the slide.
     */
    checkRandom() {
      this.randomState ?
      this.setRandom(false, "Random", "fa-random", "fa-long-arrow-alt-right") :
      this.setRandom(true, "Normal", "fa-long-arrow-alt-right", "fa-random");

      this.refreshSlide();
    },

    /**
     * ? GO PREVIOUS
     * * Go to the previous slide.
     */
    goPrevious() {
      this.index = (this.index - 1 + this.slides.length) % this.slides.length;
      this.refreshSlide();
    },

    /**
     * ? GO NEXT
     * * Go to the next slide.
     */
    goNext() {
      this.index = (this.index + 1) % this.slides.length;
      this.refreshSlide();
    },

    /**
     * ? RUN SLIDER
     * * Runs the slider.
     */
    runSlider() {
      this.autoState ?
      this.intervalId = window.setInterval(this.goNext, this.delay) :
      this.goNext();
    }
  }
}
</script>

<style>
.slider {
  --ve-slider-margin: var(--ve-slider-figcaption-height) auto -20px;
  --ve-slider-border: none;
  --ve-slider-padding: 0;
  --ve-slider-width: 100%;
  --ve-slider-text-align: center;
}

[id*="slide-"] {
  --ve-slider-slide-display: none;
}

figcaption {
  --ve-slider-figcaption-padding: 5px 20px;
  --ve-slider-figcaption-width: 100%;
  --ve-slider-figcaption-height: 20%;
  --ve-slider-figcaption-font-weight: bold;
  --ve-slider-figcaption-color: var(--ani-sky);
}

.controls {
  --ve-slider-controls-display: flex;
  --ve-slider-controls-gap: 10px;
  --ve-slider-controls-place-content: center;
  --ve-slider-controls-opacity: 0.5;
  --ve-slider-controls-color: var(--ani-silver);
  --ve-slider-controls-hover-opacity: 1;
  --ve-slider-controls-hover-color: var(--ani-sky);
}

button {
  --ve-slider-button-border: none;
  --ve-slider-button-font-size: 60%;
  --ve-slider-button-background-color: none;
  --ve-slider-button-color: var(--ani-grey-dark);
}

.gallery {
  --ve-slider-gallery-display: flex;
  --ve-slider-gallery-gap: 10px;
  --ve-slider-gallery-place-content: center;
  --ve-slider-gallery-opacity: 0.5;
  --ve-slider-gallery-color: var(--ani-silver);
  --ve-slider-hover-gallery-opacity: 1;
  --ve-slider-gallery-child-hover-color: var(--ani-sky);
  --ve-slider-gallery-child-hover-cursor: pointer;
}

.show {
  --ve-slider-show-display: list-item;
}

@media (min-width: 1200px) {
  .controls {
  --ve-slider-controls-opacity: 0;
  }
  .gallery {
    --ve-slider-gallery-opacity: 0;
  }
}
</style>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.slider {
  margin: var(--ve-slider-margin);
  border: var(--ve-slider-border);
  padding: var(--ve-slider-padding);
  width: var(--ve-slider-width);
  text-align: var(--ve-slider-text-align);
}

[id*="slide-"] {
  display: var(--ve-slider-slide-display);
}

figcaption {
  padding: var(--ve-slider-figcaption-padding);
  width: var(--ve-slider-figcaption-width);
  height: var(--ve-slider-figcaption-height);
  font-weight: var(--ve-slider-figcaption-font-weight);
  color: var(--ve-slider-figcaption-color);
}

.controls {
  display: var(--ve-slider-controls-display);
  gap: var(--ve-slider-controls-gap);
  place-content: var(--ve-slider-controls-place-content);
  opacity: var(--ve-slider-controls-opacity);
  color: var(--ve-slider-controls-color);
}

.slider:hover .controls,
.slider:focus .controls {
  opacity: var(--ve-slider-controls-hover-opacity);
}

.controls > *:hover,
.controls > *:focus {
  color: var(--ve-slider-controls-hover-color);
}

button {
  border: var(--ve-slider-button-border);
  font-size: var(--ve-slider-button-font-size);
  background-color: var(--ve-slider-button-background-color);
  color: var(--ve-slider-button-color);
}

.gallery {
  display: var(--ve-slider-gallery-display);
  gap: var(--ve-slider-gallery-gap);
  place-content: var(--ve-slider-gallery-place-content);
  opacity: var(--ve-slider-gallery-opacity);
  color: var(--ve-slider-gallery-color);
}

.slider:hover .gallery,
.slider:focus .gallery {
  opacity: var(--ve-slider-hover-gallery-opacity);
}

.gallery > *:hover,
.gallery > *:focus {
  color: var(--ve-slider-gallery-child-hover-color);
  cursor: var(--ve-slider-gallery-child-hover-cursor);
}

.show {
  display: var(--ve-slider-show-display);
}
</style>
