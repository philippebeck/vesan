import { shallowMount } from "@vue/test-utils"
import ArticleCreator from "@/components/creators/ArticleCreator"

describe("ArticleCreator", () => {

  test("has data", () => {
    expect(typeof ArticleCreator.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof ArticleCreator.props).toBe("object")
  })
})

describe('Mounted ArticleCreator', () => {
  const wrapper = shallowMount(ArticleCreator);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
