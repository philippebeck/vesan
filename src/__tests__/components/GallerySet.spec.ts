import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, enableAutoUnmount } from '@vue/test-utils'
import GallerySet from '../../components/GallerySet.vue'

let wrapper

vi.mock('axios')

beforeEach(() => {
  wrapper = shallowMount(GallerySet, {
    props: {
      val: {
        TEST: 'test'
      },
      galleries: [
        {
          name: 'Gallery name',
          author: 'Gallery author'
        }
      ]
    }
  })
})

enableAutoUnmount(afterEach)

/**
 * @vi-environment jsdom
 */
describe('GallerySet', () => {
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
    expect(wrapper.props('val')).toStrictEqual({ TEST: 'test' })
    expect(wrapper.props('galleries')).toStrictEqual([
      {
        name: 'Gallery name',
        author: 'Gallery author'
      }
    ])
  })

  test('methods', () => {
    expect(typeof wrapper.vm.createGallery).toBe('function')
    expect(typeof wrapper.vm.updateGallery).toBe('function')
    expect(typeof wrapper.vm.deleteGallery).toBe('function')
  })
})
