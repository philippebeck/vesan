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
          <slot name="slide" :slide="slide" :index="index">
          </slot>

          <figcaption v-if="hasSlot('info')">
            <slot name="info" :slide="slide" :index="index">
            </slot>
          </figcaption>
        </figure>
      </li>
    </ul>

    <ul class="gallery">
      <li v-for="(slide, index) in slides" :key="index" @click="setSlide(index)">
        <slot name="gallery" :slide="slide" :index="index">
        </slot>
      </li>
    </ul>
  </figure>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: "SliderElt",

  props: {
    slides: { type: Array },
    delay: { type: Number, default: 5000 },
    auto: { type: Boolean, default: true },
    random: { type: Boolean, default: false }
  },

  setup(props, { slots }) {
    const index = ref(-1);
    const intervalId = ref(0);
    const autoElt = ref(null);
    const randomElt = ref(null);
    const autoState = ref(props.auto);
    const randomState = ref(props.random);

    const hasSlot = (name) => {
      return Object.prototype.hasOwnProperty.call(slots, name);
    };

    const setKeyboard = (event) => {
      const actions = {
        ArrowLeft: goPrevious,
        ArrowUp: checkRandom,
        ArrowDown: checkAuto,
        ArrowRight: goNext,
      };

      const action = actions[event.code];
      if (action) action();
    };

    const setIcon = (icon, add, remove) => {
      const classes = icon.classList;

      classes.add(add);
      classes.remove(remove);
    };

    const refreshSlide = () => {
      if (randomState.value) {
        index.value = getRandomInteger(0, props.slides.length - 1);
      }

      for (let i = 1; i <= props.slides.length; i++) {
        const slide = document.getElementById(`slide-${i}`);
        if (slide) slide.classList.remove("show");
      }

      const currentSlide = document.getElementById(`slide-${index.value + 1}`);
      if (currentSlide) currentSlide.classList.add("show");
    };

    const checkAuto = () => {
      if (autoState.value) {
        setAuto(false, "Play", "fa-play", "fa-pause");
        clearInterval(intervalId.value);
      } else {
        setAuto(true, "Pause", "fa-pause", "fa-play");
        intervalId.value = setInterval(goNext, props.delay);
      }

      refreshSlide();
    };

    const checkRandom = () => {
      randomState.value ?
        setRandom(false, "Random", "fa-random", "fa-long-arrow-alt-right") :
        setRandom(true, "Normal",
          "fa-long-arrow-alt-right", "fa-random");

      refreshSlide();
    };

    const goPrevious = () => {
      index.value = (index.value - 1 + props.slides.length) % props.slides.length;
      refreshSlide();
    };

    const goNext = () => {
      index.value = (index.value + 1) % props.slides.length;
      refreshSlide();
    };

    const runSlider = () => {
      autoState.value ?
        intervalId.value = window.setInterval(goNext, props.delay) :
        goNext();
    };

    const getRandomInteger = (min, max) => {
      const range = max - min + 1;
      return Math.floor(Math.random() * range) + min;
    };

    const setAuto = (state, title, add, remove) => {
      const icon = autoElt.value.querySelector("i");
      autoState.value = state;
      autoElt.value.title = title;
      setIcon(icon, add, remove);
    };

    const setRandom = (state, title, addIcon, removeIcon) => {
      const randomIcon = randomElt.value.querySelector("i");
      randomState.value = state;
      randomElt.value.title = title;
      setIcon(randomIcon, addIcon, removeIcon);
    };

    onMounted(() => {
      autoElt.value = document.getElementById("slider-auto");
      randomElt.value = document.getElementById("slider-random");

      document.addEventListener("keydown", setKeyboard);

      const slide1 = document.getElementById("slide-1");
      if (slide1) slide1.classList.add("show");

      runSlider();
    });

    onUnmounted(() => {
      for (let i = 0; i < 1000; i++) {
        clearTimeout(i);
      }
    });

    return {
      hasSlot,
      refreshSlide,
      setKeyboard,
      setIcon,
      checkAuto,
      checkRandom,
      goPrevious,
      goNext
    };
  }
});
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

  &:hover .controls,
  &:focus .controls {
    opacity: var(--ve-slider-controls-hover-opacity);
  }

  &:hover .gallery,
  &:focus .gallery {
    opacity: var(--ve-slider-hover-gallery-opacity);
  }
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
