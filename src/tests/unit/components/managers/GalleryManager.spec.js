import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import GalleryManager from "@/components/managers/GalleryManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(GalleryManager, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
  });
});

enableAutoUnmount(afterEach)

describe("GalleryManager", () => {
  test("name", () => { 
    expect(GalleryManager.name).toBe("GalleryManager") 
  })

  test("components", () => { 
    expect(typeof GalleryManager.components).toBe("object") 
    expect(typeof GalleryManager.components.BtnElt).toBe("object") 
    expect(typeof GalleryManager.components.CardElt).toBe("object") 
    expect(typeof GalleryManager.components.FieldElt).toBe("object") 
    expect(typeof GalleryManager.components.TableElt).toBe("object")
  })

  test("props", () => {
    expect(typeof GalleryManager.props).toBe("object")
    expect(GalleryManager.props).toContain("constants") 
    expect(GalleryManager.props).toContain("galleries") 
  })

  test("methods", () => { 
    expect(typeof GalleryManager.methods.getGalleries).toBe("function") 
    expect(typeof GalleryManager.methods.updateGallery).toBe("function") 
    expect(typeof GalleryManager.methods.deleteGallery).toBe("function") 
  })
})

describe('Mounted GalleryManager', () => {

  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'TableElt' })).toBeDefined() 
  })

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.getGalleries).toBe("function")
    expect(typeof wrapper.vm.updateGallery).toBe("function")
    expect(typeof wrapper.vm.deleteGallery).toBe("function")
  })
})

