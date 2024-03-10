<template>
  <figure class="slider">
    <ul class="controls">
      <li>
        <button @click="goPrevious()" title="Previous (&larr;)">
          <i class="fas fa-step-backward fa-2x"></i>
        </button>
      </li>

      <li>
        <button v-if="randomState" @click="checkRandom()" id="slider-random" title="Normal">
          <i class="fas fa-long-arrow-alt-right fa-2x"></i>
        </button>

        <button v-else @click="checkRandom()" id="slider-random" title="Random">
          <i class="fas fa-random fa-2x"></i>
        </button>
      </li>

      <li>
        <button v-if="autoState" @click="checkAuto()" id="slider-auto" title="Pause">
          <i class="fas fa-pause fa-2x"></i>
        </button>

        <button v-else @click="checkAuto()" id="slider-auto" title="Play">
          <i class="fas fa-play fa-2x"></i>
        </button>
      </li>

      <li>
        <button @click="goNext()" title="Next">
          <i class="fas fa-step-forward fa-2x"></i>
        </button>
      </li>
    </ul>

    <ul class="slides">
      <li v-for="(slide, index) in slides" :key="index" :id="'slide-' + (index + 1)">
        <figure>
          <slot name="slide" :slide="slide" :index="index"> </slot>

          <figcaption v-if="hasSlot('info')">
            <slot name="info" :slide="slide" :index="index"> </slot>
          </figcaption>
        </figure>
      </li>
    </ul>

    <ul class="gallery">
      <li v-for="(slide, index) in slides" :key="index" @click="setSlide(index)">
        <slot name="gallery" :slide="slide" :index="index"> </slot>
      </li>
    </ul>
  </figure>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { checkSlot } from '../assets/services'

