import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import * as serve from "../../../assets/serve.js"
import ImageView from "../../../views/ImageView"

const mockRoute = {
  params: {
    id: 1,
  },
};

const mockRouter = {
  push: jest.fn()
}

let wrapper;
let store;
let actions;
let state;

mockRouter.push(mockRoute);

beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  actions = {
    listGalleryImages: jest.fn()
  };

  state = {
    images: []
  };

  store = createStore({
    state() {
      return state;
      },
    actions: actions
  })

  wrapper = shallowMount(ImageView, {
    props: {
      constants: {
        TEST: "test"
      },
      user: {
        name: "test",
        email: "email@test.com"
      }
    },
    data() {
      return {
        gallery: {
          images: [
            {
              id: 1,
              title: "test",
              description: "test",
              url: "test",
            }
          ]
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
describe("ImageView", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "SliderElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "ImageCreator" })).toBe("object") 
  })

  test("props", () => { 
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("user")).toStrictEqual({ name: "test", email: "email@test.com"})
  })

  test("data", () => { 
    expect(wrapper.vm.gallery.images).toStrictEqual([{ 
      id: 1, 
      title: "test", 
      description: "test", 
      url: "test" 
    }])
  })

  test("methods", () => { 
    expect(typeof wrapper.vm.listGalleryImages).toBe("function")
    expect(typeof wrapper.vm.checkSession).toBe("function")
  })
})
