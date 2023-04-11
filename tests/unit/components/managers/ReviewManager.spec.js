import { shallowMount } from "@vue/test-utils"
import ReviewManager from "@/components/managers/ReviewManager"

describe("ReviewManager", () => {

  test("has props", () => {
    expect(typeof ReviewManager.props).toBe("object")
  })
})

describe('Mounted ReviewManager', () => {
  const wrapper = shallowMount(ReviewManager);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
