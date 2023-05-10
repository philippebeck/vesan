import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import CommentCreator from "../../../components/CommentCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(CommentCreator, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        text: "Comment text"
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("CommentCreator", () => {
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
    expect(wrapper.vm.$data).toStrictEqual({ text: "Comment text" })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.createComment).toBe("function") 
  })
});
