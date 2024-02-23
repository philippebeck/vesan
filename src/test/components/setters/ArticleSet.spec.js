import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ArticleSet from "../../../components/setters/ArticleSet"

let wrapper;

jest.mock("axios");

beforeEach(() => {
  wrapper = shallowMount(ArticleSet, {
    props: {
      val: {
        TEST: "test"
      },
      articles: [
        {
          id: "Article Id 1",
          name: "Article Name 1",
          text: "Article Text 1",
          image: "Article Image 1",
          alt: "Article Alt 1",
          cat: "Article Cat 1"
        },
        {
          id: "Article Id 2",
          name: "Article Name 2",
          text: "Article Text 2",
          image: "Article Image 2",
          alt: "Article Alt 2",
          cat: "Article Cat 2"
        }
      ],
      users: [
        {
          name: "User Name 1",
          email: "User Email 1",
          image: "User Image 1",
          password: "User Password 1"
        },
        {
          name: "User Name 2",
          email: "User Email 2",
          image: "User Image 2",
          password: "User Password 2"
        }
      ]
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ArticleSet", () => {
  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object") 
  })

  test("props", () => {
    expect(wrapper.props("val")).toStrictEqual({ TEST: "test" })
  })

  test("methods", () => {
    expect(typeof wrapper.vm.createArticle).toBe("function")
  })
})
