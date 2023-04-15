import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ReviewList from "@/components/lists/ReviewList"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ReviewList, {
    props: {},
    global: {
      mocks: {},
      stubs: {}
    }
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

describe("Mounted ReviewList", () => {

  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.updateReview).toBe("function") 
    expect(typeof wrapper.vm.deleteReview).toBe("function") 
  })
})
