import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import * as serve from "../../../assets/serve"
import AdminEditor from "../../../views/AdminEditor"

let wrapper;

beforeEach(() => {
  jest.spyOn(serve, "setMeta").mockImplementation(() => {});

  const push = jest.fn();
  const $router = {
    push: push
  };

  wrapper = shallowMount(AdminEditor, {
    props: {
      constants: {
        TEST: "test"
      }
    },
    data() {
      return {
        user: {
          name: "Test Name",
          email: "email@test.com",
          role: "Test Role"
        }
      }
    },
    global: {
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
describe("AdminEditor", () => {
  test("wrapper", () => { 
    expect(wrapper.exists()).toBe(true)
  })

  test("components", () => { 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "NavElt" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ProductManager" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ReviewManager" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "OrderManager" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ArticleManager" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "CommentManager" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "GalleryManager" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "ImageManager" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "LinkManager" })).toBe("object")
    expect(typeof wrapper.findComponent({ name: "UserManager" })).toBe("object")
  })

  test("props", () => { 
    expect(wrapper.props("constants")).toStrictEqual({ TEST: "test" })
  })

  test("data", () => { 
    expect(wrapper.vm.$data).toStrictEqual({
      user: {
        name: "Test Name",
        email: "email@test.com",
        role: "Test Role"
      }
    })
  })

  test("methods", () => {
    expect(typeof wrapper.vm.checkSession).toBe("function")
  })
})
