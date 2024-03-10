import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import FootElt from '../../components/FootElt.vue'

let wrapper: any

enableAutoUnmount(afterEach)

/**
 * ! DEFAULT FOOTER
 * @vi-environment jsdom
 */
describe('Default FootElt', () => {
  beforeEach(() => {
    wrapper = mount(FootElt)
  })

  test('must create a footer', () => {
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  test("must have a props 'title1' with 'String' as type & '' as default value", () => {
    expect(typeof wrapper.props('title1')).toBe('string')
    expect(wrapper.props('title1')).toBe('')
  })

  test("must have a props 'title2' with 'String' as type & '' as default value", () => {
    expect(typeof wrapper.props('title2')).toBe('string')
    expect(wrapper.props('title2')).toBe('')
  })

  test("must have a props 'title3' with 'String' as type & '' as default value", () => {
    expect(typeof wrapper.props('title3')).toBe('string')
    expect(wrapper.props('title3')).toBe('')
  })

  test('must not have a list', () => {
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  test('must not have any list item', () => {
    expect(wrapper.find('li').exists()).toBe(false)
  })

  test('must not have an aside', () => {
    expect(wrapper.find('aside').exists()).toBe(false)
  })

  test('must return false if no slot exists', () => {
    expect(wrapper.vm.hasSlot('foot1')).toBe(false)
    expect(wrapper.vm.hasSlot('foot2')).toBe(false)
    expect(wrapper.vm.hasSlot('foot3')).toBe(false)
    expect(wrapper.vm.hasSlot('foot')).toBe(false)
  })

  test("must return false if the test slot doesn't exist", () => {
    expect(wrapper.vm.hasSlot('test')).toBe(false)
  })
})

/**
 * ! FOOTER WITH SLOTS
 * @vi-environment jsdom
 */
describe('FootElt with slots', () => {
  beforeEach(() => {
    wrapper = mount(FootElt, {
      props: {
        title1: 'Test Title 1',
        title2: 'Test Title 2',
        title3: 'Test Title 3'
      },
      slots: {
        foot1: '<p>Test List 1</p>',
        foot2: '<p>Test List 2</p>',
        foot3: '<p>Test List 3</p>',
        foot: '<p>Test Aside</p>'
      }
    })
  })

  test('must create a footer', () => {
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  test("must have a props 'title1' with 'Test Title 1' as value", () => {
    expect(wrapper.props('title1')).toBe('Test Title 1')
  })

  test("must have a props 'title2' with 'Test Title 2' as value", () => {
    expect(wrapper.props('title2')).toBe('Test Title 2')
  })

  test("must have a props 'title3' with 'Test Title 3' as value", () => {
    expect(wrapper.props('title3')).toBe('Test Title 3')
  })

  test('must have a list', () => {
    expect(wrapper.find('ul').exists()).toBe(true)
  })

  test('must have 3 list items', () => {
    expect(wrapper.find('li').exists()).toBe(true)
    expect(wrapper.findAll('li').length).toBe(3)
  })

  test("must have an aside with 'Test Aside' as content", () => {
    expect(wrapper.find('aside').exists()).toBe(true)
    expect(wrapper.find('aside').text()).toBe('Test Aside')
  })

  test('must return true if all slots exist', () => {
    expect(wrapper.vm.hasSlot('foot1')).toBe(true)
    expect(wrapper.vm.hasSlot('foot2')).toBe(true)
    expect(wrapper.vm.hasSlot('foot3')).toBe(true)
    expect(wrapper.vm.hasSlot('foot')).toBe(true)
  })

  test("must return false if the test slot doesn't exist", () => {
    expect(wrapper.vm.hasSlot('test')).toBe(false)
  })
})
