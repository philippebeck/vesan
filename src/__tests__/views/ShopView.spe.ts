import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import { createStore } from 'vuex'
import * as services from '../../assets/services'
import ShopView from '../../views/ShopView.vue'

let wrapper: any
let store: any
let actions: any
let state: any

beforeEach(() => {
  vi.spyOn(services, 'setMeta').mockImplementation(() => {})

  actions = {
    listProducts: vi.fn(),
    listReviews: vi.fn()
  }

  state = {
    products: [],
    reviews: []
  }

  store = createStore({
    state() {
      return state
    },
    actions: actions
  })

  wrapper = shallowMount(ShopView, {
    props: {
      val: {
        TEST: 'test'
      },
      user: {
        name: 'test name',
        email: 'email@test.com'
      }
    },
    data() {
      return {
        priceCurrency: 'EUR',
        scores: [5, 4]
      }
    },
    global: {
      plugins: [store]
    }
  })
})

enableAutoUnmount(afterEach)

/**
 * @vi-environment jsdom
 */
describe('ShopView', () => {
  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('components', () => {
    expect(typeof wrapper.findComponent({ name: 'BtnElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'CardElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ListElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'MediaElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'NavElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ProductCreator' })).toBe('object')
  })

  test('props', () => {
    expect(wrapper.props('val')).toStrictEqual({ TEST: 'test' })
    expect(wrapper.props('user')).toStrictEqual({
      name: 'test name',
      email: 'email@test.com'
    })
  })

  // test("data", () => {
  //   expect(wrapper.vm.$data).toStrictEqual({
  //     priceCurrency: "EUR",
  //     scores: [5, 4]
  //   })
  // })

  test('methods', () => {
    expect(typeof wrapper.vm.listProducts).toBe('function')
    expect(typeof wrapper.vm.listReviews).toBe('function')
    expect(typeof wrapper.vm.checkSession).toBe('function')
    expect(typeof wrapper.vm.getItemsByCategory).toBe('function')
    expect(typeof wrapper.vm.getScoresAverage).toBe('function')
  })
})
