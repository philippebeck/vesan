import { shallowMount } from "@vue/test-utils"
import LinkCreator from "@/components/creators/LinkCreator"

describe("LinkCreator", () => {

  test("has data", () => {
    expect(typeof LinkCreator.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof LinkCreator.props).toBe("object")
  })
})

describe('Mounted LinkCreator', () => {
  const wrapper = shallowMount(LinkCreator);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
