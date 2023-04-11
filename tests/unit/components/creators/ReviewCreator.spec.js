import { shallowMount } from "@vue/test-utils"
import ReviewCreator from "@/components/creators/ReviewCreator"

describe("ReviewCreator", () => {

  test("has data", () => {
    expect(typeof ReviewCreator.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof ReviewCreator.props).toBe("object")
  })
})

describe('Mounted ReviewCreator', () => {
  const wrapper = shallowMount(ReviewCreator);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
