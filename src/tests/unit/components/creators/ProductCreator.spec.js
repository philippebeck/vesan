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

describe("Mounted ProductCreator", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "Editor" })).toBe("object")
  })

  test("wrapper data", () => {
    expect(wrapper.vm.name).toBe("")
    expect(wrapper.vm.description).toBe("")
    expect(wrapper.vm.image).toBe("")
    expect(wrapper.vm.alt).toBe("")
    expect(wrapper.vm.price).toBe(null)
    expect(wrapper.vm.options).toBe("")
    expect(wrapper.vm.cat).toBe("")
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.createProduct).toBe("function") 
  })
});
