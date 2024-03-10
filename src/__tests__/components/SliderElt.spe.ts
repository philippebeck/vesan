import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { mount, enableAutoUnmount } from '@vue/test-utils'
import SliderElt from '../../components/SliderElt.vue'

let wrapper: any

beforeEach(() => {
  wrapper = mount(SliderElt, {
    props: {
      slides: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ]
    },
    slots: {
      slide: 'Test Slide',
      info: 'Test Info',
      gallery: 'Test Gallery'
    }
  })

  wrapper.vm.refreshSlide = vi.fn()
  wrapper.vm.setAuto = vi.fn()
  wrapper.vm.setRandom = vi.fn()
})

enableAutoUnmount(afterEach)

/**
 * ! DOM ELEMENTS
 * @vi-environment jsdom
 */
describe('DOM elements', () => {
  test('must create a figure element', () => {
    expect(wrapper.find('figure').exists()).toBe(true)
  })
})

/**
 * ! PROPS
 * @vi-environment jsdom
 */
describe('Props', () => {
  test("must have a props 'slides' with 'Array' as type & 3 as length", () => {
    expect(Array.isArray(wrapper.props('slides'))).toBe(true)
    expect(wrapper.props('slides').length).toBe(3)
  })

  test("must have a props 'slides' with '1' as id of first item", () => {
    expect(wrapper.props('slides')[0].id).toBe(1)
  })

  test("must have a props 'slides' with 'Item 1' as name of first item", () => {
    expect(wrapper.props('slides')[0].name).toBe('Item 1')
  })

  test("must have a props 'slides' with '2' as id of second item", () => {
    expect(wrapper.props('slides')[1].id).toBe(2)
  })

  test("must have a props 'slides' with 'Item 2' as name of second item", () => {
    expect(wrapper.props('slides')[1].name).toBe('Item 2')
  })

  test("must have a props 'slides' with '3' as id of third item", () => {
    expect(wrapper.props('slides')[2].id).toBe(3)
  })

  test("must have a props 'slides' with 'Item 3' as name of third item", () => {
    expect(wrapper.props('slides')[2].name).toBe('Item 3')
  })

  test("must have a props delay with 'Number' as type & 5000 as default value", () => {
    expect(typeof wrapper.props('delay')).toBe('number')
    expect(wrapper.props('delay')).toBe(5000)
  })

  test("must have a props 'auto' with 'Boolean' as type & 'true' as default value", () => {
    expect(typeof wrapper.props('auto')).toBe('boolean')
    expect(wrapper.props('auto')).toBe(true)
  })

  test("must have a props 'random' with 'Boolean' as type & 'false' as default value", () => {
    expect(typeof wrapper.props('random')).toBe('boolean')
    expect(wrapper.props('random')).toBe(false)
  })
})

/**
 * ! DATA
 * @vi-environment jsdom
 */
describe('Data', () => {
  test("must have a data 'index' with 'Number' as type & -1 as default value", () => {
    expect(typeof wrapper.vm.index).toBe('number')
    expect(wrapper.vm.index).toBe(-1)
  })

  test("must have a data 'intervalId' with 'Number' as type", () => {
    expect(typeof wrapper.vm.intervalId).toBe('number')
  })

  test("must have a data 'autoElt' with null as default value", () => {
    expect(wrapper.vm.autoElt).toBe(null)
  })

  test("must have a data 'randomElt' with null as default value", () => {
    expect(wrapper.vm.randomElt).toBe(null)
  })
})

/**
 * ! BEFORE CREATE HOOK
 * @vi-environment jsdom
 */
describe('beforeCreate() Hook', () => {
  test('must have a beforeCreate() hook', () => {
    expect(wrapper.vm.$options.beforeCreate).toBeDefined()
  })
})

/**
 * ! CREATED HOOK
 * @vi-environment jsdom
 */
describe('mounted() Hook', () => {
  test('must have a mounted() hook', () => {
    expect(wrapper.vm.$options.mounted).toBeDefined()
  })
})

