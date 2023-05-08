import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ArticleManager from "../../../components/ArticleManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ArticleManager, {
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

describe("ArticleManager", () => {
  test("name", () => { 
    expect(ArticleManager.name).toBe("ArticleManager") 
  })

  test("components", () => { 
    expect(typeof ArticleManager.components).toBe("object") 
  })

  test("props", () => {
    expect(typeof ArticleManager.props).toBe("object")
  })

  test("methods", () => { 
    expect(typeof ArticleManager.methods).toBe("object")
  })
})

describe("Mounted ArticleManager", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object") 
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
    expect(wrapper.props("users")).toStrictEqual([{
      name: "User name",
      email: "User email",
      image: "User image",
      password: "User password",
      role: "User role"
    }])
  })

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.getArticles).toBe("function")
    expect(typeof wrapper.vm.getArticle).toBe("function")
    expect(typeof wrapper.vm.checkArticle).toBe("function")
    expect(typeof wrapper.vm.updateArticle).toBe("function")
    expect(typeof wrapper.vm.deleteArticle).toBe("function")
  })
})
