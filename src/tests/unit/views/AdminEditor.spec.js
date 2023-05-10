import AdminEditor from "../../../views/AdminEditor"

describe("AdminEditor", () => {
  test("name", () => { 
    expect(AdminEditor.name).toBe("AdminEditor") 
  })

  test("components", () => { 
    expect(typeof AdminEditor.components).toBe("object") 
    expect(typeof AdminEditor.components.CardElt).toBe("object") 
    expect(typeof AdminEditor.components.NavElt).toBe("object") 
    expect(typeof AdminEditor.components.ProductManager).toBe("object") 
    expect(typeof AdminEditor.components.ReviewManager).toBe("object") 
    expect(typeof AdminEditor.components.OrderManager).toBe("object") 
    expect(typeof AdminEditor.components.ArticleManager).toBe("object") 
    expect(typeof AdminEditor.components.CommentManager).toBe("object") 
    expect(typeof AdminEditor.components.GalleryManager).toBe("object") 
    expect(typeof AdminEditor.components.ImageManager).toBe("object") 
    expect(typeof AdminEditor.components.LinkManager).toBe("object") 
    expect(typeof AdminEditor.components.UserManager).toBe("object") 
  })

  test("props", () => { 
    expect(typeof AdminEditor.props).toBe("object") 
    expect(AdminEditor.props).toContain("constants") 
  })

  test("data", () => { 
    expect(typeof AdminEditor.data).toBe("function") 
    expect(AdminEditor.data()).toEqual({ user: {} }) 
  })

  test("created()", () => {
    expect(typeof AdminEditor.created).toBe("function")
  })

  test("computed", () => {
    expect(typeof AdminEditor.computed).toBe("object")
  })

  test("methods", () => { 
    expect(typeof AdminEditor.methods.checkSession).toBe("function") 
  })
})
