import { shallowMount } from "@vue/test-utils"
import LinkManager from "@/components/managers/LinkManager"

describe("LinkManager", () => {

  test("has props", () => {
    expect(typeof LinkManager.props).toBe("object")
  })
})

describe('Mounted LinkManager', () => {
  const wrapper = shallowMount(LinkManager);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
