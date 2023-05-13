import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import * as serve from "../../../assets/serve.js"
import ProductEditor from "../../../views/ProductEditor"

let wrapper;
let store;
let actions;
let state;

beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  const push = jest.fn();
  const $router = {
    push: push
  };

  actions = {
    readProduct: jest.fn()
  };

  state = {
    product: {}
  };

  store = createStore({
    state() {
      return state;
      },
    actions: actions
  })

  wrapper = shallowMount(ProductEditor, {
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
describe("ProductEditor", () => {
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
    expect(wrapper.props().constants).toStrictEqual({ TEST: "test" })
  })

  test("data", () => { 
    expect(wrapper.vm.user).toStrictEqual({ 
      name: "test", 
      email: "email@test.com"
    })
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.readProduct).toBe("function")
    expect(typeof wrapper.vm.updateProduct).toBe("function")
  })
})
