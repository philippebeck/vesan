<template>
  <button v-if="isBtnTypeButton" :type="type" :value="value" :class="buttonClass" :title="title">
    <slot name="btn"></slot>
    {{ content }}
  </button>

  <a v-else :href="href" :class="linkClass" :title="title">
    <slot name="btn"></slot>
    {{ content }}
  </a>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'BtnElt',

  props: {
    type: { type: String, default: 'link' },
    value: String,
    href: String,
    content: String,
    title: String
  },

  /**
   * ? SETUP
   * * Setup the component
   *
   * @param {Object} props - The props of the component.
   * @returns {Object} - The return object containing buttonClass, isBtnTypeButton & linkClass.
   */
  setup(props: { type: string; class: string }): {
    buttonClass: string
    isBtnTypeButton: boolean
    linkClass: string
  } {
    /**
     * ? IS BTN TYPE BUTTON
     * * Checks if the type of the button is 'button'
     */
    const isBtnTypeButton = computed(() => {
      const validTypes: string[] = ['button', 'submit', 'reset']

      return validTypes.includes(props.type)
    })

    /**
     * ? BUTTON CLASS
     * * Returns the class of the button
     */
    const buttonClass = computed(() => {
      return isBtnTypeButton.value ? props.class : ''
    })

    /**
     * ? LINK CLASS
     * * Returns the class of the link
     */
    const linkClass = computed(() => {
      return isBtnTypeButton.value ? '' : props.class
    })

    return { buttonClass, isBtnTypeButton, linkClass }
  }
})
</script>

<style lang="scss">
a,
button {
  --ve-btn-display: inline-block;
  --ve-btn-margin: 10px;
  --ve-btn-border: solid 2px var(--ani-black);
  --ve-btn-border-radius: 20px;
  --ve-btn-padding: 10px 20px;
  --ve-btn-font-family: var(--ani-monospace);
  --ve-btn-font-size: 1.5rem;
  --ve-btn-font-weight: bold;
  --ve-btn-text-align: center;
  --ve-btn-background-color: var(--ani-white);
  --ve-btn-color: var(--ani-black);
  --ve-btn-cursor: pointer;
  --ve-btn-hover-border-radius: 10px;
  --ve-btn-hover-background-color: var(--ani-silver);
  --ve-btn-hover-color: var(--ani-black);
  --ve-btn-hover-transition: all 200ms;
  --ve-btn-child-display: block;
  --ve-btn-child-margin: auto;
}

$colors: 'red', 'orange', 'yellow', 'lime', 'green', 'aqua', 'cyan', 'sky', 'blue', 'violet';

@mixin btn-vars($color) {
  .btn-#{$color} {
    --ve-btn-#{$color}-color: var(--ani-#{$color}-dark);
    --ve-btn-#{$color}-hover-color: var(--ani-#{$color}-light);
  }
}

@each $color in $colors {
  @include btn-vars($color);
}
</style>

<style lang="scss" scoped>
a,
button {
  display: var(--ve-btn-display);
  margin: var(--ve-btn-margin);
  border: var(--ve-btn-border);
  border-radius: var(--ve-btn-border-radius);
  padding: var(--ve-btn-padding);
  font-family: var(--ve-btn-font-family);
  font-size: var(--ve-btn-font-size);
  font-weight: var(--ve-btn-font-weight);
  text-align: var(--ve-btn-text-align);
  background-color: var(--ve-btn-background-color);
  color: var(--ve-btn-color);
  cursor: var(--ve-btn-cursor);
}

a:hover,
a:focus,
button:hover,
button:focus {
  border-color: var(--ve-btn-hover-color);
  border-radius: var(--ve-btn-hover-border-radius);
  background-color: var(--ve-btn-hover-background-color);
  color: var(--ve-btn-hover-color);
  transition: var(--ve-btn-hover-transition);
}

a > *,
button > * {
  display: var(--ve-btn-child-display);
  margin: var(--ve-btn-child-margin);
}

$colors: 'red', 'orange', 'yellow', 'lime', 'green', 'aqua', 'cyan', 'sky', 'blue', 'violet';

@mixin btn-props($color) {
  .btn-#{$color} {
    border-color: var(--ve-btn-#{$color}-color);
    color: var(--ve-btn-#{$color}-color);
  }

  .btn-#{$color}:hover,
  .btn-#{$color}:focus {
    background-color: var(--ve-btn-#{$color}-hover-color);
  }
}

@each $color in $colors {
  @include btn-props($color);
}
</style>
