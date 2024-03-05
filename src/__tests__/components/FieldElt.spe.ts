import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount, enableAutoUnmount } from '@vue/test-utils'
import FieldElt from '../../components/FieldElt.vue'

let wrapper

enableAutoUnmount(afterEach)

/**
 * ! DEFAULT INPUT TEXT
 * @vi-environment jsdom
 */
describe('Default FieldElt', () => {
  beforeEach(() => {
    wrapper = mount(FieldElt)
  })

  test('must create an input type text', () => {
    expect(wrapper.find("input[type='text']").exists()).toBe(true)
  })

  test("must have a props 'type' with 'String as type & 'text' as default value", () => {
    expect(typeof wrapper.props('type')).toBe('string')
    expect(wrapper.props('type')).toBe('text')
  })

  test("must have a props 'min' with 'Number' as type & '2' as default value", () => {
    expect(typeof wrapper.props('min')).toBe('number')
    expect(wrapper.props('min')).toBe(2)
  })

  test("must have a props 'max' with 'Number' as type & '50' as default value", () => {
    expect(typeof wrapper.props('max')).toBe('number')
    expect(wrapper.props('max')).toBe(250)
  })

  test("must have a props 'cols' with 'Number' as type & '20' as default value", () => {
    expect(typeof wrapper.props('cols')).toBe('number')
    expect(wrapper.props('cols')).toBe(20)
  })

  test("must have a props 'rows' with 'Number' as type & '5' as default value", () => {
    expect(typeof wrapper.props('rows')).toBe('number')
    expect(wrapper.props('rows')).toBe(5)
  })

  test("must have a props 'required' with 'String' as type & 'required' as default value", () => {
    expect(typeof wrapper.props('required')).toBe('string')
    expect(wrapper.props('required')).toBe('true')
  })
})

/**
 * ! TEXTAREA
 * @vi-environment jsdom
 */
describe('FieldElt as a textarea', () => {
  beforeEach(() => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'textarea',
        min: 10,
        max: 100,
        cols: 10,
        rows: 10
      },
      slots: {
        label: 'Test Label'
      }
    })
  })

  test('must create a textarea', () => {
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  test("must have a props 'type' with 'String' as type & 'textarea' as value", () => {
    expect(typeof wrapper.props('type')).toBe('string')
    expect(wrapper.props('type')).toBe('textarea')
  })

  test("must have a props 'min' with 'Number' as type & '10' as value", () => {
    expect(typeof wrapper.props('min')).toBe('number')
    expect(wrapper.props('min')).toBe(10)
  })

  test("must have a props 'max' with 'Number' as type & '100' as value", () => {
    expect(typeof wrapper.props('max')).toBe('number')
    expect(wrapper.props('max')).toBe(100)
  })

  test("must have a props 'cols' with 'Number' as type & '10' as value", () => {
    expect(typeof wrapper.props('cols')).toBe('number')
    expect(wrapper.props('cols')).toBe(10)
  })

  test("must have a props 'rows' with 'Number' as type & '10' as value", () => {
    expect(typeof wrapper.props('rows')).toBe('number')
    expect(wrapper.props('rows')).toBe(10)
  })

  test("must have a slot 'label' with 'Test Label' as value", () => {
    expect(wrapper.find('label').text()).toBe('Test Label')
  })
})

/**
 * ! NUMBER
 * @vi-environment jsdom
 */
