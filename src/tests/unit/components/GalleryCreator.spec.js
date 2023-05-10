import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import GalleryCreator from "../../../components/GalleryCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(GalleryCreator, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        name: "Gallery name", 
        author: "Gallery author"
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("GalleryCreator", () => {
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
    expect(wrapper.vm.$data).toStrictEqual({
      name: "Gallery name",
      author: "Gallery author"
    })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.createGallery).toBe("function") 
  })
});
