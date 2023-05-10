import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import SignUp from "../../../components/SignUp"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(SignUp, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        name: "name",
        email: "email@test.com",
        image: "image",
        pass: "password"
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("SignUp", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "VueRecaptcha" })).toBe("object")
  })

  test("props", () => { 
    expect(wrapper.props().constants.TEST).toBe("test")
  })

  test("data", () => { 
    expect(wrapper.vm.$data).toStrictEqual({
      name: "name",
      email: "email@test.com",
      image: "image",
      pass: "password"
    })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.onVerify).toBe("function")
    expect(typeof wrapper.vm.createUser).toBe("function")
  })
})
