import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import LinkCreator from "../../../components/LinkCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(LinkCreator, {
    props: {
      constants: {
        TEST: "test"
      },
      name: "Link name", 
      url: "Link url", 
      cat: "Link cat" 
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("LinkCreator", () => {
  test("name", () => { 
    expect(LinkCreator.name).toBe("LinkCreator") 
  })

  test("components", () => { 
    expect(typeof LinkCreator.components).toBe("object") 
  })

  test("props", () => { 
    expect(typeof LinkCreator.props).toBe("object") 
  })

  test("data", () => { 
    expect(typeof LinkCreator.data).toBe("function") 
  })

  test("methods", () => { 
    expect(typeof LinkCreator.methods).toBe("object") 
  })
})

describe("Mounted LinkCreator", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
  })

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
  })

  test("wrapper data", () => {
    expect(wrapper.vm.name).toBe("")
    expect(wrapper.vm.url).toBe("")
    expect(wrapper.vm.cat).toBe("")

    expect(wrapper.attributes("name")).toBe("Link name")
    expect(wrapper.attributes("url")).toBe("Link url")
    expect(wrapper.attributes("cat")).toBe("Link cat")
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.createLink).toBe("function") 
  })
});