describe('FieldElt as a number', () => {
  beforeEach(() => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'number',
        id: 'Test Id',
        name: 'Test Name',
        min: 0,
        max: 100,
        itemprop: 'Test Itemprop'
      }
    })
  })

  test('must create an input type number', () => {
    expect(wrapper.find("input[type='number']").exists()).toBe(true)
  })

  test("must have a props & an attrs 'type' with 'String' as type & 'number' as value", () => {
    expect(typeof wrapper.props('type')).toBe('string')
    expect(wrapper.props('type')).toBe('number')
    expect(wrapper.find("input[type='number']").attributes('type')).toBe('number')
  })

  test("must have a props & an attrs 'id' with 'String' as type & 'Test Id' as value", () => {
    expect(typeof wrapper.props('id')).toBe('string')
    expect(wrapper.props('id')).toBe('Test Id')
    expect(wrapper.find("input[type='number']").attributes('id')).toBe('Test Id')
  })

  test("must have a props & an attrs 'name' with 'String' as type & 'Test Name' as value", () => {
    expect(typeof wrapper.props('name')).toBe('string')
    expect(wrapper.props('name')).toBe('Test Name')
    expect(wrapper.find("input[type='number']").attributes('name')).toBe('Test Name')
  })

  test("must have a props & an attrs 'min' with 'Number' as type & '0' as value", () => {
    expect(typeof wrapper.props('min')).toBe('number')
    expect(wrapper.props('min')).toBe(0)
    expect(wrapper.find("input[type='number']").attributes('min')).toBe('0')
  })

  test("must have a props & an attrs 'max' with 'Number' as type & '100' as value", () => {
    expect(typeof wrapper.props('max')).toBe('number')
    expect(wrapper.props('max')).toBe(100)
    expect(wrapper.find("input[type='number']").attributes('max')).toBe('100')
  })

  test("must have a props & an attrs 'itemprop' with 'String' as type & 'Test Itemprop' as value", () => {
    expect(typeof wrapper.props('itemprop')).toBe('string')
    expect(wrapper.props('itemprop')).toBe('Test Itemprop')
    expect(wrapper.find("input[type='number']").attributes('itemprop')).toBe('Test Itemprop')
  })
})

/**
 * ! SELECT
 * @vi-environment jsdom
 */
describe('FieldElt as a select', () => {
  beforeEach(() => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'select',
        id: 'Test Id',
        name: 'Test Name',
        info: 'Test Info',
        itemprop: 'Test Itemprop',
        value: 'Test Value',
        list: ['Test']
      }
    })
  })

  test('must create a select', () => {
    expect(wrapper.find('select').exists()).toBe(true)
  })

  test("must have a props 'type' with 'String' as type & 'select' as value", () => {
    expect(typeof wrapper.props('type')).toBe('string')
    expect(wrapper.props('type')).toBe('select')
  })

  test("must have a props 'id' with 'String' as type & 'Test Id' as value", () => {
    expect(typeof wrapper.props('id')).toBe('string')
    expect(wrapper.props('id')).toBe('Test Id')
  })

  test("must have a props 'name' with 'String' as type & 'Test Name' as value", () => {
    expect(typeof wrapper.props('name')).toBe('string')
    expect(wrapper.props('name')).toBe('Test Name')
  })

  test("must have a props 'info' with 'String' as type & 'Test Info' as value", () => {
    expect(typeof wrapper.props('info')).toBe('string')
    expect(wrapper.props('info')).toBe('Test Info')
  })

  test("must have a props 'itemprop' with 'String' as type & 'Test Itemprop' as value", () => {
    expect(typeof wrapper.props('itemprop')).toBe('string')
    expect(wrapper.props('itemprop')).toBe('Test Itemprop')
  })

  test("must have a props 'value' with 'String' as type & 'Test Value' as value", () => {
    expect(typeof wrapper.props('value')).toBe('string')
    expect(wrapper.props('value')).toBe('Test Value')
  })

  test("must have a props 'list' with 'Array' as type & ['Test'] as value", () => {
    expect(typeof wrapper.props('list')).toBe('object')
    expect(wrapper.props('list')).toEqual(['Test'])
  })
})

/**
 * ! SELECT WITH ARRAY OF OBJECTS
 * @vi-environment jsdom
 */
