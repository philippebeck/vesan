import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ForgotPass from "../../../components/ForgotPass"

let wrapper;

/**
 * @jest-environment jsdom
 */
beforeEach(() => {

  wrapper = shallowMount(ForgotPass, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        email: "email@test.com"
      }
    }
  });
});

enableAutoUnmount(afterEach)

describe("ForgotPass", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "VueRecaptcha" })).toBe("object")
  })

  test("props", () => { 
    expect(wrapper.props().constants.TEST).toBe("test")
  })

  test("data", () => { 
    expect(wrapper.vm.email).toBe("email@test.com")
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.onVerify).toBe("function")
    expect(typeof wrapper.vm.forgotPass).toBe("function")
  })
})
