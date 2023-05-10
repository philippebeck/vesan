import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ArticleCreator from "../../../components/ArticleCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ArticleCreator, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        name: "Article name",
        text: "Article text",
        image: "Article image",
        alt: "Article alt",
        cat: "Article cat"
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ArticleCreator", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "Editor" })).toBe("object")
  })

  test("props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
  })

  test("data", () => {
    expect(wrapper.vm.$data).toStrictEqual({
      name: "Article name",
      text: "Article text",
      image: "Article image",
      alt: "Article alt",
      cat: "Article cat"
    })
  })

  test("methods", () => {
    expect(typeof wrapper.vm.createArticle).toBe("function")
  })
});
