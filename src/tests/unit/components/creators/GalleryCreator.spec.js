import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import GalleryCreator from "@/components/creators/GalleryCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(GalleryCreator, {
    propsData: {},
    mocks: {},
    stubs: {}
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

describe('Mounted GalleryCreator', () => {
  test('wrapper', () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'ListElt' })).toBeDefined() 
  })

  test("wrapper data", () => {
    expect(wrapper.vm.name).toBe("")
    expect(wrapper.vm.author).toBe("")
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.createGallery).toBe("function") 
  })
});
