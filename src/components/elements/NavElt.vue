<template>
  <nav v-if="getNavClass() === 'sidebar'" class="sidebar">

    <button v-if="hasSlot('hide')" @click="toggleSide()" aria-label="show/hide">
      <slot name="hide"></slot>
    </button>

    <ul id="side" :class="{ 'hide': isMobile, 'show': !isMobile }">
        <li v-if="hasSlot('first')">
          <slot name="first"></slot>
        </li>

        <li v-for="(item, index) in items" :key="index">
          <a :href="`#${item}`" :title="item" :aria-label="item">
            <slot name="items" :item="item" :index="index">
              {{ item }}
            </slot>
          </a>
        </li>

        <li v-if="hasSlot('last')">
          <slot name="last"></slot>
        </li>

        <li>
          <a v-if="hasSlot('top')" href="#top" aria-label="top">
          <slot name="top"></slot>
          </a>
      </li>
    </ul>
  </nav>

  <nav v-else class="navbar">
    <a v-if="hasSlot('brand')" href="/" title="Home" aria-label="Home">
      <slot name="brand"></slot>
    </a>

    <ul>
      <li v-for="(item, index) in items" :key="index">
        <a :href="item.href" :aria-label="item.name">
          <slot name="items" :item="item" :index="index">
            <i :class="`fa-${item.type} fa-${item.icon} fa-fw`"></i>
          </slot>
          <b>{{ item.name }}</b>
        </a>
      </li>
    </ul>

    <aside v-if="hasSlot('profile')">
      <slot name="profile"></slot>
    </aside>
  </nav>
</template>

<script>
export default {
  name: "NavElt",
  props: {
    class: { type: String, default: "navbar" },
    items: { type: Array }
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
     * ? GET NAV CLASS
     * * Returns a string representing the navigation class based on the value of 'class'.
     * @return {string} Either 'sidebar' or 'navbar'.
     */
    getNavClass() {
      return this.class === "sidebar" ? "sidebar" : "navbar";
    },

    /**
     * ? HANDLE RESIZE
     * * Handles the resize event & updates the `isMobile` flag accordingly.
     */
    handleResize() {
      this.isMobile = window.innerWidth < 768;
    },

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
     * ? TOGGLE SIDE
     * * Toggles the visibility of the side element by toggling its show/hide classes.
     */
    toggleSide() {
      const side = document.getElementById("side");
      side.classList.replace("show", "hide") || side.classList.replace("hide", "show");
    }
  }
}
</script>

<style>
:root {
  --ve-nav-margin: 10px;
  --ve-nav-height: 50px;
}

.navbar {
  --ve-nav-display: flex;
  --ve-nav-place-content: space-between;
  --ve-nav-place-items: center;
  --ve-nav-position: fixed;
  --ve-nav-top: 0;
  --ve-nav-right: 0;
  --ve-nav-bottom: unset;
  --ve-nav-left: 0;
  --ve-nav-z-index: 1000;
  --ve-nav-background-color: var(--ani-sky-dark);
  --ve-nav-a-padding: 10px;
  --ve-nav-a-color: var(--ani-white);
  --ve-nav-a-cursor: pointer;
  --ve-nav-ul-display: flex;
  --ve-nav-ul-place-items: center;
  --ve-nav-ul-margin: 0;
  --ve-nav-ul-padding: 0;
  --ve-nav-ul-list-style: none;
  --ve-nav-ul-a-display: flex;
  --ve-nav-ul-a-not-i-display: none;
  --ve-nav-ul-a-flex-direction: column;
  --ve-nav-ul-a-hover-color: var(--ani-yellow-light);
  --ve-nav-ul-a-hover-transform: scale(0.9);
  --ve-nav-aside-hover-color: var(--ani-orange-light);
  --ve-nav-button-background-color: transparent;
  --ve-nav-button-border: none;
  --ve-nav-button-cursor: pointer;
  --ve-nav-i-place-self: center;
}

.sidebar {
  --ve-side-display: flex;
  --ve-side-flex-flow: column;
  --ve-side-position: fixed;
  --ve-side-top: calc(var(--ve-nav-height) + 10px);
  --ve-side-left: 2px;
  --ve-side-z-index: 10;
  --ve-side-width: auto;
  --ve-side-ul-display: flex;
  --ve-side-ul-flex-flow: column;
  --ve-side-a-display: flex;
  --ve-side-a-place-content: center;
  --ve-side-a-place-items: center;
  --ve-side-a-margin: 2px;
  --ve-side-a-border: none;
  --ve-side-a-border-radius: 20px;
  --ve-side-a-outline: none;
  --ve-side-a-padding: 10px;
  --ve-side-a-width: 100%;
  --ve-side-a-background-color: var(--ani-white-lighter);
  --ve-side-a-color: var(--ani-sky-dark);
  --ve-side-a-cursor: crosshair;
  --ve-side-a-hover-background-color: var(--ani-black);
  --ve-side-a-hover-color: var(--ani-sky-light);
  --ve-side-a-hover-transition: all 1s;
}

