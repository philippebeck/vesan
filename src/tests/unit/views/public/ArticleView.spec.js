import ArticleView from "@/views/public/ArticleView"

describe("ArticleView", () => {
  test("name", () => { 
    expect(ArticleView.name).toBe("ArticleView") 
  })

  test("components", () => { 
    expect(typeof ArticleView.components).toBe("object") 
    expect(typeof ArticleView.components.BtnElt).toBe("object") 
    expect(typeof ArticleView.components.CardElt).toBe("object") 
    expect(typeof ArticleView.components.MediaElt).toBe("object") 
    expect(typeof ArticleView.components.CommentCreator).toBe("object") 
    expect(typeof ArticleView.components.CommentList).toBe("object") 
  })

  test("props", () => { 
    expect(typeof ArticleView.props).toBe("object") 
    expect(ArticleView.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof ArticleView.data).toBe("function") 
    expect(ArticleView.data()).toEqual({ article: {} }) 
  })

  test("created()", () => {
    expect(typeof ArticleView.created).toBe("function")
  })

  test("updated()", () => {
    expect(typeof ArticleView.created).toBe("function")
  })

  test("computed", () => {
    expect(typeof ArticleView.computed).toBe("object")
  })

  test("methods", () => { 
    expect(typeof ArticleView.methods.checkRole).toBe("function") 
    expect(typeof ArticleView.methods.checkLikes).toBe("function") 
    expect(typeof ArticleView.methods.addLike).toBe("function") 
  })
})
