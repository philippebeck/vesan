<template>
  <article v-if="isArticle" :class="$attrs.class" :id="id">
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

<script lang="ts">
import { defineComponent } from 'vue'
import { checkSlot } from '../assets/services'

export default defineComponent({
  name: 'CardElt',

  props: {
    isArticle: { type: Boolean, default: false },
    id: String
  },

  /**
   * ? SETUP
   * * Setup the component
   *
   * @param {Object} props - The props of the component.
   * @param {Object} - Object that contains the slots of the component.
   * @returns {{ hasSlot: (name: string) => boolean }} - Object with a function that checks if the component has a slot.
   */
  setup(props: object, { slots }: { slots: object }) {
    /**
     * ? HAS SLOT
     * * Checks if the component has a slot
     *
     * @param {string} name
     * @returns {boolean} - Whether the component has the specified slot.
     */
    const hasSlot = (name: string): boolean => checkSlot(slots, name)

    return { hasSlot }
  }
})
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

  header {
    margin-bottom: var(--ve-card-header-margin-bottom);
  }
}
</style>
