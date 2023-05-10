import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import serve from "../../../assets/serve.js"
import LoginView from "../../../views/LoginView"

let wrapper;

/**
 * @jest-environment jsdom
 */
beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  wrapper = shallowMount(LoginView, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        type: "SignUp"
      }
    }
  });
});

enableAutoUnmount(afterEach)

describe("LoginView", () => {
  test("wrapper must be a vue instance", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "SignUp" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "SignIn" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ForgotPass" })).toBe("object")
  })

  test("wrapper props", () => { 
    expect(wrapper.props().constants).toStrictEqual({ TEST: "test" })
  })

  test("wrapper data", () => { 
    expect(wrapper.vm.type).toBe("SignUp")
  })

  test("wrapper created hook", () => {
    expect(serve.setMeta).toHaveBeenCalled()
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.setType).toBe("function")
  })
})
