import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import { createStore } from 'vuex'
import * as services from '../../assets/services'
import ProfileView from '../../views/ProfileView.vue'

let wrapper: any
let store: any
let actions: any
let state: any

beforeEach(() => {
  vi.spyOn(services, 'setMeta').mockImplementation(() => {})

  global.alert = vi.fn()
  const push = vi.fn()
  const $router = {
    push: push
  }

  actions = {
    readUser: vi.fn(),
    listUserOrders: vi.fn()
  }

  state = {
    user: {},
    orders: []
  }

  store = createStore({
    state() {
      return state
    },
    actions: actions
  })

  wrapper = shallowMount(ProfileView, {
    props: {
      val: {
        TEST: 'test'
      }
    },
    data() {
      return {
        image: 'test image',
        pass: 'test pass'
      }
    },
    global: {
      plugins: [store],
      mocks: {
        $router
      }
    }
  })
})

enableAutoUnmount(afterEach)

/**
 * @vi-environment jsdom
 */
describe('ProfileView', () => {
  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('components', () => {
    expect(typeof wrapper.findComponent({ name: 'BtnElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'CardElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'FieldElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ListElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'MediaElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'TableElt' })).toBe('object')
  })

  test('props', () => {
    expect(wrapper.props().val).toStrictEqual({ TEST: 'test' })
  })

  test('data', () => {
    expect(wrapper.vm.image).toBe('test image')
    expect(wrapper.vm.pass).toBe('test pass')
  })

  test('methods', () => {
    expect(typeof wrapper.vm.readUser).toBe('function')
    expect(typeof wrapper.vm.listUsers).toBe('function')
    expect(typeof wrapper.vm.checkSession).toBe('function')
    expect(typeof wrapper.vm.logout).toBe('function')
    expect(typeof wrapper.vm.updateUser).toBe('function')
    expect(typeof wrapper.vm.deleteUser).toBe('function')
  })
})
