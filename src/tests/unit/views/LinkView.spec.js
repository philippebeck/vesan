import LinkView from "../../../views/LinkView"

describe("LinkView", () => {
  test("name", () => { 
    expect(LinkView.name).toBe("LinkView") 
  })

  test("components", () => { 
    expect(typeof LinkView.components).toBe("object") 
    expect(typeof LinkView.components.BtnElt).toBe("object") 
    expect(typeof LinkView.components.CardElt).toBe("object") 
    expect(typeof LinkView.components.ListElt).toBe("object") 
    expect(typeof LinkView.components.NavElt).toBe("object") 
    expect(typeof LinkView.components.LinkCreator).toBe("object") 
  })

  test("props", () => { 
    expect(typeof LinkView.props).toBe("object") 
    expect(LinkView.props).toContain("constants") 
    expect(LinkView.props).toContain("user") 
  })

  test("created()", () => {
    expect(typeof LinkView.created).toBe("function")
  })

  test("computed", () => {
    expect(typeof LinkView.computed).toBe("object")
    expect(typeof LinkView.computed.getCategories).toBe("function")
  })

  test("methods", () => { 
    expect(typeof LinkView.methods.checkSession).toBe("function") 
    expect(typeof LinkView.methods.getItemsByCategory).toBe("function") 
  })
})
