import { shallowMount } from "@vue/test-utils"
import ImageManager from "@/components/managers/ImageManager"

describe("ImageManager", () => {

  test("has props", () => {
    expect(typeof ImageManager.props).toBe("object")
  })
})

describe('Mounted ImageManager', () => {
  const wrapper = shallowMount(ImageManager);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
