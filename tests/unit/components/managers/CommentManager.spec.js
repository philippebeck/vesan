import { shallowMount } from "@vue/test-utils"
import CommentManager from "@/components/managers/CommentManager"

describe("CommentManager", () => {

  test("has props", () => {
    expect(typeof CommentManager.props).toBe("object")
  })
})

describe('Mounted CommentManager', () => {
  const wrapper = shallowMount(CommentManager);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
