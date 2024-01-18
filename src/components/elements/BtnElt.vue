<template>
  <button v-if="getBtnType() === 'button'"
    :type="type"
    :value="value"
    :class="$attrs.class"
    :title="title">
    <slot name="btn"></slot>
    {{ content }}
  </button>

  <a v-else
    :href="href"
    :class="$attrs.class"
    :title="title">
    <slot name="btn"></slot>
    {{ content }}
  </a>
</template>

<script>
  export default {
    name: "BtnElt",
    props: {
      type: { type: String, default: "link" },
      value: String,
      href: String,
      content: String,
      title: String
    },

    methods: {
      /**
       * ? GET BTN TYPE
       * * Determines the type of button based on the 'type' property.
       * @return {string} Returns 'button', 'submit', 'reset' or 'link'.
       */
      getBtnType() {
        const validTypes = ["button", "submit", "reset"];

        return validTypes.includes(this.type) ? "button" : "link";
      }
    }
  }
</script>

<style>
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

.btn-red {
  --ve-btn-red-color: var(--ani-red-dark);
  --ve-btn-red-hover-color: var(--ani-red-light);
}

.btn-orange {
  --ve-btn-orange-color: var(--ani-orange-dark);
  --ve-btn-orange-hover-color: var(--ani-orange-light);
}

.btn-yellow {
  --ve-btn-yellow-color: var(--ani-yellow-dark);
  --ve-btn-yellow-hover-color: var(--ani-yellow-light);
}

.btn-lime {
  --ve-btn-lime-color: var(--ani-lime-dark);
  --ve-btn-lime-hover-color: var(--ani-lime-light);
}

.btn-green {
  --ve-btn-green-color: var(--ani-green-dark);
  --ve-btn-green-hover-color: var(--ani-green-light);
}

.btn-aqua {
  --ve-btn-aqua-color: var(--ani-aqua-dark);
  --ve-btn-aqua-hover-color: var(--ani-aqua-light);
}

.btn-cyan {
  --ve-btn-cyan-color: var(--ani-cyan-dark);
  --ve-btn-cyan-hover-color: var(--ani-cyan-light);
}

.btn-sky {
  --ve-btn-sky-color: var(--ani-sky-dark);
  --ve-btn-sky-hover-color: var(--ani-sky-light);
}

.btn-blue {
  --ve-btn-blue-color: var(--ani-blue-dark);
  --ve-btn-blue-hover-color: var(--ani-blue-light);
}

.btn-violet {
  --ve-btn-violet-color: var(--ani-violet-dark);
  --ve-btn-violet-hover-color: var(--ani-violet-light);
}

.btn-magenta {
  --ve-btn-magenta-color: var(--ani-magenta-dark);
  --ve-btn-magenta-hover-color: var(--ani-magenta-light);
}

.btn-pink {
  --ve-btn-pink-color: var(--ani-pink-dark);
  --ve-btn-pink-hover-color: var(--ani-pink-light);
}
</style>

<style scoped>
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

.btn-red {
  border-color: var(--ve-btn-red-color);
  color: var(--ve-btn-red-color);
}

.btn-red:hover,
.btn-red:focus {
  background-color: var(--ve-btn-red-hover-color);
}

.btn-orange {
  border-color: var(--ve-btn-orange-color);
  color: var(--ve-btn-orange-color);
}

.btn-orange:hover,
.btn-orange:focus {
  background-color: var(--ve-btn-orange-hover-color);
}

.btn-yellow {
  border-color: var(--ve-btn-yellow-color);
  color: var(--ve-btn-yellow-color);
}

.btn-yellow:hover,
.btn-yellow:focus {
  background-color: var(--ve-btn-yellow-hover-color);
}

.btn-lime {
  border-color: var(--ve-btn-lime-color);
  color: var(--ve-btn-lime-color);
}

.btn-lime:hover,
.btn-lime:focus {
  background-color: var(--ve-btn-lime-hover-color);
}
.btn-green {
  border-color: var(--ve-btn-green-color);
  color: var(--ve-btn-green-color);
}

.btn-green:hover,
.btn-green:focus {
  background-color: var(--ve-btn-green-hover-color);
}

.btn-aqua {
  border-color: var(--ve-btn-aqua-color);
  color: var(--ve-btn-aqua-color);
}

.btn-aqua:hover,
.btn-aqua:focus {
  background-color: var(--ve-btn-aqua-hover-color);
}

.btn-cyan {
  border-color: var(--ve-btn-cyan-color);
  color: var(--ve-btn-cyan-color);
}

.btn-cyan:hover,
.btn-cyan:focus {
  background-color: var(--ve-btn-cyan-hover-color);
}

.btn-sky {
  border-color: var(--ve-btn-sky-color);
  color: var(--ve-btn-sky-color);
}

.btn-sky:hover,
.btn-sky:focus {
  background-color: var(--ve-btn-sky-hover-color);
}

.btn-blue {
  border-color: var(--ve-btn-blue-color);
  color: var(--ve-btn-blue-color);
}

.btn-blue:hover,
.btn-blue:focus {
  background-color: var(--ve-btn-blue-hover-color);
}

.btn-violet {
  border-color: var(--ve-btn-violet-color);
  color: var(--ve-btn-violet-color);
}

.btn-violet:hover,
.btn-violet:focus {
  background-color: var(--ve-btn-violet-hover-color);
}

.btn-magenta {
  border-color: var(--ve-btn-magenta-color);
  color: var(--ve-btn-magenta-color);
}

.btn-magenta:hover,
.btn-magenta:focus {
  background-color: var(--ve-btn-magenta-hover-color);
}

.btn-pink {
  border-color: var(--ve-btn-pink-color);
  color: var(--ve-btn-pink-color);
}

.btn-pink:hover,
.btn-pink:focus {
  background-color: var(--ve-btn-pink-hover-color);
}
</style>
