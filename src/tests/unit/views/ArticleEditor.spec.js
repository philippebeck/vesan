import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import * as serve from "../../../assets/serve.js"
import ArticleEditor from "../../../views/ArticleEditor"

let wrapper;
let store;
let actions;
let state;

beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  global.alert = jest.fn();
  const push = jest.fn();
  const $router = {
    push: push
  };

  actions = {
    readArticle: jest.fn()
  };

  state = {
    article: {}
  };

  store = createStore({
    state() {
      return state;
      },
    actions: actions
  })

  wrapper = shallowMount(ArticleEditor, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        user: {
          name: "test",
          email: "email@test.com"
        }
      }
    },
    global: {
      plugins: [store],
      mocks: {
        $router
      }
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("ArticleEditor", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "Editor" })).toBe("object")
  })

  test("props", () => { 
    expect(wrapper.props().constants.TEST).toBe("test")
  })

  test("data", () => { 
    expect(wrapper.vm.user.name).toBe("test")
    expect(wrapper.vm.user.email).toBe("email@test.com")
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.readArticle).toBe("function")
    expect(typeof wrapper.vm.updateArticle).toBe("function")
  })
})
