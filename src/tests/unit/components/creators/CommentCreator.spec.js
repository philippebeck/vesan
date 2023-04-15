import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import CommentCreator from "@/components/creators/CommentCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(CommentCreator, {
    propsData: {
      text: "Comment text"
    },
    mocks: {},
    stubs: {}
  });
});

enableAutoUnmount(afterEach)

describe("CommentCreator", () => {
  test("name", () => { 
    expect(CommentCreator.name).toBe("CommentCreator") 
  })

  test("components", () => { 
    expect(typeof CommentCreator.components).toBe("object") 
    expect(typeof CommentCreator.components.BtnElt).toBe("object") 
    expect(typeof CommentCreator.components.CardElt).toBe("object") 
    expect(typeof CommentCreator.components.FieldElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof CommentCreator.props).toBe("object") 
    expect(CommentCreator.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof CommentCreator.data).toBe("function") 
    expect(CommentCreator.data()).toEqual({ text: "" }) 
  })

  test("methods", () => { 
    expect(typeof CommentCreator.methods.createComment).toBe("function") 
  })
})

describe("Mounted CommentCreator", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
  })

  test("wrapper data", () => {
    expect(wrapper.vm.text).toBe("")
    expect(wrapper.attributes("text")).toBe("Comment text")
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.createComment).toBe("function") 
  })
});
