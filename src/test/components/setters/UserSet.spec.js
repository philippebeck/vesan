import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import UserSet from "../../../components/setters/UserSet"

let wrapper;

jest.mock("axios");

beforeEach(() => {
  wrapper = shallowMount(UserSet, {
    props: {
      val: {
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
describe("UserSet", () => {
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
    expect(wrapper.props("val")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("users")).toStrictEqual([{
      name: "User name",
      email: "User email",
      image: "User image",
      password: "User password",
      role: "User role"
    }])
  })

  test("methods", () => {
    expect(typeof wrapper.vm.updateUser).toBe("function")
    expect(typeof wrapper.vm.deleteUser).toBe("function")
  })
})
