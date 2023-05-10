import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ProductManager from "../../../components/ProductManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ProductManager, {
    props: {
      constants: {
        TEST: "test"
      },
      products: [{
        name: "Product name",
        description: "Product description",
        image: "Product image",
        alt: "Product alt",
        price: "Product price",
        options: "Product options",
        cat: "Product cat"
      }]
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ProductManager", () => {
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
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("products")).toStrictEqual([{
      name: "Product name",
      description: "Product description",
      image: "Product image",
      alt: "Product alt",
      price: "Product price",
      options: "Product options",
      cat: "Product cat"
    }])
  })

  test("methods", () => {
    expect(typeof wrapper.vm.getProducts).toBe("function")
    expect(typeof wrapper.vm.getProduct).toBe("function")
    expect(typeof wrapper.vm.checkProduct).toBe("function")
    expect(typeof wrapper.vm.updateProduct).toBe("function")
    expect(typeof wrapper.vm.deleteProduct).toBe("function")
  })
})
