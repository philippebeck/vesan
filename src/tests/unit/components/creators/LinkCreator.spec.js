import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import LinkCreator from "@/components/creators/LinkCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(LinkCreator, {
    propsData: {
      name: "Link name", 
      url: "Link url", 
      cat: "Link cat" 
    },
    mocks: {},
    stubs: {}
  });
});

enableAutoUnmount(afterEach)

describe("LinkCreator", () => {
  test("name", () => { 
    expect(LinkCreator.name).toBe("LinkCreator") 
  })

  test("components", () => { 
    expect(typeof LinkCreator.components).toBe("object") 
    expect(typeof LinkCreator.components.BtnElt).toBe("object") 
    expect(typeof LinkCreator.components.CardElt).toBe("object") 
    expect(typeof LinkCreator.components.FieldElt).toBe("object") 
    expect(typeof LinkCreator.components.ListElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof LinkCreator.props).toBe("object") 
    expect(LinkCreator.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof LinkCreator.data).toBe("function") 
    expect(LinkCreator.data()).toEqual({ 
      name: "", 
      url: "", 
      cat: "" 
    }) 
  })

  test("methods", () => { 
    expect(typeof LinkCreator.methods.createLink).toBe("function") 
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
