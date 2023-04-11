import { shallowMount } from "@vue/test-utils"
import ProductManager from "@/components/managers/ProductManager"

describe("ProductManager", () => {

  test("has props", () => {
    expect(typeof ProductManager.props).toBe("object")
  })
})

describe('Mounted ProductManager', () => {
  const wrapper = shallowMount(ProductManager);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
