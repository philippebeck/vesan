import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import * as services from '../../assets/services'
import HomeView from '../../views/HomeView.vue'

let wrapper: any

/**
 * @vi-environment jsdom
 */
beforeEach(() => {
  vi.spyOn(services, 'setMeta').mockImplementation(() => {})

  wrapper = shallowMount(HomeView, {
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
        media: { title: 'Test Title', url: 'https://test.com' }
      }
    }
  })
})

enableAutoUnmount(afterEach)

describe('HomeView', () => {
  test('wrapper must be a vue instance', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => {
    expect(typeof wrapper.findComponent({ name: 'CardElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ListElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'MediaElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'SliderElt' })).toBe('object')
  })

  test('wrapper props', () => {
    expect(wrapper.props('val')).toStrictEqual({ TEST: 'test' })
  })

  test('wrapper data', () => {
    expect(wrapper.vm.$data).toStrictEqual({
      media: { title: 'Test Title', url: 'https://test.com' }
    })
  })

  test('wrapper created hook', () => {
    expect(services.setMeta).toHaveBeenCalled()
  })
})
