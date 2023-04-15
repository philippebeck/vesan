import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import CommentManager from "@/components/managers/CommentManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(CommentManager, {
    props: {
      constants: {
        TEST: "test"
      },
      articles: [{
        name: "Article name",
        text: "Article text",
        image: "Article image",
        alt: "Article alt",
        cat: "Article cat"
      }],
      comments: [{
        text: "Comment text"
      }],
      users: [{
        name: "User name",
        email: "User email",
        image: "User image",
        password: "User password",
        role: "User role"
      }]
    },
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("CommentManager", () => {
  test("name", () => { 
    expect(CommentManager.name).toBe("CommentManager") 
  })

  test("components", () => { 
    expect(typeof CommentManager.components).toBe("object") 
  })

  test("props", () => {
    expect(typeof CommentManager.props).toBe("object")
  })

  test("methods", () => { 
    expect(typeof CommentManager.methods).toBe("object")
  })
})

describe("Mounted CommentManager", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object") 
  })

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("articles")).toStrictEqual([{
      name: "Article name",
      text: "Article text",
      image: "Article image",
      alt: "Article alt",
      cat: "Article cat"
    }])
    expect(wrapper.props("comments")).toStrictEqual([{
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

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.getComments).toBe("function")
    expect(typeof wrapper.vm.getArticleName).toBe("function")
    expect(typeof wrapper.vm.moderateComment).toBe("function")
    expect(typeof wrapper.vm.deleteComment).toBe("function")
  })
})
