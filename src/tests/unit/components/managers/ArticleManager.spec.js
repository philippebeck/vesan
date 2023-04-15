import { shallowMount, enableAutoUnmount } from "@vue/test-utils"
import ArticleManager from "@/components/managers/ArticleManager"

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ArticleManager, {
    propsData: {},
    mocks: {},
    stubs: {}
  });
});

enableAutoUnmount(afterEach)

describe("ArticleManager", () => {
  test("name", () => { 
    expect(ArticleManager.name).toBe("ArticleManager") 
  })

  test("components", () => { 
    expect(typeof ArticleManager.components).toBe("object") 
    expect(typeof ArticleManager.components.BtnElt).toBe("object") 
    expect(typeof ArticleManager.components.CardElt).toBe("object") 
    expect(typeof ArticleManager.components.FieldElt).toBe("object") 
    expect(typeof ArticleManager.components.MediaElt).toBe("object") 
    expect(typeof ArticleManager.components.TableElt).toBe("object")
  })

  test("props", () => {
    expect(typeof ArticleManager.props).toBe("object")
    expect(ArticleManager.props).toContain("constants") 
    expect(ArticleManager.props).toContain("articles") 
    expect(ArticleManager.props).toContain("users") 
  })

  test("methods", () => { 
    expect(typeof ArticleManager.methods.getArticles).toBe("function") 
    expect(typeof ArticleManager.methods.getArticle).toBe("function") 
    expect(typeof ArticleManager.methods.checkArticle).toBe("function") 
    expect(typeof ArticleManager.methods.updateArticle).toBe("function") 
    expect(typeof ArticleManager.methods.deleteArticle).toBe("function") 
  })
})

describe('Mounted ArticleManager', () => {

  test('wrapper', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('wrapper components', () => { 
    expect(wrapper.findComponent({ name: 'BtnElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'CardElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'FieldElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'MediaElt' })).toBeDefined() 
    expect(wrapper.findComponent({ name: 'TableElt' })).toBeDefined() 

  test("wrapper methods", () => {
    expect(typeof wrapper.vm.getArticles).toBe("function")
    expect(typeof wrapper.vm.getArticle).toBe("function")
    expect(typeof wrapper.vm.checkArticle).toBe("function")
    expect(typeof wrapper.vm.updateArticle).toBe("function")
    expect(typeof wrapper.vm.deleteArticle).toBe("function")
  })
})
