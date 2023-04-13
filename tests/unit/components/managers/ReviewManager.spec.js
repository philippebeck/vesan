import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ReviewManager from "@/components/managers/ReviewManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ReviewManager, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
  });
});

enableAutoUnmount(afterEach)

describe("ReviewManager", () => {
  test("name", () => { 
    expect(ReviewManager.name).toBe("ReviewManager") 
  })

  test("components", () => { 
    expect(typeof ReviewManager.components).toBe("object") 
    expect(typeof ReviewManager.components.BtnElt).toBe("object") 
    expect(typeof ReviewManager.components.CardElt).toBe("object") 
    expect(typeof ReviewManager.components.FieldElt).toBe("object") 
    expect(typeof ReviewManager.components.TableElt).toBe("object")
  })

  test("props", () => {
    expect(typeof ReviewManager.props).toBe("object")
    expect(ReviewManager.props).toContain("constants") 
    expect(ReviewManager.props).toContain("products") 
    expect(ReviewManager.props).toContain("reviews") 
    expect(ReviewManager.props).toContain("users") 
  })

  test("methods", () => { 
    expect(typeof ReviewManager.methods.getReviews).toBe("function") 
    expect(typeof ReviewManager.methods.getProductName).toBe("function") 
    expect(typeof ReviewManager.methods.moderateReview).toBe("function") 
    expect(typeof ReviewManager.methods.deleteReview).toBe("function") 
  })
})

describe('Mounted ReviewManager', () => {

  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'TableElt' })).toBeDefined() 
  })
})
