import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ProductManager from "@/components/managers/ProductManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ProductManager, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
  });
});

enableAutoUnmount(afterEach)

describe("ProductManager", () => {
  test("name", () => { 
    expect(ProductManager.name).toBe("ProductManager") 
  })

  test("components", () => { 
    expect(typeof ProductManager.components).toBe("object") 
    expect(typeof ProductManager.components.BtnElt).toBe("object") 
    expect(typeof ProductManager.components.CardElt).toBe("object") 
    expect(typeof ProductManager.components.FieldElt).toBe("object") 
    expect(typeof ProductManager.components.MediaElt).toBe("object") 
    expect(typeof ProductManager.components.TableElt).toBe("object")
  })

  test("props", () => {
    expect(typeof ProductManager.props).toBe("object")
    expect(ProductManager.props).toContain("constants") 
    expect(ProductManager.props).toContain("products") 
  })

  test("methods", () => { 
    expect(typeof ProductManager.methods.getProducts).toBe("function") 
    expect(typeof ProductManager.methods.getProduct).toBe("function") 
    expect(typeof ProductManager.methods.checkProduct).toBe("function") 
    expect(typeof ProductManager.methods.updateProduct).toBe("function") 
    expect(typeof ProductManager.methods.deleteProduct).toBe("function") 
  })
})

describe('Mounted ProductManager', () => {

  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'MediaElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'TableElt' })).toBeDefined() 
  })
})