describe('FieldElt as a select with an array of objects as the list', () => {
  beforeEach(() => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'select',
        list: [
          {
            value: 'Test Value',
            content: 'Test Content'
          }
        ],
        info: 'Test Info',
        value: 'Test Value',
        content: 'Test Content'
      }
    })
  })

  test('must create a select', () => {
    expect(wrapper.find('select').exists()).toBe(true)
  })

  test("must have a props 'type' with 'String' as type & 'select' as value", () => {
    expect(typeof wrapper.props('type')).toBe('string')
    expect(wrapper.props('type')).toBe('select')
  })

  test("must have a props 'list' with 'Array' as type & '[{ value: `Test Value`, content: `Test Content` }]' as value", () => {
    expect(typeof wrapper.props('list')).toBe('object')
    expect(wrapper.props('list')).toEqual([{ value: `Test Value`, content: `Test Content` }])
  })

  test("must have a props 'info' with 'String' as type & 'Test Info' as value", () => {
    expect(typeof wrapper.props('info')).toBe('string')
    expect(wrapper.props('info')).toBe('Test Info')
  })

  test("must have a props & attrs 'value' with 'String' as type & 'Test Value' as value", () => {
    expect(typeof wrapper.props('value')).toBe('string')
    expect(wrapper.props('value')).toBe('Test Value')
    expect(wrapper.find('option').attributes('value')).toBe('Test Value')
  })

  test("must have a props & textContent 'content' with 'String' as type & 'Test Content' as value", () => {
    expect(typeof wrapper.props('content')).toBe('string')
    expect(wrapper.props('content')).toBe('Test Content')
    expect(wrapper.find('option').text()).toBe('Test Content')
  })
})

/**
 * ! CHECKBOX
 * @vi-environment jsdom
 */
describe('FieldElt as a checkbox', () => {
  beforeEach(() => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'checkbox'
      }
    })
  })

  test('must create an input type checkbox', () => {
    expect(wrapper.find("input[type='checkbox']").exists()).toBe(true)
  })

  test("must have a props 'type' with 'String' as type & 'checkbox' as value", () => {
    expect(typeof wrapper.props('type')).toBe('string')
    expect(wrapper.props('type')).toBe('checkbox')
  })
})

/**
 * ! GET FIELD TYPE
 * @vi-environment jsdom
 */
describe('getFieldType()', () => {
  test("must return 'number' if props 'type' is 'number'", () => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'number'
      }
    })
    expect(wrapper.vm.getFieldType()).toBe('number')
  })

  test("must return 'number' if props 'type' is 'date'", () => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'date'
      }
    })
    expect(wrapper.vm.getFieldType()).toBe('number')
  })

  test("must return 'number' if props 'type' is 'time'", () => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'time'
      }
    })
    expect(wrapper.vm.getFieldType()).toBe('number')
  })

  test("must return 'number' if props 'type' is 'range'", () => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'range'
      }
    })
    expect(wrapper.vm.getFieldType()).toBe('number')
  })

  test("must return 'special' if props 'type' is 'checkbox'", () => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'checkbox'
      }
    })
    expect(wrapper.vm.getFieldType()).toBe('special')
  })

  test("must return 'special' if props 'type' is 'radio'", () => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'radio'
      }
    })
    expect(wrapper.vm.getFieldType()).toBe('special')
  })

  test("must return 'special' if props 'type' is 'color'", () => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'color'
      }
    })
    expect(wrapper.vm.getFieldType()).toBe('special')
  })

  test("must return 'list' if props 'type' is 'option'", () => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'option'
      }
    })
    expect(wrapper.vm.getFieldType()).toBe('list')
  })

  test("must return 'list' if props 'type' is 'select'", () => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'select'
      }
    })
    expect(wrapper.vm.getFieldType()).toBe('list')
  })

  test("must return 'area' if props 'type' is 'textarea'", () => {
    wrapper = mount(FieldElt, {
      props: {
        type: 'textarea'
      }
    })
    expect(wrapper.vm.getFieldType()).toBe('area')
  })

  test("must return 'text' if props 'type' is not provided", () => {
    wrapper = mount(FieldElt)
    expect(wrapper.vm.getFieldType()).toBe('text')
  })
})
