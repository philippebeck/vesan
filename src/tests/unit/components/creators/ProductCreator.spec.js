import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ProductCreator from "@/components/creators/ProductCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ProductCreator, {
    propsData: {},
    mocks: {},
    stubs: {}
  });
});

enableAutoUnmount(afterEach)

describe("ProductCreator", () => {
  test("name", () => { 
    expect(ProductCreator.name).toBe("ProductCreator") 
  })

  test("components", () => { 
    expect(typeof ProductCreator.components).toBe("object") 
    expect(typeof ProductCreator.components.BtnElt).toBe("object") 
    expect(typeof ProductCreator.components.CardElt).toBe("object") 
    expect(typeof ProductCreator.components.FieldElt).toBe("object") 
    expect(typeof ProductCreator.components.ListElt).toBe("object") 
    expect(typeof ProductCreator.components.Editor).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ProductCreator.props).toBe("object") 
    expect(ProductCreator.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ProductCreator.data).toBe("function") 
    expect(ProductCreator.data()).toEqual({ 
      name: "", 
      description: "", 
      image: "", 
      alt: "", 
      price: null, 
      options: "", 
      cat: "" 
    }) 
  })

  test("methods", () => { 
    expect(typeof ProductCreator.methods.createProduct).toBe("function") 
  })
})

describe('Mounted ProductCreator', () => {
  test('wrapper', () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'ListElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'Editor' })).toBeDefined() 
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.createProduct).toBe("function") 
  })
});
