import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import CommentManager from "@/components/managers/CommentManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(CommentManager, {
    props: {},
    global: {
      mocks: {},
      stubs: {}
    }
  });
});

enableAutoUnmount(afterEach)

describe("CommentManager", () => {
  test("name", () => { 
    expect(CommentManager.name).toBe("CommentManager") 
  })

  test("components", () => { 
    expect(typeof CommentManager.components).toBe("object") 
    expect(typeof CommentManager.components.BtnElt).toBe("object") 
    expect(typeof CommentManager.components.CardElt).toBe("object") 
    expect(typeof CommentManager.components.FieldElt).toBe("object") 
    expect(typeof CommentManager.components.TableElt).toBe("object")
  })

  test("props", () => {
    expect(typeof CommentManager.props).toBe("object")
    expect(CommentManager.props).toContain("constants") 
    expect(CommentManager.props).toContain("comments") 
    expect(CommentManager.props).toContain("articles") 
    expect(CommentManager.props).toContain("users") 
  })

  test("methods", () => { 
    expect(typeof CommentManager.methods.getComments).toBe("function") 
    expect(typeof CommentManager.methods.getArticleName).toBe("function") 
    expect(typeof CommentManager.methods.moderateComment).toBe("function") 
    expect(typeof CommentManager.methods.deleteComment).toBe("function") 
  })
})

describe("Mounted CommentManager", () => {

  test("wrapper", () => {
    expect(wrapper.exists()).toBe(true)
  })

  test("wrapper components", () => { 
    expect(typeof wrapper.findComponent({ name: "BtnElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "CardElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "FieldElt" })).toBe("object") 
    expect(typeof wrapper.findComponent({ name: "TableElt" })).toBe("object") 
  })

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.getComments).toBe("function")
    expect(typeof wrapper.vm.getArticleName).toBe("function")
    expect(typeof wrapper.vm.moderateComment).toBe("function")
    expect(typeof wrapper.vm.deleteComment).toBe("function")
  })
})
