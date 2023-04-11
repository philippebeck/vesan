import { shallowMount } from "@vue/test-utils"
import GalleryCreator from "@/components/creators/GalleryCreator"

describe("GalleryCreator", () => {

  test("has data", () => {
    expect(typeof GalleryCreator.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof GalleryCreator.props).toBe("object")
  })
})

describe('Mounted GalleryCreator', () => {
  const wrapper = shallowMount(GalleryCreator);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
