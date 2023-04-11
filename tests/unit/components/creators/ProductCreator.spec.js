import { shallowMount } from "@vue/test-utils"
import ProductCreator from "@/components/creators/ProductCreator"

describe("ProductCreator", () => {

  test("has data", () => {
    expect(typeof ProductCreator.data).toBe("function")
  })

  test("has props", () => {
    expect(typeof ProductCreator.props).toBe("object")
  })
})

describe('Mounted ProductCreator', () => {
  const wrapper = shallowMount(ProductCreator);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
