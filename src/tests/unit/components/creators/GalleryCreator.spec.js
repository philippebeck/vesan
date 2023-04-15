import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import GalleryCreator from "@/components/creators/GalleryCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(GalleryCreator, {
    props: {
      name: "Gallery name", 
      author: "Gallery author" 
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("GalleryCreator", () => {
  test("name", () => { 
    expect(GalleryCreator.name).toBe("GalleryCreator") 
  })

  test("components", () => { 
    expect(typeof GalleryCreator.components).toBe("object") 
    expect(typeof GalleryCreator.components.BtnElt).toBe("object") 
    expect(typeof GalleryCreator.components.CardElt).toBe("object") 
    expect(typeof GalleryCreator.components.FieldElt).toBe("object") 
    expect(typeof GalleryCreator.components.ListElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof GalleryCreator.props).toBe("object") 
    expect(GalleryCreator.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof GalleryCreator.data).toBe("function") 
    expect(GalleryCreator.data()).toEqual({ 
      name: "", 
      author: "" 
    }) 
  })

  test("methods", () => { 
    expect(typeof GalleryCreator.methods.createGallery).toBe("function") 
  })
})

describe("Mounted GalleryCreator", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
  })

  test("wrapper data", () => {
    expect(wrapper.vm.name).toBe("")
    expect(wrapper.vm.author).toBe("")

    expect(wrapper.attributes("name")).toBe("Gallery name")
    expect(wrapper.attributes("author")).toBe("Gallery author")
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.createGallery).toBe("function") 
  })
});
