import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import * as serve from "servidio"
import ProfileEditor from "../../views/admin/ProfileView"

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
    readUser: jest.fn(),
    listUserOrders: jest.fn()
  };

  state = {
    user: {},
    orders: []
  };

  store = createStore({
    state() {
      return state;
      },
    actions: actions
  })

  wrapper = shallowMount(ProfileEditor, {
    props: {
      val: {
        TEST: "test"
      }
    },
    data() {
      return {
        image: "test image",
        pass: "test pass"
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
describe("ProfileEditor", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object")
  })

  test("props", () => { 
    expect(wrapper.props().val).toStrictEqual({ TEST: "test" })
  })

  test("data", () => { 
    expect(wrapper.vm.image).toBe("test image")
    expect(wrapper.vm.pass).toBe("test pass")
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.readUser).toBe("function")
    expect(typeof wrapper.vm.listUserOrders).toBe("function")
    expect(typeof wrapper.vm.checkSession).toBe("function")
    expect(typeof wrapper.vm.logout).toBe("function")
    expect(typeof wrapper.vm.updateUser).toBe("function")
    expect(typeof wrapper.vm.deleteUser).toBe("function")
  })
})
