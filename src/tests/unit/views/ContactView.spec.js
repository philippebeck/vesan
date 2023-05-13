import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import * as serve from "../../../assets/serve"
import ContactView from "../../../views/ContactView"

let wrapper;

/**
 * @jest-environment jsdom
 */
beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  wrapper = shallowMount(ContactView, {
    props: {
      constants: {
        TEST: "test"
      },
      user: {
        name: "test",
        email: "email@test.com"
      }
    },
    data() {
      return {
        email: "email@test.com",
        subject: "Test Subject",
        text: "Test Text"
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ContactView", () => {
  test("wrapper must be a vue instance", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => {
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "VueRecaptcha" })).toBe("object")
  })

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("user")).toStrictEqual({ 
      name: "test", 
      email: "email@test.com" 
    })
  })

  test("wrapper data", () => {
    expect(wrapper.vm.$data).toStrictEqual({
      email: "email@test.com", 
      subject: "Test Subject", 
      text: "Test Text"
    })
  })

  test("wrapper created hook", () => {
    expect(serve.setMeta).toHaveBeenCalled()
  })

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.onVerify).toBe("function")
    expect(typeof wrapper.vm.send).toBe("function")
  })
})
