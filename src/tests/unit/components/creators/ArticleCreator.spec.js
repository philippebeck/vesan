import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ArticleCreator from "@/components/creators/ArticleCreator"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ArticleCreator, {
    propsData: {
      name: "Article name",
      text: "Article text",
      image: "Article image",
      alt: "Article alt",
      cat: "Article cat"
    },
    mocks: {},
    stubs: {},
    methods: {},
  });
});

enableAutoUnmount(afterEach)

describe("ArticleCreator", () => {
  test("name", () => { 
    expect(ArticleCreator.name).toBe("ArticleCreator") 
  })

  test("components", () => { 
    expect(typeof ArticleCreator.components).toBe("object") 
    expect(typeof ArticleCreator.components.BtnElt).toBe("object") 
    expect(typeof ArticleCreator.components.CardElt).toBe("object") 
    expect(typeof ArticleCreator.components.FieldElt).toBe("object") 
    expect(typeof ArticleCreator.components.ListElt).toBe("object") 
    expect(typeof ArticleCreator.components.Editor).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ArticleCreator.props).toBe("object") 
    expect(ArticleCreator.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ArticleCreator.data).toBe("function") 
    expect(ArticleCreator.data()).toEqual({ 
      name: "", 
      text: "", 
      image: "", 
      alt: "", 
      cat: "" 
    }) 
  })

  test("methods", () => { 
    expect(typeof ArticleCreator.methods.createArticle).toBe("function") 
  })
})

describe('Mounted ArticleCreator', () => {
  test('wrapper', () => { 
    expect(wrapper.exists()).toBe(true) 
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'ListElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'Editor' })).toBeDefined() 
  })
});
