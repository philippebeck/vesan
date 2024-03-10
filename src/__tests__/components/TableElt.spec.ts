import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import TableElt from '../../components/TableElt.vue'

let wrapper: any

enableAutoUnmount(afterEach)

/**
 * ! DEFAULT TABLE
 * @vi-environment jsdom
 */
describe('Default TableElt', () => {
  beforeEach(() => {
    wrapper = mount(TableElt, {
      props: {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' }
        ]
      }
    })
  })

  test('must create a table element', () => {
    expect(wrapper.find('table').exists()).toBe(true)
  })

  test("must have a props 'items' with 'Array' as type & 3 as length", () => {
    expect(Array.isArray(wrapper.props('items'))).toBe(true)
    expect(wrapper.props('items').length).toBe(3)
  })

  test("must have a props 'items' with 'Item 1' as name of first item", () => {
    expect(wrapper.props('items')[0].name).toBe('Item 1')
  })

  test("must have a props 'items' with 'Item 2' as name of second item", () => {
    expect(wrapper.props('items')[1].name).toBe('Item 2')
  })

  test("must have a props 'items' with 'Item 3' as name of third item", () => {
    expect(wrapper.props('items')[2].name).toBe('Item 3')
  })
})

/**
 * ! TABLE WITH SLOTS
 * @vi-environment jsdom
 */
describe('TableElt with slots', () => {
  beforeEach(() => {
    wrapper = mount(TableElt, {
      props: {
        title: 'Test Title',
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' }
        ]
      },
      slots: {
        title: 'Test Title',
        head: 'Test Head',
        body: 'Test Body',
        foot: 'Test Foot'
      }
    })
  })

  test('must create a table element', () => {
    expect(wrapper.find('table').exists()).toBe(true)
  })

  test("must have a props 'title' with 'String' as type & 'Table Title' as value", () => {
    expect(typeof wrapper.props('title')).toBe('string')
    expect(wrapper.props('title')).toBe('Test Title')
  })

  test("must have a props 'items' with 'Array' as type & 3 as length", () => {
    expect(Array.isArray(wrapper.props('items'))).toBe(true)
    expect(wrapper.props('items').length).toBe(3)
  })

  test("must have a props 'items' with 'Item 1' as name of first item", () => {
    expect(wrapper.props('items')[0].name).toBe('Item 1')
  })

  test("must have a props 'items' with 'Item 2' as name of second item", () => {
    expect(wrapper.props('items')[1].name).toBe('Item 2')
  })

  test("must have a props 'items' with 'Item 3' as name of third item", () => {
    expect(wrapper.props('items')[2].name).toBe('Item 3')
  })

  test("must have a slot 'title' with 'Test Title' as content", () => {
    expect(wrapper.find('caption').text()).toBe('Test Title')
  })

  test("must have a slot 'head' with 'Test Head' as content", () => {
    expect(wrapper.find('thead').text()).toContain('Test Head')
  })

  test("must have a slot 'body' with 'Test Body' as content", () => {
    expect(wrapper.find('tbody').text()).toContain('Test Body')
  })

  test("must have a slot 'foot' with 'Test Foot' as content", () => {
    expect(wrapper.find('tfoot').text()).toBe('Test Foot')
  })
})
