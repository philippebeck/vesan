<template>
  <article v-if="isArticle" :class="$attrs.class" :id="id">
    <header>
      <slot name="header"></slot>
    </header>

    <slot name="body"></slot>

    <aside v-if="hasAsideSlot">
      <slot name="aside"></slot>
    </aside>

    <footer v-if="hasFooterSlot">
      <slot name="footer"></slot>
    </footer>
  </article>

  <section v-else :class="$attrs.class" :id="id">
    <header>
      <slot name="header"></slot>
    </header>

    <slot name="body"></slot>

    <aside v-if="hasAsideSlot">
      <slot name="aside"></slot>
    </aside>

    <footer v-if="hasFooterSlot">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardElt",

  props: {
    isArticle: { type: Boolean, default: false },
    id: String
  },

  setup(props, { slots }) {
    const hasAsideSlot  = () => Object.prototype.hasOwnProperty.call(slots, "aside");
    const hasFooterSlot = () => Object.prototype.hasOwnProperty.call(slots, "footer");

    return {
      hasAsideSlot,
      hasFooterSlot
    };
  }
});
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
