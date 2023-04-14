import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ReviewCreator from "@/components/creators/ReviewCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ReviewCreator, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
  });
});

enableAutoUnmount(afterEach)

describe("ReviewCreator", () => {
  test("name", () => { 
    expect(ReviewCreator.name).toBe("ReviewCreator") 
  })

  test("components", () => { 
    expect(typeof ReviewCreator.components).toBe("object") 
    expect(typeof ReviewCreator.components.BtnElt).toBe("object") 
    expect(typeof ReviewCreator.components.CardElt).toBe("object") 
    expect(typeof ReviewCreator.components.FieldElt).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ReviewCreator.props).toBe("object") 
    expect(ReviewCreator.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ReviewCreator.data).toBe("function") 
    expect(ReviewCreator.data()).toEqual({ 
      text: "", 
      score: null 
    }) 
  })

  test("methods", () => { 
    expect(typeof ReviewCreator.methods.createReview).toBe("function") 
  })
})

describe('Mounted ReviewCreator', () => {
  test('wrapper', () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
  })
});
