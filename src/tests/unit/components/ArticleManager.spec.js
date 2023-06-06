import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ArticleManager from "../../../components/ArticleManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ArticleManager, {
    props: {
      constants: {
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
describe("ArticleManager", () => {
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
    expect(wrapper.props("articles")).toStrictEqual([
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
    ])
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("users")).toStrictEqual([
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
    ])
  })

  test("methods", () => {
    expect(typeof wrapper.vm.getArticles).toBe("function")
    expect(typeof wrapper.vm.getArticle).toBe("function")
    expect(typeof wrapper.vm.checkArticle).toBe("function")
    expect(typeof wrapper.vm.updateArticle).toBe("function")
    expect(typeof wrapper.vm.deleteArticle).toBe("function")
  })

  test("getArticles()", () => {
    expect(wrapper.vm.getArticles()).toStrictEqual([
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
    ])
  })

  test("updateArticle()", () => {
    wrapper.vm.articles[0] = {
      id: "Article Id 1 Updated",
      name: "Article Name 1 Updated",
      text: "Article Text 1 Updated",
      image: "Article Image 1 Updated",
      alt: "Article Alt 1 Updated",
      cat: "Article Cat 1 Updated"
    }
    expect(wrapper.vm.getArticles()[0]).toStrictEqual({
      id: "Article Id 1 Updated",
      name: "Article Name 1 Updated",
      text: "Article Text 1 Updated",
      image: "Article Image 1 Updated",
      alt: "Article Alt 1 Updated",
      cat: "Article Cat 1 Updated"
    })
  })
})
