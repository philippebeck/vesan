<template>
  <fieldset :title="info">
    <legend v-if="hasSlot('legend')">
      <slot name="legend"></slot>
    </legend>

    <input v-if="fieldType === 'number'" 
      :type="type"
      :id="id"
      :name="name"
      :value="value"
      @input="onInput"
      :min="min"
      :max="max"
      :aria-label="label"
      :itemprop="itemprop"
      :required="required">

    <input v-else-if="fieldType === 'special'"
      :type="type"
      :id="id"
      :name="name"
      :value="value"
      @input="onInput"
      :aria-label="label"
      :itemprop="itemprop"
      :required="required">

    <select v-else-if="fieldType === 'list' && content"
      :id="id"
      :name="name"
      @input="onInput"
      :placeholder="info"
      :aria-label="label"
      :itemprop="itemprop"
      :required="required">

      <option v-if="value" :value="value">{{ content }}</option>
      <option v-else>{{ info }}</option>
      <option v-for="(item, key) in list" :key="key" :value="item.value">
        {{ item.content }}
      </option>
    </select>

    <select v-else-if="fieldType === 'list'"
      :id="id"
      :name="name"
      @input="onInput"
      :placeholder="info"
      :aria-label="label"
      :itemprop="itemprop"
      :required="required">

      <option v-if="value" :value="value">{{ value }}</option>
      <option v-else>{{ info }}</option>
      <option v-for="(item, key) in list" :key="key" :value="item">
        {{ item }}
      </option>
    </select>

    <textarea v-else-if="fieldType === 'area'"
      :id="id"
      :name="name"
      :value="value"
      @input="onInput"
      :placeholder="info"
      :minlength="min"
      :maxlength="max"
      :cols="cols"
      :rows="rows"
      :aria-label="label"
      :itemprop="itemprop"
      :required="required"></textarea>

    <input v-else
      :type="type"
      :id="id"
      :name="name"
      :value="value"
      @input="onInput"
      :placeholder="info"
      :minlength="min"
      :maxlength="max"
      :aria-label="label"
      :itemprop="itemprop"
      :required="required">

    <label v-if="hasSlot('label')" :for="id">
      <slot name="label"></slot>
    </label>
  </fieldset>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FieldElt",

  props: {
    model: { prop: "value", event: "update" },
    type: { type: String, default: "text" },
    value: [String, Number, Array],
    content: [String, Number],
    id: String,
    name: String,
    list: Array,
    info: String,
    min: { type: Number, default: 2 },
    max: { type: Number, default: 250 },
    cols: { type: Number, default: 20 },
    rows: { type: Number, default: 5 },
    label: String,
    itemprop: String,
    required: { type: String, default: "true" }
  },

  setup(props, { slots, emit }) {
    const fieldType = ref("");

    const hasSlot = (name) => {
      return Object.prototype.hasOwnProperty.call(slots, name);
    };

    const onInput = (event) => {
      emit("update:value", event.target.value);
    };

    const getFieldType = () => {
      const fieldTypes = {
        "number": ["number", "date", "time", "range"],
        "special": ["checkbox", "radio", "color"],
        "list": ["option", "select"],
        "area": ["textarea"]
      };

      fieldType.value = Object.keys(fieldTypes).find(key => fieldTypes[key].includes(props.type)) || "text";
    };

    getFieldType();

    return {
      fieldType,
      hasSlot,
      onInput,
      getFieldType
    }
  }
});
</script>

<style>
fieldset {
  --ve-field-display: flex;
  --ve-field-flex-flow: row wrap;
  --ve-field-place-items: center;
  --ve-field-margin: auto;
  --ve-field-border: none;
  --ve-field-padding: 0;
  --ve-field-max-width: 500px;
  --ve-field-text-align: center;
  --ve-field-transition: max-width 1s;
  --ve-field-child-box-sizing: border-box;
  --ve-field-child-margin: 5px;
  --ve-field-child-padding: 5px;
}

legend {
  --ve-field-legend-width: 93%;
  --ve-field-legend-font-size: 2rem;
  --ve-field-legend-color: var(--ani-slate);
  --ve-field-hover-legend-color: var(--ani-black);
}

label {
  --ve-field-label-width: 100%;
  --ve-field-label-visibility: hidden;
  --ve-field-label-font-size: 1.5rem;
  --ve-field-label-font-style: italic;
  --ve-field-label-color: var(--ani-blue-dark);
  --ve-field-hover-label-visibility: visible;
  --ve-field-hover-label-transform: scale(1.1);
  --ve-field-hover-label-transition: all 1s;
}

input,
select,
textarea {
  --ve-field-input-border: 1px solid var(--ani-sky-light);
  --ve-field-input-border-radius: 10px;
  --ve-field-input-outline: none;
  --ve-field-input-width: 100%;
  --ve-field-input-line-height: 1.8;
  --ve-field-input-background-color: var(--ani-white);
  --ve-field-hover-input-border: 1px solid var(--ani-sky);
  --ve-field-hover-input-border-radius: 0;
  --ve-field-hover-input-background-color: var(--ani-white);
  --ve-field-hover-input-transition: all 500ms;
}

@media (min-width: 1200px) {
  table {
    legend,
    label {
      display: none;
    }
  }
}
</style>

<style scoped>
fieldset {
  display: var(--ve-field-display);
  flex-flow: var(--ve-field-flex-flow);
  place-items: var(--ve-field-place-items);;
  margin: var(--ve-field-margin);
  border: var(--ve-field-border);
  padding: var(--ve-field-padding);
  max-width: var(--ve-field-max-width);
  text-align: var(--ve-field-text-align);
  transition: var(--ve-field-transition);

  & > * {
    box-sizing: var(--ve-field-child-box-sizing);
    margin: var(--ve-field-child-margin);
    padding: var(--ve-field-child-padding);
  }

  legend {
    width: var(--ve-field-legend-width);
    font-size: var(--ve-field-legend-font-size);
    color: var(--ve-field-legend-color);
  }

  &:hover legend {
    color: var(--ve-field-hover-legend-color);
  }

  label {
    width: var(--ve-field-label-width);
    visibility: var(--ve-field-label-visibility);
    font-size: var(--ve-field-label-font-size);
    font-style: var(--ve-field-label-font-style);
    color: var(--ve-field-label-color);
  }

  input,
  select,
  textarea {
    border: var(--ve-field-input-border);
    border-radius: var(--ve-field-input-border-radius);
    outline: var(--ve-field-input-outline);
    width: var(--ve-field-input-width);
    line-height: var(--ve-field-input-line-height);
    background-color: var(--ve-field-input-background-color);
  }

  &:hover > input,
  &:hover > select,
  &:hover > textarea,
  input:focus,
  select:focus,
  textarea:focus {
    border: var(--ve-field-hover-input-border);
    border-radius: var(--ve-field-hover-input-border-radius);
    background-color: var(--ve-field-hover-input-background-color);
    transition: var(--ve-field-hover-input-transition);
  }
}

fieldset:hover > label,
input:focus + label,
select:focus + label,
textarea:focus + label {
  visibility: var(--ve-field-hover-label-visibility);
  transform: var(--ve-field-hover-label-transform);
  transition: var(--ve-field-hover-label-transition);
}
</style>
