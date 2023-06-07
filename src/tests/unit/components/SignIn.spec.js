import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import SignIn from "../../../components/SignIn"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(SignIn, {
    props: {
      constants: {
        TEST: "test",
        RECAPTCHA_KEY: "test"
      }
    },
    data() {
      return {
        email: "email@test.com",
        pass: "password"
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("SignIn", () => {
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
    expect(wrapper.props().constants.RECAPTCHA_KEY).toBe("test")
  })

  test("data", () => { 
    expect(wrapper.vm.$data).toStrictEqual({
      email: "email@test.com",
      pass: "password"
    })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.onVerify).toBe("function")
    expect(typeof wrapper.vm.signIn).toBe("function")
  })
})
