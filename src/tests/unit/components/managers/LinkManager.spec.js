import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import LinkManager from "@/components/managers/LinkManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(LinkManager, {
    propsData: {},
    mocks: {},
    stubs: {}
  });
});

enableAutoUnmount(afterEach)

describe("LinkManager", () => {
  test("name", () => { 
    expect(LinkManager.name).toBe("LinkManager") 
  })

  test("components", () => { 
    expect(typeof LinkManager.components).toBe("object") 
    expect(typeof LinkManager.components.BtnElt).toBe("object") 
    expect(typeof LinkManager.components.CardElt).toBe("object") 
    expect(typeof LinkManager.components.FieldElt).toBe("object") 
    expect(typeof LinkManager.components.TableElt).toBe("object")
  })

  test("props", () => {
    expect(typeof LinkManager.props).toBe("object")
    expect(LinkManager.props).toContain("constants") 
    expect(LinkManager.props).toContain("links") 
  })

  test("methods", () => { 
    expect(typeof LinkManager.methods.getLinks).toBe("function") 
    expect(typeof LinkManager.methods.getItemsByCat).toBe("function") 
    expect(typeof LinkManager.methods.getLink).toBe("function") 
    expect(typeof LinkManager.methods.checkLink).toBe("function") 
    expect(typeof LinkManager.methods.updateLink).toBe("function") 
    expect(typeof LinkManager.methods.deleteLink).toBe("function") 
  })
})

describe("Mounted LinkManager", () => {

  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(wrapper.findComponent({ name: "BtnElt" })).toBeDefined() 
    expect(wrapper.findComponent({ name: "CardElt" })).toBeDefined() 
    expect(wrapper.findComponent({ name: "FieldElt" })).toBeDefined() 
    expect(wrapper.findComponent({ name: "TableElt" })).toBeDefined() 
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.getLinks).toBe("function") 
    expect(typeof wrapper.vm.getItemsByCat).toBe("function") 
    expect(typeof wrapper.vm.getLink).toBe("function") 
    expect(typeof wrapper.vm.checkLink).toBe("function") 
    expect(typeof wrapper.vm.updateLink).toBe("function") 
    expect(typeof wrapper.vm.deleteLink).toBe("function") 
  })
})
