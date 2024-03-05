import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'

import * as services from '../assets/services'
import values from '../assets/values'
import App from '../App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: App
    }
  ]
})

let wrapper
let store
let actions
let state

/**
 * @vi-environment jsdom
 */
beforeEach(() => {
  vi.spyOn(services, 'setGlobalMeta').mockImplementation(() => {})

  actions = {
    readAvatar: vi.fn()
  }

  state = {
    user: {}
  }

  store = createStore({
    state() {
      return state
    },
    actions: actions
  })

  wrapper = shallowMount(App, {
    data() {
      return {
        values: values
      }
    },
    global: {
      plugins: [store, router]
    }
  })
})

enableAutoUnmount(afterEach)

/**
 * @vi-environment jsdom
 */
describe('App', () => {
  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('components', () => {
    expect(typeof wrapper.findComponent({ name: 'FootElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ListElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'NavElt' })).toBe('object')
  })

  test('data', () => {
    expect(wrapper.vm.values).toStrictEqual(values)
  })

  test('methods', () => {
    expect(typeof wrapper.vm.readAvatar).toBe('function')
    expect(typeof wrapper.vm.checkSession).toBe('function')
  })
})
