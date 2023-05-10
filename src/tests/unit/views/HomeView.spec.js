import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import * as serve from "../../../assets/serve.js"
import HomeView from "../../../views/HomeView"

let wrapper;

/**
 * @jest-environment jsdom
 */
beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  wrapper = shallowMount(HomeView, {
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
        media: { title: "Test Title", url: "https://test.com" }
      }
    }
  });
});

enableAutoUnmount(afterEach)

describe("HomeView", () => {
  test("wrapper must be a vue instance", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => {
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ListElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "MediaElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "SliderElt" })).toBe("object")
  })

  test("wrapper props", () => {
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
    expect(wrapper.props("user")).toStrictEqual({ name: "test", email: "email@test.com" })
  })

  test("wrapper data", () => {
    expect(wrapper.vm.$data).toStrictEqual({
      media: { title: "Test Title", url: "https://test.com" }
    })
  })

  test("wrapper created hook", () => {
    expect(serve.setMeta).toHaveBeenCalled()
  })
})