/**
 * ! SET ICON METHOD
 * @vi-environment jsdom
 */
describe('setIcon() method', () => {
  test('must have a setIcon() method with 3 parameters', () => {
    expect(wrapper.vm.setIcon).toBeDefined()
    expect(wrapper.vm.setIcon.length).toBe(3)
  })
})

/**
 * ! SET AUTO METHOD
 * @vi-environment jsdom
 */
describe('setAuto() method', () => {
  test('must have a setAuto()method with 0 parameters', () => {
    expect(wrapper.vm.setAuto).toBeDefined()
    expect(wrapper.vm.setAuto.length).toBe(0)
  })
})

/**
 * ! SET RANDOM METHOD
 * @vi-environment jsdom
 */
describe('setRandom() method', () => {
  test('must have a setRandom() method with 0 parameters', () => {
    expect(wrapper.vm.setRandom).toBeDefined()
    expect(wrapper.vm.setRandom.length).toBe(0)
  })
})

/**
 * ! SET KEYBOARD METHOD
 * @vi-environment jsdom
 */
describe('setKeyboard() method', () => {
  test("must call checkRandom() method when keydown 'ArrowUp' is pressed", () => {
    wrapper.vm.checkRandom = vi.fn()
    wrapper.vm.setKeyboard({ code: 'ArrowUp' })
    expect(wrapper.vm.checkRandom).toHaveBeenCalled()
  })

  test("must call goNext() method when keydown 'ArrowRight' is pressed", () => {
    wrapper.vm.goNext = vi.fn()
    wrapper.vm.setKeyboard({ code: 'ArrowRight' })
    expect(wrapper.vm.goNext).toHaveBeenCalled()
  })

  test("must call checkAuto() method when keydown 'ArrowDown' is pressed", () => {
    wrapper.vm.checkAuto = vi.fn()
    wrapper.vm.setKeyboard({ code: 'ArrowDown' })
    expect(wrapper.vm.checkAuto).toHaveBeenCalled()
  })

  test("must call goPrevious() method when keydown 'ArrowLeft' is pressed", () => {
    wrapper.vm.goPrevious = vi.fn()
    wrapper.vm.setKeyboard({ code: 'ArrowLeft' })
    expect(wrapper.vm.goPrevious).toHaveBeenCalled()
  })
})

/**
 * ! GET RANDOM INTEGER METHOD
 * @vi-environment jsdom
 */
