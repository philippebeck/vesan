import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ErrorView from "../../../views/main/ErrorView"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ErrorView, {
    props: {
      val: {
        TEST: "test"
      }
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("ErrorView", () => {
  test("name", () => { 
    expect(ErrorView.name).toBe("ErrorView") 
  })

  test("components", () => { 
    expect(typeof ErrorView.components).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ErrorView.props).toBe("object") 
  })
})

describe("Mounted ErrorView", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object") 
  })

  test("wrapper props", () => { 
    expect(wrapper.props("val")).toStrictEqual({ TEST: "test" })
  })
})