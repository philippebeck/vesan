import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import CommentList from "@/components/lists/CommentList"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(CommentList, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
  });
});

enableAutoUnmount(afterEach)

describe("CommentList", () => {
  test("name", () => { 
    expect(CommentList.name).toBe("CommentList") 
  })

  test("components", () => { 
    expect(typeof CommentList.components).toBe("object") 
    expect(typeof CommentList.components.BtnElt).toBe("object") 
    expect(typeof CommentList.components.CardElt).toBe("object") 
    expect(typeof CommentList.components.FieldElt).toBe("object") 
    expect(typeof CommentList.components.ListElt).toBe("object")
    expect(typeof CommentList.components.MediaElt).toBe("object") 
  })

  test("props", () => {
    expect(typeof CommentList.props).toBe("object")
    expect(CommentList.props).toContain("constants") 
    expect(CommentList.props).toContain("comments") 
  })

  test("methods", () => { 
    expect(typeof CommentList.methods.updateComment).toBe("function") 
    expect(typeof CommentList.methods.deleteComment).toBe("function") 
  })
})

describe('Mounted CommentList', () => {

  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'ListElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'MediaElt' })).toBeDefined() 
  })
})
