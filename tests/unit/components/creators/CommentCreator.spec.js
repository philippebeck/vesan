import { shallowMount } from "@vue/test-utils"
import CommentCreator from "@/components/creators/CommentCreator"

describe("CommentCreator", () => {

  test("has data", () => {
    expect(typeof CommentCreator.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof CommentCreator.props).toBe("object")
  })
})

describe('Mounted CommentCreator', () => {
  const wrapper = shallowMount(CommentCreator);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
