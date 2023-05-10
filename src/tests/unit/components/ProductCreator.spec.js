import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ProductCreator from "../../../components/ProductCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ProductCreator, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        name: "Product name", 
        description: "Product description", 
        image: "Product image",
        alt: "Product alt",
        price: 100,
        options: "Product options", 
        cat: "Product cat"
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ProductCreator", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "Editor" })).toBe("object")
  })

  test("props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
  })

  test("data", () => {
    expect(wrapper.vm.$data).toStrictEqual({
      name: "Product name",
      description: "Product description",
      image: "Product image",
      alt: "Product alt",
      price: 100,
      options: "Product options",
      cat: "Product cat"
    })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.createProduct).toBe("function") 
  })
});
