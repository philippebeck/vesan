import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ImageCreator from "@/components/creators/ImageCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ImageCreator, {
    props: {
      constants: {
        TEST: "test"
      },
      description: "Image description", 
      gallery: "Image gallery" 
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("ImageCreator", () => {
  test("name", () => { 
    expect(ImageCreator.name).toBe("ImageCreator") 
  })

  test("components", () => { 
    expect(typeof ImageCreator.components).toBe("object") 
    expect(typeof ImageCreator.components.BtnElt).toBe("object") 
    expect(typeof ImageCreator.components.CardElt).toBe("object") 
    expect(typeof ImageCreator.components.FieldElt).toBe("object") 
    expect(typeof ImageCreator.components.ListElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ImageCreator.props).toBe("object") 
    expect(ImageCreator.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ImageCreator.data).toBe("function") 
    expect(ImageCreator.data()).toEqual({ 
      description: "", 
      gallery: "" 
    }) 
  })

  test("methods", () => { 
    expect(typeof ImageCreator.methods.createImage).toBe("function") 
  })
})

describe("Mounted ImageCreator", () => {
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
    expect(wrapper.vm.description).toBe("")
    expect(wrapper.vm.gallery).toBe("")

    expect(wrapper.attributes("description")).toBe("Image description")
    expect(wrapper.attributes("gallery")).toBe("Image gallery")
  })

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.createImage).toBe("function")
  })
});
