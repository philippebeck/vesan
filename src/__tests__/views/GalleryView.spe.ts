import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import { createStore } from 'vuex'
import * as services from '../../assets/services'
import GalleryView from '../../views/GalleryView.vue'

let wrapper: any
let store: any
let actions: any
let state: any

/**
 * @vi-environment jsdom
 */
beforeEach(() => {
  vi.spyOn(services, 'setMeta').mockImplementation(() => {})

  actions = {
    listGalleries: vi.fn()
  }

  state = {
    galleries: []
  }

  store = createStore({
    state() {
      return state
    },
    actions: actions
  })

  wrapper = shallowMount(GalleryView, {
    props: {
      val: {
        TEST: 'test'
      },
      user: {
        name: 'test',
        email: 'email@test.com'
      }
    },
    global: {
      plugins: [store]
    }
  })
})

enableAutoUnmount(afterEach)

describe('GalleryView', () => {
  test('wrapper must be a vue instance', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => {
    expect(typeof wrapper.findComponent({ name: 'CardElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ListElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'MediaElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'GalleryCreator' })).toBe('object')
  })

  test('wrapper props', () => {
    expect(wrapper.props('val')).toStrictEqual({ TEST: 'test' })
    expect(wrapper.props('user')).toStrictEqual({ name: 'test', email: 'email@test.com' })
  })

  test('wrapper created hook', () => {
    expect(services.setMeta).toHaveBeenCalled()
    expect(actions.listGalleries).toHaveBeenCalled()
  })

  test('wrapper methods', () => {
    expect(typeof wrapper.vm.listGalleries).toBe('function')
    expect(typeof wrapper.vm.checkSession).toBe('function')
  })
})
