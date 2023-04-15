import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ReviewList from "@/components/lists/ReviewList"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ReviewList, {
    propsData: {},
    mocks: {},
    stubs: {}
  });
});

enableAutoUnmount(afterEach)

describe("ReviewList", () => {
  test("name", () => { 
    expect(ReviewList.name).toBe("ReviewList") 
  })

  test("components", () => { 
    expect(typeof ReviewList.components).toBe("object") 
    expect(typeof ReviewList.components.BtnElt).toBe("object") 
    expect(typeof ReviewList.components.CardElt).toBe("object") 
    expect(typeof ReviewList.components.FieldElt).toBe("object") 
    expect(typeof ReviewList.components.ListElt).toBe("object")
    expect(typeof ReviewList.components.MediaElt).toBe("object") 
  })

  test("props", () => {
    expect(typeof ReviewList.props).toBe("object")
    expect(ReviewList.props).toContain("constants") 
    expect(ReviewList.props).toContain("reviews") 
  })

  test("methods", () => { 
    expect(typeof ReviewList.methods.updateReview).toBe("function") 
    expect(typeof ReviewList.methods.deleteReview).toBe("function") 
  })
})

describe('Mounted ReviewList', () => {

  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'ListElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'MediaElt' })).toBeDefined() 
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.updateReview).toBe("function") 
    expect(typeof wrapper.vm.deleteReview).toBe("function") 
  })
})
