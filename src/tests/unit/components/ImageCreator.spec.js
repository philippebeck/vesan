import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ImageCreator from "../../../components/ImageCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ImageCreator, {
    props: {
      constants: {
        TEST: "test"
      },
      description: "Image description", 
      gallery: "Image gallery" 
    }
  });
});

enableAutoUnmount(afterEach)

describe("ImageCreator", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
  })

  test("props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
  })

  test("data", () => {
    expect(wrapper.vm.description).toBe("")
    expect(wrapper.vm.gallery).toBe("")

    expect(wrapper.attributes("description")).toBe("Image description")
    expect(wrapper.attributes("gallery")).toBe("Image gallery")
  })

  test("methods", () => {
    expect(typeof wrapper.vm.createImage).toBe("function")
  })
});
