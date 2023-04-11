import { shallowMount } from "@vue/test-utils"
import UserManager from "@/components/managers/UserManager"

describe("UserManager", () => {

  test("has props", () => {
    expect(typeof UserManager.props).toBe("object")
  })
})

describe('Mounted UserManager', () => {
  const wrapper = shallowMount(UserManager);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
