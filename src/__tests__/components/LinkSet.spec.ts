import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import * as services from '../../assets/services'
import LinkSet from '../../components/LinkSet.vue'

let wrapper: any

vi.mock('axios')

beforeEach(() => {
  vi.spyOn(services, 'deleteData').mockImplementation(() => {})
  vi.spyOn(services, 'putData').mockImplementation(() => {})
  vi.spyOn(services, 'checkRange').mockImplementation(() => {})
  vi.spyOn(services, 'checkRegex').mockImplementation(() => {})
  vi.spyOn(services, 'getItemName').mockImplementation(() => {})
  vi.spyOn(services, 'getItemsByCat').mockImplementation(() => {})
  vi.spyOn(services, 'setError').mockImplementation(() => {})

  wrapper = shallowMount(LinkSet, {
    props: {
      val: {
        CHECK_STRING: 'Check String',
        REGEX_URL: /your-regex-pattern/,
        CHECK_URL: 'Check URL',
        ALERT_UPDATED: ' updated'
      },
      links: [
        {
          name: 'Link Name 1',
          url: 'Link Url 1',
          cat: 'Link Cat 1'
        },
        {
          name: 'Link Name 2',
          url: 'Link Url 2',
          cat: 'Link Cat 2'
        }
      ]
    }
  })
})

enableAutoUnmount(afterEach)

/**
 * @vi-environment jsdom
 */
describe('LinkSet', () => {
  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('components', () => {
    expect(typeof wrapper.findComponent({ name: 'BtnElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'CardElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'FieldElt' })).toBe('object')
    expect(typeof wrapper.findComponent({ name: 'TableElt' })).toBe('object')
  })

  test('props', () => {
    expect(wrapper.props('val')).toStrictEqual({
      CHECK_STRING: 'Check String',
      REGEX_URL: /your-regex-pattern/,
      CHECK_URL: 'Check URL',
      ALERT_UPDATED: ' updated'
    })
    expect(wrapper.props('links')).toStrictEqual([
      {
        name: 'Link Name 1',
        url: 'Link Url 1',
        cat: 'Link Cat 1'
      },
      {
        name: 'Link Name 2',
        url: 'Link Url 2',
        cat: 'Link Cat 2'
      }
    ])
  })

  test('methods', () => {
    expect(typeof wrapper.vm.getItemsByCategory).toBe('function')
    expect(typeof wrapper.vm.createLink).toBe('function')
    expect(typeof wrapper.vm.updateLink).toBe('function')
    expect(typeof wrapper.vm.deleteLink).toBe('function')
  })

  test('getItemsByCategory()', () => {
    wrapper.vm.getItemsByCategory([
      {
        name: 'Link Name 1',
        url: 'Link Url 1',
        cat: 'Link Cat 1'
      },
      {
        name: 'Link Name 2',
        url: 'Link Url 2',
        cat: 'Link Cat 2'
      }
    ])
    expect(services.getItemsByCat).toHaveBeenCalledTimes(1)
    expect(services.getItemsByCat).toHaveReturned()
  })
})
