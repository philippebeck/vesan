import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import * as serve from "../../../assets/serve"
import ArticleView from "../../../views/ArticleView"

const mockRoute = {
  params: {
    id: 1,
  },
};

const mockRouter = {
  push: jest.fn()
}

const role = "user";
const user = {
  name: "John Doe",
  role: role
}

let wrapper;
let store;
let actions;
let state;

/**
 * @jest-environment jsdom
 */
beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  actions = {
    listArticleComments: jest.fn(),
    readArticle: jest.fn()
  };

  state = {
    article: {},
    comments: []
  };

  store = createStore({
    state() {
      return state;
      },
    actions: actions
  })

  mockRouter.push(mockRoute);

  wrapper = shallowMount(ArticleView, {
    props: {
      constants: {
        TEST: "test"
      },
      user: user
    },
    data() {
      return {
        article: {
          id: 1,
          name: "Test name",
          image: "Test image",
          text: "Test text"
        }
      }
    },
    global: {
      plugins: [store],
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ArticleView", () => {
  test("wrapper must be a vue instance", () => { 
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CommentCreator" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CommentList" })).toBe("object")
  })

  test("props", () => { 
    expect(wrapper.props().constants).toEqual({ TEST: "test" })
  })

  test("data", () => { 
    expect(wrapper.vm.article).toEqual({
      id: 1,
      name: "Test name",
      image: "Test image",
      text: "Test text"
    })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.readArticle).toBe("function")
    expect(typeof wrapper.vm.listArticleComments).toBe("function")
    expect(typeof wrapper.vm.checkSession).toBe("function")
    expect(typeof wrapper.vm.checkLikes).toBe("function")
    expect(typeof wrapper.vm.addLike).toBe("function")
  })
})
