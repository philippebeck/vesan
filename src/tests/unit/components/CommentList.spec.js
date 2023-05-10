import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import CommentList from "../../../components/CommentList"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(CommentList, {
    props: {
      comments: [{
        text: "Comment text"
      }],
      constants: {
        TEST: "test"
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("CommentList", () => {
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
    expect(wrapper.props("comments")).toStrictEqual([{ text: "Comment text" }])
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.updateComment).toBe("function") 
    expect(typeof wrapper.vm.deleteComment).toBe("function") 
  })
})
