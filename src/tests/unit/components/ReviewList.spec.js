import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ReviewList from "../../../components/ReviewList"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ReviewList, {
    props: {
      constants: {
        TEST: "test"
      },
      reviews: [{
        text: "Review text",
        score: "Review score"
      }]
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ReviewList", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
  })

  test("props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("reviews")).toStrictEqual([{
      text: "Review text",
      score: "Review score"
    }])
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.updateReview).toBe("function") 
    expect(typeof wrapper.vm.deleteReview).toBe("function") 
  })
})
