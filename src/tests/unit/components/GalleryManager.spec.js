import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import GalleryManager from "../../../components/GalleryManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(GalleryManager, {
    props: {
      constants: {
        TEST: "test"
      },
      galleries: [{
        name: "Gallery name",
        author: "Gallery author"
      }]
    }
  });
});

enableAutoUnmount(afterEach)

describe("GalleryManager", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object")
  })

  test("props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("galleries")).toStrictEqual([{
      name: "Gallery name",
      author: "Gallery author"
    }])
  })

  test("methods", () => {
    expect(typeof wrapper.vm.getGalleries).toBe("function")
    expect(typeof wrapper.vm.updateGallery).toBe("function")
    expect(typeof wrapper.vm.deleteGallery).toBe("function")
  })
})
