<template>
  <table>
    <caption v-if="hasSlot('title')">
      <slot name="title" :title="title">{{ title }}</slot>
    </caption>

    <thead>
      <tr>
        <th v-for="(value, key) in items[0]" :key="key">{{ key }}</th>

        <th v-if="hasSlot('head')">
          <slot name="head"></slot>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in items" :key="index">

        <td v-for="(value, key) in item" :key="key">
          <slot :name="`cell-${key}`"
            :index="index"
            :item="item"
            :key="key"
            :value="value">
            {{ value }}
          </slot>
        </td>

        <td v-if="hasSlot('body')">
          <slot name="body" :index="index" :item="item"></slot>
        </td>
      </tr>
    </tbody>

    <tfoot v-if="hasSlot('foot')">
      <slot name="foot"></slot>
    </tfoot>
  </table>
</template>

<script>
import { defineComponent } from "vue";
import { checkSlot } from "../app/services";

export default defineComponent({
  name: "TableElt",

  props: {
    title: { type: String },
    items: { type: Array, required: true }
  },

  /**
   * ? SETUP
   * * Setup the component
   * @param {Object} props 
   * @param {Object} - Object that contains the slots of the component.
   */
  setup(props, { slots }) {
    /**
     * ? HAS SLOT
     * * Checks if the component has a slot
     * @param {string} name 
     */
    const hasSlot = (name) => checkSlot(slots, name);

    return { hasSlot };
  }
});
</script>

<style>
table {
  --ve-table-display: table;
  --ve-table-overflow: hidden;
  --ve-table-table-layout: fixed;
  --ve-table-margin: 50px auto;
  --ve-table-border-collapse: separate;
  --ve-table-border-spacing: 1px;
  --ve-table-border-radius: 10px;
  --ve-table-width: 100%;
  --ve-table-max-width: 100%;
  --ve-table-font-size: 1.5rem;
}

caption {
  --ve-table-caption-caption-side: top;
  --ve-table-caption-margin-bottom: 20px;
  --ve-table-caption-font-size: 1.5rem;
  --ve-table-caption-font-weight: bold;
  --ve-table-caption-color: var(--ani-slate);
  --ve-table-caption-text-shadow: 1px 1px 2px;
}

thead {
  --ve-table-thead-border-radius: 10px;
}

tr {
  --ve-table-tr-display: flex;
  --ve-table-tr-flex-flow: column;
  --ve-table-tr-padding: 20px;
  --ve-table-tbody-tr-even-background-color: var(--ani-silver);
  --ve-table-tbody-tr-even-color: var(--ani-black);
  --ve-table-tbody-tr-odd-background-color: var(--ani-white);
  --ve-table-tbody-tr-odd-color: var(--ani-slate);
  --ve-table-tbody-tr-hover-background-color: var(--ani-gray);
  --ve-table-tbody-tr-hover-color: var(--ani-black);
}

th {
  --ve-table-th-display: none;
  --ve-table-th-padding: 5px;
  --ve-table-th-font-size: 1.5rem;
  --ve-table-th-font-style: italic;
  --ve-table-th-text-align: center;
  --ve-table-th-text-transform: uppercase;
  --ve-table-th-vertical-align: middle;
  --ve-table-th-background-color: var(--ani-sky-dark);
  --ve-table-th-color: var(--ani-white);
}

td {
  --ve-table-td-display: table;
  --ve-table-td-padding: 5px;
  --ve-table-td-text-align: center;
  --ve-table-td-vertical-align: middle;
  --ve-table-td-word-break: normal;
  --ve-table-td-cursor: cell;
}

@media (min-width: 1200px) {
  tr {
    --ve-table-tr-display: table-row;
  }

  th {
    --ve-table-th-display: table-cell;
  }

  td {
    --ve-table-td-display: table-cell;
  }
}
</style>

<style scoped>
table {
  display: var(--ve-table-display);
  overflow: var(--ve-table-overflow);
  table-layout: var(--ve-table-table-layout);
  margin: var(--ve-table-margin);
  border-collapse: var(--ve-table-border-collapse);
  border-spacing: var(--ve-table-border-spacing);
  border-radius: var(--ve-table-border-radius);
  width: var(--ve-table-width);
  max-width: var(--ve-table-max-width);
  font-size: var(--ve-table-font-size);
}

caption {
  caption-side: var(--ve-table-caption-caption-side);
  margin-bottom: var(--ve-table-caption-margin-bottom);
  font-size: var(--ve-table-caption-font-size);
  font-weight: var(--ve-table-caption-font-weight);
  color: var(--ve-table-caption-color);
  text-shadow: var(--ve-table-caption-text-shadow);
}

thead {
  border-radius: var(--ve-table-thead-border-radius);
}

tr {
  display: var(--ve-table-tr-display);
  flex-flow: var(--ve-table-tr-flex-flow);
  padding: var(--ve-table-tr-padding);
}

tbody {
  tr:nth-child(even) {
    background-color: var(--ve-table-tbody-tr-even-background-color);
    color: var(--ve-table-tbody-tr-even-color);
  }

  tr:nth-child(odd) {
    background-color: var(--ve-table-tbody-tr-odd-background-color);
    color: var(--ve-table-tbody-tr-odd-color);
  }

  tr:hover,
  tr:focus {
    background-color: var(--ve-table-tbody-tr-hover-background-color);
    color: var(--ve-table-tbody-tr-hover-color);
  }
}

th {
  display: var(--ve-table-th-display);
  padding: var(--ve-table-th-padding);
  font-size: var(--ve-table-th-font-size);
  font-style: var(--ve-table-th-font-style);
  text-align: var(--ve-table-th-text-align);
  text-transform: var(--ve-table-th-text-transform);
  vertical-align: var(--ve-table-th-vertical-align);
  background-color: var(--ve-table-th-background-color);
  color: var(--ve-table-th-color);
}

td {
  display: var(--ve-table-td-display);
  padding: var(--ve-table-td-padding);
  text-align: var(--ve-table-td-text-align);
  vertical-align: var(--ve-table-td-vertical-align);
  word-break: var(--ve-table-td-word-break);;
  cursor: var(--ve-table-td-cursor);
}
</style>
