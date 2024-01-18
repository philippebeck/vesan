<template>
  <footer>
    <button v-if="hasSlot('hide')" @click="toggleSide()" aria-label="show/hide">
      <slot name="hide"></slot>
    </button>

    <ul id="foot" 
      v-if="hasSlot('foot1') || hasSlot('foot2') || hasSlot('foot3')"
      :class="{ 'hide': isMobile, 'show': !isMobile }">

      <li v-if="hasSlot('foot1')">
        <section>
          <h3>{{ title1 }}</h3>
          <slot name="foot1"></slot>
        </section>
      </li>

      <li v-if="hasSlot('foot2')">
        <section>
          <h3>{{ title2 }}</h3>
          <slot name="foot2"></slot>
        </section>
      </li>

      <li v-if="hasSlot('foot3')">
        <section>
          <h3>{{ title3 }}</h3>
          <slot name="foot3"></slot>
        </section>
      </li>
    </ul>

    <aside v-if="hasSlot('foot')">
      <slot name="foot"></slot>
    </aside>
  </footer>
</template>

<script>
export default {
  name: "FootElt",
  props: {
    title1: { type: String, default: "" },
    title2: { type: String, default: "" },
    title3: { type: String, default: "" }
  },
  data() {
    return {
      isMobile: false
    };
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    /**
     * ? HAS SLOT
     * * Determines if the specified slot name is available in the component's slots.
     * @param {string} name - The name of the slot to check for.
     * @return {boolean} Returns true if the component has the specified slot, false otherwise.
     */
    hasSlot(name) {
      return Object.prototype.hasOwnProperty.call(this.$slots, name);
    },

    /**
     * ? HANDLE RESIZE
     * * Handles the resize event & updates the `isMobile` flag accordingly.
     */
    handleResize() {
      this.isMobile = window.innerWidth < 1600;
    },

    /**
     * ? TOGGLE SIDE
     * * Toggles the visibility of the side element by toggling its show/hide classes.
     */
    toggleSide() {
      const foot = document.getElementById("foot");
      foot.classList.replace("show", "hide") || foot.classList.replace("hide", "show");
    }
  }
}
</script>

<style>
main {
  --ve-main-margin-bottom: 50px;

  margin-bottom: var(--ve-main-margin-bottom);
}

footer {
  --ve-foot-position: fixed;
  --ve-foot-bottom: 0;
  --ve-foot-z-index: 1000;
  --ve-foot-margin-top: 50px;
  --ve-foot-width: 100%;
  --ve-foot-text-align: center;
  --ve-foot-button-border: none;
  --ve-foot-button-background-color: transparent;
  --ve-foot-button-position: absolute;
  --ve-foot-button-bottom: 12px;
  --ve-foot-button-left: 5px;
  --ve-foot-button-color: var(--ani-sky-dark);
  --ve-foot-child-margin: 0;
  --ve-foot-child-padding: 0;
  --ve-foot-li-list-style: none;
  --ve-foot-a-text-decoration: none;
  --ve-foot-a-cursor: pointer;
  --ve-foot-ul-display: flex;
  --ve-foot-ul-flex-flow: column;
  --ve-foot-ul-gap: 10px;
  --ve-foot-ul-place-content: center;
  --ve-foot-ul-place-items: center;
  --ve-foot-ul-padding: 10px;
  --ve-foot-ul-background-color: var(--ani-sky-dark);
  --ve-foot-title-margin-bottom: 5px;
  --ve-foot-title-font-size: 2rem;
  --ve-foot-title-font-family: var(--ani-monospace);
  --ve-foot-title-color: var(--ani-yellow-light);
  --ve-foot-section-a-color: var(--ani-white);
  --ve-foot-section-a-hover-color: var(--ani-orange-light);
}

.hide {
  --ve-foot-hide-display: none;
}

.show {
  --ve-foot-show-display: flex;
}