.hide {
  --ve-side-hide-display: none;
}

.show {
  --ve-side-show-display: flex;
}

@media (min-width: 576px) {
  .navbar {
    --ve-nav-place-content: space-around;
  }
}

@media (min-width: 768px) {
  :root {
    --ve-nav-margin: 20px;
    --ve-nav-height: 80px;
  }

  .navbar {
    --ve-nav-button-display: none;
    --ve-nav-ul-a-not-i-display: flex;
  }
}

[id="app"] {
  margin-top: calc(var(--ve-nav-height) + var(--ve-nav-margin));
}
</style>

<style scoped>
.navbar {
  display: var(--ve-nav-display);
  place-content: var(--ve-nav-place-content);
  place-items: var(--ve-nav-place-items);
  position: var(--ve-nav-position);
  top: var(--ve-nav-top);
  right: var(--ve-nav-right);
  bottom: var(--ve-nav-bottom);
  left: var(--ve-nav-left);
  z-index: var(--ve-nav-z-index);
  height: var(--ve-nav-height);
  background-color: var(--ve-nav-background-color);
}

.navbar :deep(a),
.navbar :deep(button) {
  padding: var(--ve-nav-a-padding);
  color: var(--ve-nav-a-color);
  cursor: var(--ve-nav-a-cursor);
}

.navbar :deep(ul) {
  display: var(--ve-nav-ul-display);
  place-items: var(--ve-nav-ul-place-items);
  margin: var(--ve-nav-ul-margin);
  padding: var(--ve-nav-ul-padding);
  list-style: var(--ve-nav-ul-list-style);
}

.navbar ul a,
.navbar ul button {
  display: var(--ve-nav-ul-a-display);
}

.navbar ul a :not(i),
.navbar ul button :not(i) {
  display: var(--ve-nav-ul-a-not-i-display);
}

.navbar :deep(ul) a,
.navbar :deep(ul) button {
  flex-direction: var(--ve-nav-ul-a-flex-direction);
}

.navbar ul a:hover,
.navbar ul a:focus,
.navbar ul button:hover,
.navbar ul button:focus {
  color: var(--ve-nav-ul-a-hover-color) !important;
  transform: var(--ve-nav-ul-a-hover-transform) !important;
}

.navbar :deep(aside) a:hover,
.navbar :deep(aside) a:focus,
.navbar :deep(aside) button:hover,
.navbar :deep(aside) button:focus {
  color: var(--ve-nav-aside-hover-color);
}

.navbar :deep(button) {
  background-color: var(--ve-nav-button-background-color);
  border: var(--ve-nav-button-border);
  cursor: var(--ve-nav-button-cursor);
}

.navbar :deep(i) {
  place-self: var(--ve-nav-i-place-self);
}

.sidebar {
  display: var(--ve-side-display);
  flex-flow: var(--ve-side-flex-flow);
  position: var(--ve-side-position);
  top: var(--ve-side-top);
  left: var(--ve-side-left);
  z-index: var(--ve-side-z-index);
  width: var(--ve-side-width);
}

.sidebar ul {
  display: var(--ve-side-ul-display);
  flex-flow: var(--ve-side-ul-flex-flow);
}

.sidebar :deep(a),
.sidebar button {
  display: var(--ve-side-a-display);
  place-content: var(--ve-side-a-place-content);
  place-items: var(--ve-side-a-place-items);
  margin: var(--ve-side-a-margin);
  border: var(--ve-side-a-border);
  border-radius: var(--ve-side-a-border-radius);
  outline: var(--ve-side-a-outline);
  padding: var(--ve-side-a-padding);
  width: var(--ve-side-a-width);
  background-color: var(--ve-side-a-background-color);
  color: var(--ve-side-a-color);
  cursor: var(--ve-side-a-cursor);
}

.sidebar :deep(a:hover),
.sidebar :deep(a:focus),
.sidebar button:hover,
.sidebar button:focus {
  color: var(--ve-side-a-hover-color);
  background-color: var(--ve-side-a-hover-background-color);
  transition: var(--ve-side-a-hover-transition);
}

.hide {
  display: var(--ve-side-hide-display) !important;
}

.show {
  display: var(--ve-side-show-display);
}
</style>
