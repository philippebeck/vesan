import { shallowMount } from "@vue/test-utils"
import GalleryManager from "@/components/managers/GalleryManager"

describe("GalleryManager", () => {

  test("has props", () => {
    expect(typeof GalleryManager.props).toBe("object")
  })
})

describe('Mounted GalleryManager', () => {
  const wrapper = shallowMount(GalleryManager);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
