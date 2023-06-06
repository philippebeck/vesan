import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router'
import * as serve from "../../assets/serve.js"
import constants from "../../../constants.js"
import App from "../../App"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: App
    }
  ]
})

let wrapper;
let store;
let actions;
let state;

/**
 * @jest-environment jsdom
 */
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
        constants: constants
      }
    },
    global: {
      plugins: [store, router]
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

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "FootElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "NavElt" })).toBe("object")
  })

  test("data", () => { 
    expect(wrapper.vm.constants).toStrictEqual(constants)
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.readAvatar).toBe("function")
    expect(typeof wrapper.vm.checkSession).toBe("function")
  })
});
