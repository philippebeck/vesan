import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import * as serve from "servidio"
import LegalView from "../../views/base/LegalView"

let wrapper;

beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  wrapper = shallowMount(LegalView, {
    props: {
      constants: {
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
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("user")).toStrictEqual({ 
      name: "test", 
      email: "email@test.com" 
    })
  })

  test("wrapper created hook", () => {
    expect(serve.setMeta).toHaveBeenCalled()
  })
})
