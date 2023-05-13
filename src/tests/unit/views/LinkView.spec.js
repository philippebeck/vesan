import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import * as serve from "../../../assets/serve.js"
import LinkView from "../../../views/LinkView"

let wrapper;
let store;
let actions;
let state;

beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  actions = {
    listLinks: jest.fn()
  };

  state = {
    links: []
  };

  store = createStore({
    state() {
      return state;
      },
    actions: actions
  })

  wrapper = shallowMount(LinkView, {
    props: {
      constants: {
        TEST: "test"
      },
      user: {
        name: "test",
        email: "email@test.com"
      }
    },
    global: {
      plugins: [store]
    }
  });
});

enableAutoUnmount(afterEach)

/**
 * @jest-environment jsdom
 */
describe("LinkView", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "NavElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "LinkCreator" })).toBe("object")
  })

  test("props", () => { 
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("user")).toStrictEqual({ name: "test", email: "email@test.com"})
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.listLinks).toBe("function")
    expect(typeof wrapper.vm.checkSession).toBe("function")
    expect(typeof wrapper.vm.getItemsByCategory).toBe("function")
  })
})
