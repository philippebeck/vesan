import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ReviewCreator from "../../../components/ReviewCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ReviewCreator, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        text: "Review text", 
        score: 5 
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ReviewCreator", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
  })

  test("props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
  })

  test("data", () => {
    expect(wrapper.vm.$data).toStrictEqual({ 
      text: "Review text", 
      score: 5 
    })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.createReview).toBe("function") 
  })
});