describe('getRandomInteger() method', () => {
  test('should generate a random integer when min and max are both 0', () => {
    const min = 0
    const max = 0

    const result = wrapper.vm.getRandomInteger(min, max)

    expect(result).toBe(0)
  })

  test('should generate a random integer when min and max are both positive integers', () => {
    const min = 1
    const max = 10

    const result = wrapper.vm.getRandomInteger(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })

  test('should generate a random integer when min is negative and max is positive', () => {
    const min = -10
    const max = 10

    const result = wrapper.vm.getRandomInteger(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })

  test('should generate a random integer when min and max are both negative integers', () => {
    const min = -10
    const max = -1

    const result = wrapper.vm.getRandomInteger(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })
})

/**
 * ! HAS SLOT METHOD
 * @vi-environment jsdom
 */
describe('hasSlot(name) method', () => {
  test('must return true if the 3 slots exist', () => {
    expect(wrapper.vm.hasSlot('slide')).toBe(true)
    expect(wrapper.vm.hasSlot('info')).toBe(true)
    expect(wrapper.vm.hasSlot('gallery')).toBe(true)
  })

  test("must return false if the test slot doesn't exist", () => {
    expect(wrapper.vm.hasSlot('test')).toBe(false)
  })
})

/**
 * ! CHECK RANDOM METHOD
 * @vi-environment jsdom
 */
describe('checkRandom() method', () => {
  test("must call setRandom(false, 'Random', 'fa-random', 'fa-long-arrow-alt-right') method if randomState is true", () => {
    wrapper.vm.randomState = true
    wrapper.vm.checkRandom()
    expect(wrapper.vm.setRandom).toHaveBeenCalledWith(false, 'Random', 'fa-random', 'fa-long-arrow-alt-right')
  })

  test("must call setRandom(true, 'Normal', 'fa-long-arrow-alt-right', 'fa-random') method if randomState is false", () => {
    wrapper.vm.randomState = false
    wrapper.vm.checkRandom()
    expect(wrapper.vm.setRandom).toHaveBeenCalledWith(true, 'Normal', 'fa-long-arrow-alt-right', 'fa-random')
  })

  test('must call refreshSlide() method', () => {
    wrapper.vm.refreshSlide = vi.fn()
    wrapper.vm.checkRandom()
    expect(wrapper.vm.refreshSlide).toHaveBeenCalled()
  })
})

/**
 * ! CHECK AUTO METHOD
 * @vi-environment jsdom
 */
describe('checkAuto() method', () => {
  test("must call setAuto(false, 'Auto', 'fa-play', 'fa-pause') method if autoState is true", () => {
    wrapper.vm.autoState = true
    wrapper.vm.checkAuto()
    expect(wrapper.vm.setAuto).toHaveBeenCalledWith(false, 'Play', 'fa-play', 'fa-pause')
  })

  test("must call setAuto(true, 'Manual', 'fa-pause', 'fa-play') method if autoState is false", () => {
    wrapper.vm.autoState = false
    wrapper.vm.checkAuto()
    expect(wrapper.vm.setAuto).toHaveBeenCalledWith(true, 'Pause', 'fa-pause', 'fa-play')
  })

  test('must call refreshSlide() method', () => {
    wrapper.vm.refreshSlide = vi.fn()
    wrapper.vm.checkAuto()
    expect(wrapper.vm.refreshSlide).toHaveBeenCalled()
  })
})

/**
 * ! RUN SLIDER METHOD
 * @vi-environment jsdom
 */
describe('runSlider() method', () => {
  test('must define intervalId with setInterval() if autoState is true', () => {
    wrapper.vm.autoState = true
    wrapper.vm.runSlider()
    expect(wrapper.vm.intervalId).not.toBe(null)
  })

  test('must call goNext() method if autoState is false', () => {
    wrapper.vm.autoState = false
    wrapper.vm.goNext = vi.fn()
    wrapper.vm.runSlider()
    expect(wrapper.vm.goNext).toHaveBeenCalled()
  })
})

/**
 * ! GO NEXT METHOD
 * @vi-environment jsdom
 */
describe('goNext() method', () => {
  test('must increment index when randomState is false', () => {
    wrapper.vm.randomState = false
    wrapper.vm.index = 0
    wrapper.vm.goNext()
    expect(wrapper.vm.index).toBe(1)
  })

  test('must initialize index to 0 if index is equal to slides.length', () => {
    wrapper.vm.index = 2
    wrapper.vm.goNext()
    expect(wrapper.vm.index).toBe(0)
  })

  test('must call refreshSlide() method', () => {
    wrapper.vm.refreshSlide = vi.fn()
    wrapper.vm.goNext()
    expect(wrapper.vm.refreshSlide).toHaveBeenCalled()
  })
})

/**
 * ! GO PREVIOUS METHOD
 * @vi-environment jsdom
 */
describe('goPrevious() method', () => {
  test('must decrement index when randomState is false', () => {
    wrapper.vm.randomState = false
    wrapper.vm.index = 1
    wrapper.vm.goPrevious()
    expect(wrapper.vm.index).toBe(0)
  })

  test('must initialize index to slides.length - 1 if index is equal to 0', () => {
    wrapper.vm.index = 0
    wrapper.vm.goPrevious()
    expect(wrapper.vm.index).toBe(2)
  })

  test('must call refreshSlide() method', () => {
    wrapper.vm.refreshSlide = vi.fn()
    wrapper.vm.goPrevious()
    expect(wrapper.vm.refreshSlide).toHaveBeenCalled()
  })
})
