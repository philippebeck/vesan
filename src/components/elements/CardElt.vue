<template>
  <article v-if="isArticle === true" :class="$attrs.class" :id="id">
    <header>
      <slot name="header"></slot>
    </header>

    <slot name="body"></slot>

    <aside v-if="hasSlot('aside')">
      <slot name="aside"></slot>
    </aside>

    <footer v-if="hasSlot('footer')">
      <slot name="footer"></slot>
    </footer>
  </article>

  <section v-else :class="$attrs.class" :id="id">
    <header>
      <slot name="header"></slot>
    </header>

    <slot name="body"></slot>

    <aside v-if="hasSlot('aside')">
      <slot name="aside"></slot>
    </aside>

    <footer v-if="hasSlot('footer')">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script>
export default {
  name: "CardElt",
  props: {
    isArticle: { type: Boolean, default: false },
    id: String
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
    }
  }
}
</script>

<style>
article,
section {
  --ve-card-box-sizing: border-box;
  --ve-card-margin: auto;
  --ve-card-border: 1px solid transparent;
  --ve-card-border-radius: 10px;
  --ve-card-padding: 10px;
  --ve-card-width: 100%;
  --ve-card-background-color: transparent;
  --ve-card-color: var(--ani-slate);
  --ve-card-header-margin-bottom: 30px;
}
</style>

<style scoped>
article,
section {
  box-sizing: var(--ve-card-box-sizing);
  margin: var(--ve-card-margin);
  border: var(--ve-card-border);
  border-radius: var(--ve-card-border-radius);
  padding: var(--ve-card-padding);
  width: var(--ve-card-width);
  background-color: var(--ve-card-background-color);
  color: var(--ve-card-color);
}

article header,
section header {
  margin-bottom: var(--ve-card-header-margin-bottom);
}
</style>
