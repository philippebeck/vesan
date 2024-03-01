import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ImageSet from "../../components/ImageSet"

let wrapper;

jest.mock("axios");

beforeEach(() => {
  wrapper = shallowMount(ImageSet, {
    props: {
      val: {
        TEST: "test"
      },
      galleries: [{
        name: "Gallery name",
        author: "Gallery author"
      }],
      images: [{
        name: "Image name",
        description: "Image description",
        gallery: "Gallery name"
      }]
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ImageSet", () => {
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
    expect(wrapper.props("val")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("galleries")).toStrictEqual([{
      name: "Gallery name",
      author: "Gallery author"
    }])
    expect(wrapper.props("images")).toStrictEqual([{
      name: "Image name",
      description: "Image description",
      gallery: "Gallery name"
    }])
  })

  test("methods", () => {
    expect(typeof wrapper.vm.createImage).toBe("function")
    expect(typeof wrapper.vm.updateImage).toBe("function")
    expect(typeof wrapper.vm.deleteImage).toBe("function")
  })
})
