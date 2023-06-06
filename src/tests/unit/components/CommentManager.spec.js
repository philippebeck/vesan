import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import CommentManager from "../../../components/CommentManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(CommentManager, {
    props: {
      articles: [{
        id: "Article id",
        name: "Article name",
        text: "Article text",
        image: "Article image",
        alt: "Article alt",
        cat: "Article cat"
      }],
      comments: [
        { 
          id: "Comment id",
          text: "Comment text" 
        }
    ],
      constants: { TEST: "test" },
      users: [{
        name: "User name",
        email: "User email",
        image: "User image",
        password: "User password",
        role: "User role"
      }]
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("CommentManager", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object") 
  })

  test("props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("articles")).toStrictEqual([{
      id: "Article id",
      name: "Article name",
      text: "Article text",
      image: "Article image",
      alt: "Article alt",
      cat: "Article cat"
    }])
    expect(wrapper.props("comments")).toStrictEqual([{
      id: "Comment id",
      text: "Comment text"
    }])
    expect(wrapper.props("users")).toStrictEqual([{
      name: "User name",
      email: "User email",
      image: "User image",
      password: "User password",
      role: "User role"
    }])
  })

  test("methods", () => {
    expect(typeof wrapper.vm.getComments).toBe("function")
    expect(typeof wrapper.vm.getArticleName).toBe("function")
    expect(typeof wrapper.vm.moderateComment).toBe("function")
    expect(typeof wrapper.vm.deleteComment).toBe("function")
  })

  test("getComments() must return all comments", () => {
    expect(wrapper.vm.getComments()).toStrictEqual([{
      id: "Comment id",
      text: "Comment text"
    }])
  })
})
