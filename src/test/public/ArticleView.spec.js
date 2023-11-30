import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import * as serve from "../../../assets/serve"
import ArticleView from "../../../views/ArticleView"

global.fetch = jest.fn(() =>
  Promise.resolve({
    formData: () => Promise.resolve({}),
    ok: true,
    headers: {
      get: (header) => {
        if (header === "Content-Type") {
          return "multipart/form-data";
        }
      }
    }
  })
);

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
    expect(wrapper.props().constants).toStrictEqual({ TEST: "test" })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.listArticleComments).toBe("function")
    expect(typeof wrapper.vm.checkSession).toBe("function")
    expect(typeof wrapper.vm.checkLikes).toBe("function")
    expect(typeof wrapper.vm.addLike).toBe("function")
  })
})
