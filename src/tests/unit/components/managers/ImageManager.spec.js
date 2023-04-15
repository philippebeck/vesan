import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ImageManager from "@/components/managers/ImageManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ImageManager, {
    props: {
      constants: {
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
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("ImageManager", () => {
  test("name", () => { 
    expect(ImageManager.name).toBe("ImageManager") 
  })

  test("components", () => { 
    expect(typeof ImageManager.components).toBe("object") 
  })

  test("props", () => {
    expect(typeof ImageManager.props).toBe("object")
  })

  test("methods", () => { 
    expect(typeof ImageManager.methods).toBe("object")
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

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
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

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.getImages).toBe("function")
    expect(typeof wrapper.vm.getItemsByGallery).toBe("function")
    expect(typeof wrapper.vm.updateImage).toBe("function")
    expect(typeof wrapper.vm.deleteImage).toBe("function")
  })
})
