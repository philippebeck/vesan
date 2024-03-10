import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import * as services from '../../assets/services'
import ContactView from '../../views/ContactView.vue'

let wrapper: any

/**
 * @vi-environment jsdom
 */
beforeEach(() => {
  vi.spyOn(services, 'setMeta').mockImplementation(() => {})

  wrapper = shallowMount(ContactView, {
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
        email: 'email@test.com',
        subject: 'Test Subject',
        text: 'Test Text'
      }
    }
  })
})

enableAutoUnmount(afterEach)

/**
 * @vi-environment jsdom
 */
describe('ContactView', () => {
  test('wrapper must be a vue instance', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => {
    expect(typeof wrapper.findComponent({ name: 'BtnElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'CardElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'FieldElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'ListElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'VueRecaptcha' })).toBe('object')
  })

  test('wrapper props', () => {
    expect(wrapper.props('val')).toStrictEqual({ TEST: 'test' })
  })

  test('wrapper data', () => {
    expect(wrapper.vm.$data).toStrictEqual({
      email: 'email@test.com',
      subject: 'Test Subject',
      text: 'Test Text'
    })
  })

  test('wrapper created hook', () => {
    expect(services.setMeta).toHaveBeenCalled()
  })

  test('wrapper methods', () => {
    expect(typeof wrapper.vm.onVerify).toBe('function')
    expect(typeof wrapper.vm.send).toBe('function')
  })
})