aside {
  --ve-foot-aside-ul-display: flex;
  --ve-foot-aside-ul-flex-flow: row;
  --ve-foot-aside-ul-gap: 10px;
  --ve-foot-aside-ul-place-content: center;
  --ve-foot-aside-ul-place-items: center;
  --ve-foot-aside-ul-padding: 10px;
  --ve-foot-aside-ul-background-color: var(--ani-white);
  --ve-foot-aside-a-color: var(--ani-blue);
  --ve-foot-aside-i-hover-transform: scale(1.2);
  --ve-foot-aside-i-hover-transition: transform 200ms;
}

@media (min-width: 576px) {
  footer {
    --ve-foot-ul-flex-flow: row;
    --ve-foot-ul-place-content: space-around;
    --ve-foot-ul-place-items: baseline;
  }
}

@media (min-width: 768px) {
  footer {
    --ve-foot-ul-place-content: space-evenly;
  }
}

@media (min-width: 992px) {
  footer {
    --ve-foot-ul-gap: 15vw;
    --ve-foot-ul-place-content: center;
  }
}

  @media (min-width: 1200px) {
  footer {
    --ve-foot-ul-gap: 10vw;
    --ve-foot-section-a-display: none;
    --ve-foot-section-a-hover-display: block;
  }
}

  @media (min-width: 1600px) {
    main {
      --ve-main-margin-bottom: 200px;
    }
}
</style>

<style scoped>
footer {
  position: var(--ve-foot-position);
  bottom: var(--ve-foot-bottom);
  z-index: var(--ve-foot-z-index);
  margin-top: var(--ve-foot-margin-top);
  width: var(--ve-foot-width);
  text-align: var(--ve-foot-text-align);
}

footer > button {
  border: var(--ve-foot-button-border);
  background-color: var(--ve-foot-button-background-color);
  position: var(--ve-foot-button-position);
  bottom: var(--ve-foot-button-bottom);
  left: var(--ve-foot-button-left);
  color: var(--ve-foot-button-color);
}

.hide {
  display: var(--ve-foot-hide-display);
}

.show {
  display: var(--ve-foot-show-display);
}

h3,
h4,
:deep(ul) {
  margin: var(--ve-foot-child-margin);
  padding: var(--ve-foot-child-padding);
}

:deep(li) {
  list-style: var(--ve-foot-li-list-style);
}

:deep(a) {
  text-decoration: var(--ve-foot-a-text-decoration);
  cursor: var(--ve-foot-a-cursor);
}

footer > ul { 
  display: var(--ve-foot-ul-display);
  flex-flow: var(--ve-foot-ul-flex-flow);
  gap: var(--ve-foot-ul-gap);
  place-content: var(--ve-foot-ul-place-content);
  place-items: var(--ve-foot-ul-place-items);
  padding: var(--ve-foot-ul-padding);
  background-color: var(--ve-foot-ul-background-color);
}

h3,
h4 {
  margin-bottom: var(--ve-foot-title-margin-bottom);
  font-size: var(--ve-foot-title-font-size);
  font-family: var(--ve-foot-title-font-family);
  color: var(--ve-foot-title-color);
}

section :deep(a) {
  color: var(--ve-foot-section-a-color);
}

section :deep(a):hover,
section :deep(a):focus {
  color: var(--ve-foot-section-a-hover-color);
}

aside :deep(ul) {
  display: var(--ve-foot-aside-ul-display);
  flex-flow: var(--ve-foot-aside-ul-flex-flow);
  gap: var(--ve-foot-aside-ul-gap);
  place-content: var(--ve-foot-aside-ul-place-content);
  place-items: var(--ve-foot-aside-ul-place-items);
  padding: var(--ve-foot-aside-ul-padding);
  background-color: var(--ve-foot-aside-ul-background-color);
}

aside :deep(a) {
  color: var(--ve-foot-aside-a-color);
}

aside :deep(i):hover,
aside :deep(i):focus {
  transform: var(--ve-foot-aside-i-hover-transform);
  transition: var(--ve-foot-aside-i-hover-transition);
}
</style>
