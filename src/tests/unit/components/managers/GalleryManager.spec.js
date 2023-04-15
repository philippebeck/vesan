import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import GalleryManager from "@/components/managers/GalleryManager"

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
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("GalleryManager", () => {
  test("name", () => { 
    expect(GalleryManager.name).toBe("GalleryManager") 
  })

  test("components", () => { 
    expect(typeof GalleryManager.components).toBe("object") 
  })

  test("props", () => {
    expect(typeof GalleryManager.props).toBe("object")
  })

  test("methods", () => { 
    expect(typeof GalleryManager.methods).toBe("object")
  })
})

describe("Mounted GalleryManager", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object")
  })

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("galleries")).toStrictEqual([{
      name: "Gallery name",
      author: "Gallery author"
    }])
  })

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.getGalleries).toBe("function")
    expect(typeof wrapper.vm.updateGallery).toBe("function")
    expect(typeof wrapper.vm.deleteGallery).toBe("function")
  })
})
