import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import UserManager from "../../../components/UserManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(UserManager, {
    props: {
      constants: {
        TEST: "test"
      },
      users: [{
        name: "User name",
        email: "User email",
        image: "User image",
        password: "User password",
        role: "User role"
      }]
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("UserManager", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object")
  })

  test("props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("users")).toStrictEqual([{
      name: "User name",
      email: "User email",
      image: "User image",
      password: "User password",
      role: "User role"
    }])
  })

  test("methods", () => {
    expect(typeof wrapper.vm.getUsers).toBe("function")
    expect(typeof wrapper.vm.getUser).toBe("function")
    expect(typeof wrapper.vm.checkUser).toBe("function")
    expect(typeof wrapper.vm.updateUser).toBe("function")
    expect(typeof wrapper.vm.deleteUser).toBe("function")
  })
})
