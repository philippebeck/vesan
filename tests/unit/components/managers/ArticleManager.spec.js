import { shallowMount } from "@vue/test-utils"
import ArticleManager from "@/components/managers/ArticleManager"

describe("ArticleManager", () => {

  test("has props", () => {
    expect(typeof ArticleManager.props).toBe("object")
  })
})

describe('Mounted ArticleManager', () => {
  const wrapper = shallowMount(ArticleManager);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
