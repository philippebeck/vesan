import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import * as serve from "../../../assets/serve"
import ArticleView from "../../../views/ArticleView"

let wrapper;

beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  wrapper = shallowMount(ArticleView, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        article: {
          name: "Test name",
          image: "Test image",
          text: "Test text"
        }
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ArticleView", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true)
  })

  // test("components", () => { 
  //   expect(typeof wrapper.findComponent({ name: "BtnElt" }).vm).toBe("object")
  //   expect(typeof wrapper.findComponent({ name: "CardElt" }).vm).toBe("object")
  //   expect(typeof wrapper.findComponent({ name: "MediaElt" }).vm).toBe("object")
  //   expect(typeof wrapper.findComponent({ name: "CommentCreator" }).vm).toBe("object")
  //   expect(typeof wrapper.findComponent({ name: "CommentList" }).vm).toBe("object")
  // })

  // test("props", () => { 
  //   expect(wrapper.props().constants).toEqual({ TEST: "test" })
  // })

  // test("data", () => { 
  //   expect(wrapper.vm.article).toEqual({
  //     name: "Test name",
  //     image: "Test image",
  //     text: "Test text"
  //   })
  // })

  // test("methods", () => { 
  //   expect(typeof wrapper.vm.readArticle).toBe("function")
  //   expect(typeof wrapper.vm.listArticleComments).toBe("function")
  //   expect(typeof wrapper.vm.checkSession).toBe("function")
  //   expect(typeof wrapper.vm.checkLikes).toBe("function")
  //   expect(typeof wrapper.vm.addLike).toBe("function")
  // })
})
