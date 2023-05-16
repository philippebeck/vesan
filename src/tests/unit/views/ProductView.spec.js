import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import { createStore } from 'vuex';
import * as serve from "../../../assets/serve.js"
import ProductView from "../../../views/ProductView"

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

/**
 * @jest-environment jsdom
 */
beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  actions = {
    listProductReviews: jest.fn(),
    readProduct: jest.fn()
  };

  state = {
    product: {},
    reviews: []
  };

  store = createStore({
    state() {
      return state;
      },
    actions: actions
  })

  mockRouter.push(mockRoute);

  wrapper = shallowMount(ProductView, {
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
        basket: [],
        product: {
          id: 1,
          name: "test",
          description: "test",
          price: 10,
          currency: "EUR",
          image: "test",
          gallery: "test",
          reviews: []
        },
        order: {
          id: 1,
          name: "test",
          description: "test",
          price: 10,
          currency: "EUR",
          image: "test",
          gallery: "test",
          reviews: []
        },
        option: "",
        priceCurrency: "",
        quantity: 1,
        isInBasket: false
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

describe("ProductView", () => {
  test("wrapper must be a vue instance", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ReviewCreator" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ReviewList" })).toBe("object")
  })

  test("wrapper props", () => { 
    expect(wrapper.props().constants).toEqual({ TEST: "test" })
    expect(wrapper.props().user).toEqual({ name: "test", email: "email@test.com" })
  })

  test("wrapper data", () => { 
    expect(wrapper.vm.basket).toEqual([])
    expect(wrapper.vm.product).toEqual({
      id: 1,
      name: "test",
      description: "test",
      price: 10,
      currency: "EUR",
      image: "test",
      gallery: "test",
      reviews: []
    })
    expect(wrapper.vm.order).toEqual({
      id: 1,
      name: "test",
      description: "test",
      price: 10,
      currency: "EUR",
      image: "test",
      gallery: "test",
      reviews: []
    })
    expect(wrapper.vm.option).toBe("")
    expect(wrapper.vm.quantity).toBe(1)
    expect(wrapper.vm.isInBasket).toBe(false)
  })

  test("wrapper methods", () => { 
    expect(typeof wrapper.vm.checkSession).toBe("function")
    expect(typeof wrapper.vm.getScoresAverage).toBe("function")
    expect(typeof wrapper.vm.addToBasket).toBe("function")
    expect(typeof wrapper.vm.createOrder).toBe("function")
    expect(typeof wrapper.vm.getBasket).toBe("function")
    expect(typeof wrapper.vm.checkBasket).toBe("function")
    expect(typeof wrapper.vm.setBasket).toBe("function")
  })
})
