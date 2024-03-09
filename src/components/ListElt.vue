<template>
  <ul v-if="dynamic">
    <li v-for="(item, index) in items" :key="index">
      <slot name="items" :index="index" :item="item">
        {{ item }}
      </slot>

      <ul v-if="hasSlot('nested')">
        <li v-for="(value, key) in item" :key="key">
          <slot name="nested" :index="index" :item="item" :key="key" :value="value">
            {{ value }}
          </slot>
        </li>
      </ul>
    </li>
  </ul>

  <ul v-else>
    <li v-for="(item, index) in items" :key="index">
      <slot :name="`item-${index + 1}`" :index="index" :item="item">
        {{ item }}
      </slot>

      <ul v-if="hasSlot('nested')">
        <li v-for="(value, key) in item" :key="key">
          <slot :name="`nested-${key + 1}`" :index="index" :item="item" :key="key" :value="value">
            {{ value }}
          </slot>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { checkSlot } from '../assets/services'

export default defineComponent({
  name: 'ListElt',

  props: {
    items: { type: Object, required: true },
    dynamic: { type: Boolean, default: false }
  },

  /**
   * ? SETUP
   * * Setup the component
   *
   * @param {Object} props - The props of the component.
   * @param {Object} - Object that contains the slots of the component.
   * @returns {{ hasSlot: (name: string) => boolean }}
   */
  setup(
    props: {
      /* define the type of props here */
    },
    {
      slots
    }: {
      /* define the type of slots here */
    }
  ) {
    /**
     * ? HAS SLOT
     * * Checks if the component has a slot
     *
     * @param {string} name - Name of the slot to check.
     * @returns {boolean} - Whether the component has the specified slot.
     */
    const hasSlot = (name: string): boolean => checkSlot(slots, name)

    return { hasSlot }
  }
})
</script>

<style>
ul {
  --ve-list-margin: 0;
  --ve-list-padding: 0;
  --ve-list-list-style: none;
  --ve-list-text-align: center;
  --ve-list-li-ul-display: flex;
  --ve-list-li-ul-flex-flow: wrap;
  --ve-list-li-ul-gap: 20px;
  --ve-list-li-ul-place-content: center;
  --ve-list-li-ul-place-items: baseline;
  --ve-list-li-li-max-width: 500px;
}
</style>

<style scoped>
ul {
  margin: var(--ve-list-margin);
  padding: var(--ve-list-padding);
  list-style: var(--ve-list-list-style);
  text-align: var(--ve-list-text-align);
}

li {
  & > ul {
    display: var(--ve-list-li-ul-display);
    flex-flow: var(--ve-list-li-ul-flex-flow);
    gap: var(--ve-list-li-ul-gap);
    place-content: var(--ve-list-li-ul-place-content);
    place-items: var(--ve-list-li-ul-place-items);
  }

  li {
    max-width: var(--ve-list-li-li-max-width);
  }
}
</style>
