import ArticleEditor from "@/views/private/ArticleEditor"

describe("ArticleEditor", () => {
  test("name", () => { 
    expect(ArticleEditor.name).toBe("ArticleEditor") 
  })

  test("components", () => { 
    expect(typeof ArticleEditor.components).toBe("object") 
    expect(typeof ArticleEditor.components.BtnElt).toBe("object") 
    expect(typeof ArticleEditor.components.CardElt).toBe("object") 
    expect(typeof ArticleEditor.components.FieldElt).toBe("object") 
    expect(typeof ArticleEditor.components.ListElt).toBe("object") 
    expect(typeof ArticleEditor.components.MediaElt).toBe("object") 
    expect(typeof ArticleEditor.components.Editor).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ArticleEditor.props).toBe("object") 
    expect(ArticleEditor.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ArticleEditor.data).toBe("function") 
    expect(ArticleEditor.data()).toEqual({ user: {} }) 
  })

  test("created()", () => {
    expect(typeof ArticleEditor.created).toBe("function")
  })

  test("computed", () => {
    expect(typeof ArticleEditor.computed).toBe("object")
  })

  test("methods", () => { 
    expect(typeof ArticleEditor.methods.checkRole).toBe("function") 
    expect(typeof ArticleEditor.methods.updateArticle).toBe("function")
  })
})
