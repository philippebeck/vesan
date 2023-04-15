import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import CommentList from "@/components/lists/CommentList"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(CommentList, {
    props: {
      constants: {
        TEST: "test"
      },
      comments: [{
        text: "Comment text"
      }]
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("CommentList", () => {
  test("name", () => { 
    expect(CommentList.name).toBe("CommentList") 
  })

  test("components", () => { 
    expect(typeof CommentList.components).toBe("object") 
  })

  test("props", () => {
    expect(typeof CommentList.props).toBe("object")
  })

  test("methods", () => {
    expect(typeof CommentList.methods).toBe("object")
  })
})

describe("Mounted CommentList", () => {
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

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("comments")).toStrictEqual([{
      text: "Comment text"
    }])
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.updateComment).toBe("function") 
    expect(typeof wrapper.vm.deleteComment).toBe("function") 
  })
})
