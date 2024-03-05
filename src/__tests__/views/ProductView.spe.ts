import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import { createStore } from 'vuex'
import * as services from '../../assets/services'
import ProductView from '../../views/ProductView.vue'

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

const mockRoute = {
  params: {
    id: 1
  }
}

const mockRouter = {
  push: vi.fn()
}

let wrapper
let store
let actions
let state

/**
 * @vi-environment jsdom
 */
beforeEach(() => {
  vi.spyOn(services, 'setMeta').mockImplementation(() => {})

  actions = {
    listProductReviews: vi.fn(),
    readProduct: vi.fn()
  }

  state = {
    product: {},
    reviews: []
  }

  store = createStore({
    state() {
      return state
    },
    actions: actions
  })

  mockRouter.push(mockRoute)

  wrapper = shallowMount(ProductView, {
    props: {
      val: {
        TEST: 'test'
      },
      user: {
        name: 'test',
        email: 'email@test.com'
      }
    },
    data() {
      return {
        product: {
          name: 'test',
          description: 'test',
          price: 10
        },
        basket: [],
        order: {
          id: 1,
          name: 'test',
          description: 'test',
          price: 10,
          currency: 'EUR',
          image: 'test',
          gallery: 'test',
          reviews: []
        },
        option: '',
        priceCurrency: '',
        quantity: 1,
        isInBasket: false
      }
    },
    global: {
      plugins: [store],
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      }
    }
  })
})

enableAutoUnmount(afterEach)

/**
 * @vi-environment jsdom
 */
describe('ProductView', () => {
  test('wrapper must be a vue instance', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => {
    expect(typeof wrapper.findComponent({ name: 'BtnElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'CardElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'FieldElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'MediaElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ReviewCreator' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ReviewList' })).toBe('object')
  })

  test('wrapper props', () => {
    expect(wrapper.props().val).toStrictEqual({ TEST: 'test' })
    expect(wrapper.props().user).toStrictEqual({ name: 'test', email: 'email@test.com' })
  })

  test('wrapper data', () => {
    expect(wrapper.vm.basket).toStrictEqual([])
    expect(wrapper.vm.order).toStrictEqual({
      id: 1,
      name: 'test',
      description: 'test',
      price: 10,
      currency: 'EUR',
      image: 'test',
      gallery: 'test',
      reviews: []
    })
    expect(wrapper.vm.option).toBe('')
    expect(wrapper.vm.quantity).toBe(1)
    expect(wrapper.vm.isInBasket).toBe(false)
  })

  test('wrapper methods', () => {
    expect(typeof wrapper.vm.checkSession).toBe('function')
    expect(typeof wrapper.vm.getScoresAverage).toBe('function')
    expect(typeof wrapper.vm.addToBasket).toBe('function')
    expect(typeof wrapper.vm.createOrder).toBe('function')
    expect(typeof wrapper.vm.getBasket).toBe('function')
    expect(typeof wrapper.vm.checkBasket).toBe('function')
    expect(typeof wrapper.vm.setBasket).toBe('function')
  })
})
