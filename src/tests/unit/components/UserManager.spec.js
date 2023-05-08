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
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("UserManager", () => {
  test("name", () => { 
    expect(UserManager.name).toBe("UserManager") 
  })

  test("components", () => { 
    expect(typeof UserManager.components).toBe("object") 
  })

  test("props", () => {
    expect(typeof UserManager.props).toBe("object")
  })

  test("methods", () => { 
    expect(typeof UserManager.methods).toBe("object")
  })
})

describe("Mounted UserManager", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object")
  })

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("users")).toStrictEqual([{
      name: "User name",
      email: "User email",
      image: "User image",
      password: "User password",
      role: "User role"
    }])
  })

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.getUsers).toBe("function")
    expect(typeof wrapper.vm.getUser).toBe("function")
    expect(typeof wrapper.vm.checkUser).toBe("function")
    expect(typeof wrapper.vm.updateUser).toBe("function")
    expect(typeof wrapper.vm.deleteUser).toBe("function")
  })
})
