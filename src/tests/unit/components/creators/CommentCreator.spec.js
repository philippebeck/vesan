import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import CommentCreator from "@/components/creators/CommentCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(CommentCreator, {
    props: {
      constants: {
        TEST: "test"
      },
      text: "Comment text"
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("CommentCreator", () => {
  test("name", () => { 
    expect(CommentCreator.name).toBe("CommentCreator") 
  })

  test("components", () => { 
    expect(typeof CommentCreator.components).toBe("object") 
  })

  test("props", () => { 
    expect(typeof CommentCreator.props).toBe("object") 
  })

  test("data", () => { 
    expect(typeof CommentCreator.data).toBe("function") 
  })

  test("methods", () => { 
    expect(typeof CommentCreator.methods).toBe("object") 
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

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
  })

  test("wrapper data", () => {
    expect(wrapper.vm.text).toBe("")
    expect(wrapper.attributes("text")).toBe("Comment text")
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.createComment).toBe("function") 
  })
});
