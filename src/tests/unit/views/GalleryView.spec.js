import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import serve from "../../../assets/serve.js"
import GalleryView from "../../../views/GalleryView"

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

  wrapper = shallowMount(GalleryView, {
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

describe("GalleryView", () => {
  test("wrapper must be a vue instance", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => {
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "GalleryCreator" })).toBe("object")
  })

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("user")).toStrictEqual({ name: "test", email: "email@test.com" })
  })

  test("wrapper created hook", () => {
    expect(serve.setMeta).toHaveBeenCalled()
    expect(actions.listGalleries).toHaveBeenCalled()
  })

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.listGalleries).toBe("function")
    expect(typeof wrapper.vm.checkRole).toBe("function")
  })
})