export default defineComponent({
  name: 'SliderElt',

  props: {
    slides: { type: Array },
    delay: { type: Number, default: 5000 },
    auto: { type: Boolean, default: true },
    random: { type: Boolean, default: false }
  },

  /**
   * ? SETUP
   * * Setup the component
   * @param {Object} props - The props of the component.
   * @param {Object} context - Object that contains the slots of the component.
   * @returns {{ index: Ref<number>, intervalId: Ref<number>, autoElt: Ref<null>, randomElt: Ref<null>, autoState: Ref<boolean>, randomState: Ref<boolean>, hasSlot: (name: string) => boolean, setKeyboard: (event: Event) => void, setIcon: (icon: HTMLElement, add: string, remove: string) => void, refreshSlide: () => void, checkAuto: () => void, checkRandom: () => void, goNext: () => void, goPrevious: () => void, runSlider: () => void }} - Object with strongly typed functions and refs.
   */
  setup(props, context) {
    const index = ref(-1)
    const intervalId = ref(0)
    const autoElt = ref(null)
    const randomElt = ref(null)
    const autoState = ref(props.auto)
    const randomState = ref(props.random)

    /**
     * ? HAS SLOT
     * * Checks if the component has a slot
     *
     * @param {string} name - Name of the slot to check.
     * @returns {boolean} - True if the slot exists, false otherwise.
     */
    const hasSlot = (name: string): boolean => checkSlot(context.slots, name)

    /**
     * ? SET KEYBOARD
     * * Set the keyboard
     *
     * @param {Event} event - The keyboard event.
     */
    const setKeyboard = (event: Event): void => {
      const actions = {
        ArrowUp: checkRandom,
        ArrowRight: goNext,
        ArrowDown: checkAuto,
        ArrowLeft: goPrevious
      }

      const action = actions[event.code]
      if (action) action()
    }

    /**
     * ? SET ICON
     * * Set the icon
     * @param {HTMLElement} icon - The icon element.
     * @param {string} add - The class to add to the icon.
     * @param {string} remove - The class to remove from the icon.
     */
    const setIcon = (icon: HTMLElement, add: string, remove: string): void => {
      const classes = icon.classList

      classes.add(add)
      classes.remove(remove)
    }

    /**
     * ? REFRESH SLIDE
     * * Refresh the slide
     */
    const refreshSlide = (): void => {
      if (randomState.value) index.value = getRandomInteger(0, props.slides ? props.slides.length - 1 : 0)

      for (let i = 1; i <= (props.slides ? props.slides.length : 0); i++) {
        const slide = document.getElementById(`slide-${i}`)

        if (slide) slide.classList.remove('show')
      }

      const currentSlide = document.getElementById(`slide-${index.value + 1}`)
      if (currentSlide) currentSlide.classList.add('show')
    }

    /**
     * ? CHECK AUTO
     * * Check the auto state, then set the pause or play icon
     */
    const checkAuto = (): void => {
      if (autoState.value) {
        setAuto(false, 'Play', 'fa-play', 'fa-pause')
        clearInterval(intervalId.value)
      } else {
        setAuto(true, 'Pause', 'fa-pause', 'fa-play')
        intervalId.value = setInterval(goNext, props.delay)
      }

      refreshSlide()
    }

    /**
     * ? CHECK RANDOM
     * * Check the random state, then set the random or continue icon
     */
    const checkRandom = (): void => {
      randomState.value
        ? setRandom(false, 'Random', 'fa-random', 'fa-long-arrow-alt-right')
        : setRandom(true, 'Normal', 'fa-long-arrow-alt-right', 'fa-random')

      refreshSlide()
    }

    /**
     * ? GO PREVIOUS
     * * Go to the previous slide
     */
    const goPrevious = (): void => {
      index.value = (index.value - 1 + (props.slides?.length || 0)) % (props.slides?.length || 1)
      refreshSlide()
    }

    /**
     * ? GO NEXT
     * * Go to the next slide
     */
    const goNext = (): void => {
      index.value = (index.value + 1) % (props.slides?.length || 0)
      refreshSlide()
    }

    /**
     * ? RUN SLIDER
     * * Run the slider
     */
    const runSlider = (): void => {
      autoState.value ? (intervalId.value = window.setInterval(goNext, props.delay)) : goNext()
    }

    /**
     * ? GET RANDOM INTEGER
     * * Get a random integer
     *
     * @param {number} min - The minimum value.
     * @param {number} max - The maximum value.
     * @returns {number} - The random integer.
     */
    const getRandomInteger = (min: number, max: number): number => {
      const range = max - min + 1
      return Math.floor(Math.random() * range) + min
    }

    /**
     * ? SET AUTO
     * * Set the auto state
     *
     * @param {boolean} state - The state to set.
     * @param {string} title - The title to set.
     * @param {string} add - The class to add to the icon.
     * @param {string} remove - The class to remove from the icon.
     */
    const setAuto = (state: boolean, title: string, add: string, remove: string): void => {
      const icon = autoElt.value.querySelector('i')

      autoState.value = state
      autoElt.value.title = title
      setIcon(icon, add, remove)
    }

    /**
     * ? SET RANDOM
     * * Set the random state
     *
     * @param {boolean} state - The state to set.
     * @param {string} title - The title to set.
     * @param {string} add - The class to add to the icon.
     * @param {string} remove - The class to remove from the icon.
     */
    const setRandom = (state: boolean, title: string, add: string, remove: string): void => {
      const icon = randomElt.value.querySelector('i')

      randomState.value = state
      randomElt.value.title = title
      setIcon(icon, add, remove)
    }

    /**
     * ? ON MOUNTED
     * * Sets the auto & random states
     * * Adds the keyboard event
     * * Sets the first slide
     * * Runs the slider
     */
    onMounted(() => {
      autoElt.value = document.getElementById('slider-auto')
      randomElt.value = document.getElementById('slider-random')

      document.addEventListener('keydown', setKeyboard)

      const slide1 = document.getElementById('slide-1')
      if (slide1) slide1.classList.add('show')

      runSlider()
    })

    /**
     * ? ON UNMOUNTED
     * * Clear the interval
     */
    onUnmounted(() => {
      for (let i = 0; i < 1000; i++) {
        clearTimeout(i)
      }
    })

    return {
      checkAuto,
      checkRandom,
      goNext,
      goPrevious,
      hasSlot,
      refreshSlide,
      setIcon,
      setKeyboard
    }
  }
})
</script>

<style>
.slider {
  --ve-slider-margin: var(--ve-slider-figcaption-height) auto -20px;
  --ve-slider-border: none;
  --ve-slider-padding: 0;
  --ve-slider-width: 100%;
  --ve-slider-text-align: center;
}

[id*='slide-'] {
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

  &:hover .controls,
  &:focus .controls {
    opacity: var(--ve-slider-controls-hover-opacity);
  }

  &:hover .gallery,
  &:focus .gallery {
    opacity: var(--ve-slider-hover-gallery-opacity);
  }
}

[id*='slide-'] {
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

  & > *:hover,
  & > *:focus {
    color: var(--ve-slider-controls-hover-color);
  }
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

  & > *:hover,
  & > *:focus {
    color: var(--ve-slider-gallery-child-hover-color);
    cursor: var(--ve-slider-gallery-child-hover-cursor);
  }
}

.show {
  display: var(--ve-slider-show-display);
}
</style>
