import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import { createStore } from 'vuex'
import * as services from '../../assets/services'
import BlogView from '../../views/BlogView.vue'

let wrapper: any
let store: any
let actions: any
let state: any

beforeEach(() => {
  vi.spyOn(services, 'setMeta').mockImplementation(() => {})

  actions = {
    listArticles: vi.fn()
  }

  state = {
    articles: []
  }

  store = createStore({
    state() {
      return state
    },
    actions: actions
  })

  wrapper = shallowMount(BlogView, {
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

/**
 * @vi-environment jsdom
 */
describe('BlogView', () => {
  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('components', () => {
    expect(typeof wrapper.findComponent({ name: 'BtnElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'CardElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ListElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'MediaElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'NavElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ArticleCreator' })).toBe('object')
  })

  test('props', () => {
    expect(wrapper.props('val')).toStrictEqual({ TEST: 'test' })
    expect(wrapper.props('user')).toStrictEqual({ name: 'test', email: 'email@test.com' })
  })

  test('methods', () => {
    expect(typeof wrapper.vm.listArticles).toBe('function')
    expect(typeof wrapper.vm.checkSession).toBe('function')
    expect(typeof wrapper.vm.getItemsByCategory).toBe('function')
    expect(typeof wrapper.vm.checkLikes).toBe('function')
    expect(typeof wrapper.vm.addLike).toBe('function')
  })
})
