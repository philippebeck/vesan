import { shallowMount } from "@vue/test-utils"
import CommentList from "@/components/lists/CommentList"

describe("CommentList", () => {

  test("has props", () => {
    expect(typeof CommentList.props).toBe("object")
  })
})

describe('Mounted CommentList', () => {
  const wrapper = shallowMount(CommentList);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
