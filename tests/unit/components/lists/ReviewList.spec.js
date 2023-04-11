import { shallowMount } from "@vue/test-utils"
import ReviewList from "@/components/lists/ReviewList"

describe("ReviewList", () => {

  test("has props", () => {
    expect(typeof ReviewList.props).toBe("object")
  })
})

describe('Mounted ReviewList', () => {
  const wrapper = shallowMount(ReviewList);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
