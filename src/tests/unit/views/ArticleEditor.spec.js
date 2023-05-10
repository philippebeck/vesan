import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import * as serve from "../../../assets/serve.js"
import ArticleEditor from "../../../views/ArticleEditor"

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
    listGalleries: jest.fn()
  };

  state = {
    galleries: []
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
      plugins: [store]
    }
  });
});

enableAutoUnmount(afterEach)

describe("ArticleEditor", () => {
  test("wrapper", () => { 
    expect(wrapper.vm).toBe(true)
  })

  // test("components", () => { 
  //   expect(wrapper.findComponent({ name: "BtnElt" })).toBe(true)
  //   expect(wrapper.findComponent({ name: "CardElt" })).toBe(true)
  //   expect(wrapper.findComponent({ name: "FieldElt" })).toBe(true)
  //   expect(wrapper.findComponent({ name: "ListElt" })).toBe(true)
  //   expect(wrapper.findComponent({ name: "MediaElt" })).toBe(true)
  //   expect(wrapper.findComponent({ name: "Editor" })).toBe(true)  
  // })

  // test("props", () => { 
  //   expect(wrapper.props().constants.TEST).toBe("test")
  // })

  // test("data", () => { 
  //   expect(wrapper.vm.user.name).toBe("test")
  //   expect(wrapper.vm.user.email).toBe("email@test.com")
  // })

  // test("methods", () => { 
  //   expect(wrapper.vm.readArticle).toBe("function")
  //   expect(wrapper.vm.checkSession).toBe("function")
  //   expect(wrapper.vm.updateArticle).toBe("function")
  // })
})
