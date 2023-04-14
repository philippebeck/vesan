import BlogView from "@/views/public/BlogView"

describe("BlogView", () => {
  test("name", () => { 
    expect(BlogView.name).toBe("BlogView") 
  })

  test("components", () => { 
    expect(typeof BlogView.components).toBe("object") 
    expect(typeof BlogView.components.BtnElt).toBe("object") 
    expect(typeof BlogView.components.CardElt).toBe("object") 
    expect(typeof BlogView.components.ListElt).toBe("object") 
    expect(typeof BlogView.components.MediaElt).toBe("object") 
    expect(typeof BlogView.components.NavElt).toBe("object") 
    expect(typeof BlogView.components.ArticleCreator).toBe("object") 
  })

  test("props", () => { 
    expect(typeof BlogView.props).toBe("object") 
    expect(BlogView.props).toContain("constants") 
    expect(BlogView.props).toContain("user") 
  })

  test("methods", () => { 
    expect(typeof BlogView.methods.checkRole).toBe("function") 
    expect(typeof BlogView.methods.getItemsByCat).toBe("function") 
    expect(typeof BlogView.methods.checkLikes).toBe("function") 
    expect(typeof BlogView.methods.addLike).toBe("function") 
  })
})
