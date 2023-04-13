import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ImageCreator from "@/components/creators/ImageCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ImageCreator, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
  });
});

enableAutoUnmount(afterEach)

describe("ImageCreator", () => {
  test("name", () => { 
    expect(ImageCreator.name).toBe("ImageCreator") 
  })

  test("components", () => { 
    expect(typeof ImageCreator.components).toBe("object") 
    expect(typeof ImageCreator.components.BtnElt).toBe("object") 
    expect(typeof ImageCreator.components.CardElt).toBe("object") 
    expect(typeof ImageCreator.components.FieldElt).toBe("object") 
    expect(typeof ImageCreator.components.ListElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ImageCreator.props).toBe("object") 
    expect(ImageCreator.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ImageCreator.data).toBe("function") 
    expect(ImageCreator.data()).toEqual({ description: "", gallery: "" }) 
  })

  test("methods", () => { 
    expect(typeof ImageCreator.methods.createImage).toBe("function") 
  })
})

describe('Mounted ImageCreator', () => {
  test('wrapper', () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'ListElt' })).toBeDefined() 
  })
});
