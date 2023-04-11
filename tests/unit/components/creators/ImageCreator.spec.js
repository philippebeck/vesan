import { shallowMount } from "@vue/test-utils"
import ImageCreator from "@/components/creators/ImageCreator"

describe("ImageCreator", () => {

  test("has data", () => {
    expect(typeof ImageCreator.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof ImageCreator.props).toBe("object")
  })
})

describe('Mounted ImageCreator', () => {
  const wrapper = shallowMount(ImageCreator);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
