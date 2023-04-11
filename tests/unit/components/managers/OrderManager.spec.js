import { shallowMount } from "@vue/test-utils"
import OrderManager from "@/components/managers/OrderManager"

describe("OrderManager", () => {

  test("has props", () => {
    expect(typeof OrderManager.props).toBe("object")
  })
})

describe('Mounted OrderManager', () => {
  const wrapper = shallowMount(OrderManager);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
