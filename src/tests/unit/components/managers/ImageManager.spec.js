import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ImageManager from "@/components/managers/ImageManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ImageManager, {
    propsData: {},
    mocks: {},
    stubs: {}
  });
});

enableAutoUnmount(afterEach)

describe("ImageManager", () => {
  test("name", () => { 
    expect(ImageManager.name).toBe("ImageManager") 
  })

  test("components", () => { 
    expect(typeof ImageManager.components).toBe("object") 
    expect(typeof ImageManager.components.BtnElt).toBe("object") 
    expect(typeof ImageManager.components.CardElt).toBe("object") 
    expect(typeof ImageManager.components.FieldElt).toBe("object") 
    expect(typeof ImageManager.components.MediaElt).toBe("object") 
    expect(typeof ImageManager.components.TableElt).toBe("object")
  })

  test("props", () => {
    expect(typeof ImageManager.props).toBe("object")
    expect(ImageManager.props).toContain("constants") 
    expect(ImageManager.props).toContain("galleries") 
    expect(ImageManager.props).toContain("images") 
  })

  test("methods", () => { 
    expect(typeof ImageManager.methods.getImages).toBe("function") 
    expect(typeof ImageManager.methods.getItemsByGallery).toBe("function") 
    expect(typeof ImageManager.methods.updateImage).toBe("function") 
    expect(typeof ImageManager.methods.deleteImage).toBe("function") 
  })
})

describe("Mounted ImageManager", () => {

  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object")
  })

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.getImages).toBe("function")
    expect(typeof wrapper.vm.getItemsByGallery).toBe("function")
    expect(typeof wrapper.vm.updateImage).toBe("function")
    expect(typeof wrapper.vm.deleteImage).toBe("function")
  })
})