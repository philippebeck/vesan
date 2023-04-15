import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ReviewCreator from "@/components/creators/ReviewCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ReviewCreator, {
    props: {
      constants: {
        TEST: "test"
      },
      text: "Review text", 
      score: 5 
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("ReviewCreator", () => {
  test("name", () => { 
    expect(ReviewCreator.name).toBe("ReviewCreator") 
  })

  test("components", () => { 
    expect(typeof ReviewCreator.components).toBe("object") 
    expect(typeof ReviewCreator.components.BtnElt).toBe("object") 
    expect(typeof ReviewCreator.components.CardElt).toBe("object") 
    expect(typeof ReviewCreator.components.FieldElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ReviewCreator.props).toBe("object") 
    expect(ReviewCreator.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ReviewCreator.data).toBe("function") 
    expect(ReviewCreator.data()).toEqual({ 
      text: "", 
      score: null 
    }) 
  })

  test("methods", () => { 
    expect(typeof ReviewCreator.methods.createReview).toBe("function") 
  })
})

describe("Mounted ReviewCreator", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
  })

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
  })

  test("wrapper data", () => {
    expect(wrapper.vm.text).toBe("")
    expect(wrapper.vm.score).toBe(null)

    expect(wrapper.attributes("text")).toBe("Review text")
    expect(wrapper.attributes("score")).toBe("5")
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.createReview).toBe("function") 
  })
});
