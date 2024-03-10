import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import ProductSet from '../../components/ProductSet.vue'

let wrapper: any

vi.mock('axios')

beforeEach(() => {
  wrapper = shallowMount(ProductSet, {
    props: {
      val: {
        TEST: 'test'
      },
      products: [
        {
          name: 'Product name',
          description: 'Product description',
          image: 'Product image',
          alt: 'Product alt',
          price: 'Product price',
          options: 'Product options',
          cat: 'Product cat'
        }
      ]
    }
  })
})

enableAutoUnmount(afterEach)

/**
 * @vi-environment jsdom
 */
describe('ProductSet', () => {
  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('components', () => {
    expect(typeof wrapper.findComponent({ name: 'BtnElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'CardElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'FieldElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'MediaElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'TableElt' })).toBe('object')
  })

  test('props', () => {
    expect(wrapper.props('val')).toStrictEqual({ TEST: 'test' })
  })

  test('methods', () => {
    expect(typeof wrapper.vm.createProduct).toBe('function')
  })
})
