import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import * as services from '../../assets/services'
import BasketView from '../../views/BasketView.vue'

global.fetch = vi.fn(() =>
  Promise.resolve({
    formData: () => Promise.resolve({}),
    ok: true,
    headers: {
      get: (header) => {
        if (header === 'Content-Type') {
          return 'multipart/form-data'
        }
      }
    }
  })
)

let wrapper: any

beforeEach(() => {
  vi.spyOn(services, 'setMeta').mockImplementation(() => {})

  wrapper = shallowMount(BasketView, {
    props: {
      val: {
        TEST: 'test'
      },
      user: {
        name: 'test',
        email: 'email@test.com'
      }
    },
    data(): any {
      return {
        basket: [
          {
            id: 1,
            name: 'test',
            price: 10,
            quantity: 1,
            total: 10
          }
        ],
        order: [
          {
            id: 1,
            name: 'test',
            price: 10,
            quantity: 1,
            total: 10
          }
        ],
        total: 10
      }
    }
  })
})

enableAutoUnmount(afterEach)

/**
 * @vi-environment jsdom
 */
describe('BasketView', () => {
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
    expect(wrapper.props('user')).toStrictEqual({ name: 'test', email: 'email@test.com' })
  })

  test('data', () => {
    expect(wrapper.vm.basket).toStrictEqual([
      {
        id: 1,
        name: 'test',
        price: 10,
        quantity: 1,
        total: 10
      }
    ])
    expect(wrapper.vm.order).toStrictEqual([
      {
        id: 1,
        name: 'test',
        price: 10,
        quantity: 1,
        total: 10
      }
    ])
    expect(wrapper.vm.total).toBe(10)
  })

  test('methods', () => {
    expect(typeof wrapper.vm.checkSession).toBe('function')
    expect(typeof wrapper.vm.getTotal).toBe('function')
    expect(typeof wrapper.vm.setBasket).toBe('function')
    expect(typeof wrapper.vm.setOrder).toBe('function')
    expect(typeof wrapper.vm.setPaypal).toBe('function')
    expect(typeof wrapper.vm.setTotal).toBe('function')
    expect(typeof wrapper.vm.createOrder).toBe('function')
    expect(typeof wrapper.vm.updateProductQuantity).toBe('function')
    expect(typeof wrapper.vm.deleteProduct).toBe('function')
    expect(typeof wrapper.vm.deleteBasket).toBe('function')
  })
})
