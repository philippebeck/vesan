import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import * as services from "../../app/services"
import LegalView from "../../views/LegalView"

let wrapper;

beforeEach(() => {
  jest.spyOn(services, "setMeta").mockImplementation(() => {});

  wrapper = shallowMount(LegalView, {
    props: {
      val: {
        TEST: "test"
      },
      user: {
        name: "test",
        email: "email@test.com"
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("LegalView", () => {
  test("wrapper must be a vue instance", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object") 
  })

  test("wrapper props", () => { 
    expect(wrapper.props("val")).toStrictEqual({ TEST: "test" })
  })

  test("wrapper created hook", () => {
    expect(services.setMeta).toHaveBeenCalled()
  })
})
