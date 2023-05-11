import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import * as serve from "../../assets/serve.js"
import App from "../../App"

let wrapper;
let store;
let actions;
let state;

beforeEach(() => {
  jest.spyOn(serve, "setGlobalMeta").mockImplementation(() => {});

  actions = {
    readAvatar: jest.fn()
  };

  state = {
    user: {}
  };

  store = createStore({
    state() {
      return state;
      },
    actions: actions
  })

  wrapper = shallowMount(App, {
    data() {
      return {
        constants: {
          TEST: "test"
        }
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
describe("App", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  // test("components", () => { 
  //   expect(typeof wrapper.findComponent({ name: "FootElt" }).vm).toBe("object")
  //   expect(typeof wrapper.findComponent({ name: "ListElt" }).vm).toBe("object")
  //   expect(typeof wrapper.findComponent({ name: "NavElt" }).vm).toBe("object")
  // })

  // test("data", () => { 
  //   expect(wrapper.vm.constants).toStrictEqual({ TEST: "test" })
  // })

  // test("methods", () => { 
  //   expect(typeof wrapper.vm.readAvatar).toBe("function")
  //   expect(typeof wrapper.vm.checkSession).toBe("function")
  // })
})
