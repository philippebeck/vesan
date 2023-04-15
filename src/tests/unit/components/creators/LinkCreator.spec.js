import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import LinkCreator from "@/components/creators/LinkCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(LinkCreator, {
    propsData: {},
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

describe('Mounted LinkCreator', () => {
  test('wrapper', () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'ListElt' })).toBeDefined() 
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.createLink).toBe("function") 
  })
});
